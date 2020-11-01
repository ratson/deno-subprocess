import {
  assertEquals,
  assertMatch,
} from "https://deno.land/std@0.78.0/testing/asserts.ts";
import * as subprocess from "./mod.ts";

Deno.test("run()", async () => {
  const r = await subprocess.run(["deno", "--version"]);
  assertEquals(r, { status: { code: 0, success: true } });
});

Deno.test("output() return stdout as string", async () => {
  const s = await subprocess.output(["deno", "--version"]);
  assertMatch(s, /deno\ /);
});

Deno.test("stderrOutput() return stderr as string", async () => {
  const s = await subprocess.stderrOutput(["deno", "--version"]);
  assertEquals(s, "");
});