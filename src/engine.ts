import { spawn } from "node:child_process";
import type { ChildProcess } from "node:child_process";

type Pending = {
  resolve: (value: unknown) => void;
  reject: (reason: Error) => void;
};

/**
 * Wraps the chordgen JSON-RPC stdio server as a long-lived subprocess.
 * Requests are correlated by id so concurrent calls are safe.
 */
export class ChordgenEngine {
  private proc: ChildProcess | null = null;
  private buffer = "";
  private pending = new Map<number, Pending>();
  private nextId = 1;

  constructor(
    private readonly cwd: string,
    private readonly pythonCmd = "python",
  ) {}

  private getProcess(): ChildProcess {
    if (this.proc) return this.proc;

    // stdio: "pipe" guarantees stdin/stdout/stderr are non-null Writables/Readables
    const proc = spawn(this.pythonCmd, ["-u", "-m", "chordgen.server"], {
      cwd: this.cwd,
      stdio: ["pipe", "pipe", "pipe"],
    });

    proc.stdout!.on("data", (chunk: Buffer) => {
      this.buffer += chunk.toString("utf8");
      let nl: number;
      while ((nl = this.buffer.indexOf("\n")) !== -1) {
        const line = this.buffer.slice(0, nl).trim();
        this.buffer = this.buffer.slice(nl + 1);
        if (!line) continue;
        let msg: Record<string, unknown>;
        try {
          msg = JSON.parse(line) as Record<string, unknown>;
        } catch {
          continue;
        }
        const id = msg["id"] as number | undefined;
        if (id === undefined) continue;
        const pending = this.pending.get(id);
        if (!pending) continue;
        this.pending.delete(id);
        if ("error" in msg) {
          pending.reject(new Error(String(msg["error"])));
        } else {
          pending.resolve(msg["result"]);
        }
      }
    });

    proc.stderr!.on("data", (chunk: Buffer) => {
      console.error(`[chordgen] ${chunk.toString("utf8").trimEnd()}`);
    });

    proc.on("error", (err) => {
      console.error(`[chordgen] failed to start: ${err.message}`);
      this.drainPending(err);
      this.proc = null;
    });

    proc.on("exit", (code) => {
      if (code !== 0 && code !== null) {
        console.error(`[chordgen] process exited with code ${code}`);
      }
      this.drainPending(new Error(`chordgen process exited (code ${code})`));
      this.proc = null;
    });

    this.proc = proc;
    return proc;
  }

  private drainPending(err: Error): void {
    for (const [, pending] of this.pending) pending.reject(err);
    this.pending.clear();
  }

  send<T>(op: string, params: Record<string, unknown> = {}): Promise<T> {
    const proc = this.getProcess();
    const id = this.nextId++;
    return new Promise<T>((resolve, reject) => {
      this.pending.set(id, {
        resolve: (v) => resolve(v as T),
        reject,
      });
      proc.stdin!.write(JSON.stringify({ op, id, ...params }) + "\n");
    });
  }

  dispose(): void {
    this.proc?.kill();
    this.proc = null;
  }
}
