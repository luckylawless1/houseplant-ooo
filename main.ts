// The Houseplant Out-of-Office — make.fun bounty
// u-eager-stork-81-9647-the-houseplant-out-of-office-7c586047
//
// Writes one out-of-office auto-reply, as if a houseplant sent it,
// to /output/entry.txt. Gate: UTF-8 text of 1 to 120 characters.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Out of office: I'm a fern, forgotten since March. Urgent? Water me first. I've been photosynthesizing out of spite.";

// Gate validation: the sealed scorer requires UTF-8 text of 1 to 120
// characters, not only white space, on a single line. Fail loudly here
// instead of shipping an entry the gate would refuse.
if (LINE.length < 1 || LINE.length > 120) {
  throw new Error(`entry length ${LINE.length} is outside the 1-120 gate`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("entry must be one non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
console.log(`Wrote ${LINE.length} characters to entry.txt`);
