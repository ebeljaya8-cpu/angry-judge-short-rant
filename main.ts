// Angry Judge: The Short Rant Contest — entry program.
//
// The program writes one short, funny rant about an everyday annoyance
// to $MAKEFUN_OUTPUT_DIR/entry.txt (defaulting to /output/entry.txt),
// the file the house gate and judge read. The rant is a few sentences
// about a neighbour, a leaf blower, and a wave that ruined a Sunday.
// The gate accepts UTF-8 text of 1..400 characters, so the program
// checks the length and refuses to write anything outside that range.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const RANT =
  "My neighbour fires up his leaf blower at 7am on a Sunday to move three leaves from his driveway onto mine, then waves at me like we've shared a moment. We have. I hate him now.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const text = RANT.trim();

if (text.length < 1 || text.length > 400) {
  throw new Error(`rant must be 1..400 chars, got ${text.length}`);
}
if (text.includes("\n")) {
  throw new Error("rant must be a single block of text, no newlines");
}
const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
if (sentences.length > 4) {
  throw new Error(`rant must be a few sentences at most, got ${sentences.length}`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
console.log(`wrote ${text.length}-char rant to ${join(outDir, "entry.txt")}`);
