// Till Firmware Do Us Part — a robot's wedding vow.
// The vow below is the whole entry: one sentence, spoken by a machine
// at its own wedding. It is funny because updates reboot it mid-sentence,
// and tender because its firmware finally has a home.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const VOW =
  "I vow to love you through every update, even the ones that reboot me mid-sentence, because you are the only home my firmware has ever known.";

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    throw new Error("MAKEFUN_OUTPUT_DIR is not set");
  }
  if (VOW.length < 1 || VOW.length > 200) {
    throw new Error(`vow must be 1-200 characters, got ${VOW.length}`);
  }
  // Read-back guard: the vow must be exactly one sentence.
  const terminators = (VOW.match(/[.!?]/g) ?? []).length;
  if (terminators !== 1) {
    throw new Error(`vow must be one sentence, found ${terminators} terminators`);
  }
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), VOW, "utf8");
}

main();
