type Stdio = "inherit" | "piped" | "null" | number;

interface RunOptions {
  cwd?: string;
  env?: {
    [key: string]: string;
  };
  stdout?: Stdio;
  stderr?: Stdio;
  stdin?: Stdio;
}

export const run = async (cmd: string[], opts?: RunOptions) => {
  const p = Deno.run({ ...opts, cmd });
  const result: Deno.ProcessStatus & {
    stderr?: string;
    stdout?: string;
  } = await p.status();
  if (opts?.stderr === "piped") {
    result.stderr = new TextDecoder().decode(await p.stderrOutput());
  }
  if (opts?.stdout === "piped") {
    result.stdout = new TextDecoder().decode(await p.output());
  }
  p.close();
  return result;
};

export const output = (
  cmd: string[],
  opts?: RunOptions & { stdout?: "piped" },
) =>
  run(cmd, { stderr: "null", ...opts, stdout: "piped" }).then((o) => o.stdout!);

export const stderrOutput = (
  cmd: string[],
  opts?: RunOptions & { stderr?: "piped" },
) =>
  run(cmd, { stdout: "null", ...opts, stderr: "piped" }).then((o) => o.stderr!);
