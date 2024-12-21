let raw = await Bun.file("day21/input_small").text();
let codes = raw.split("\n");
let pair = (i) => [i % 3, (i / 3) | 0];

/*
dpad:
    +---+---+
    | ^ | A |
+---+---+---+
| < | v | > |
+---+---+---+
*/
function dpad(start, end) {
  let keys = "_^A<v>";
  let h = 2;
  let s = keys.indexOf(start);
  let e = keys.indexOf(end);
  let [sx, sy] = pair(s);
  let [ex, ey] = pair(e);
  let dx = ex - sx;
  let dy = ey - sy;
  let result = "";
  if (dy > 0) result += "v".repeat(dy);
  if (dx < 0) result += "<".repeat(-dx);
  if (dx > 0) result += ">".repeat(dx);
  if (dy < 0) result += "^".repeat(-dy);
  return result + "A";
}

/*
numpad:
+---+---+---+
| 7 | 8 | 9 |
+---+---+---+
| 4 | 5 | 6 |
+---+---+---+
| 1 | 2 | 3 |
+---+---+---+
    | 0 | A |
    +---+---+
*/
function numpad(start, end) {
  let keys = "789456123_0A";
  let s = keys.indexOf(start);
  let e = keys.indexOf(end);
  let h = 4;
  let [sx, sy] = pair(s);
  let [ex, ey] = pair(e);

  let dx = ex - sx;
  let dy = ey - sy;
  let seq = "";
  if (dy < 0) seq += "^".repeat(-dy);
  if (dx < 0) seq += "<".repeat(-dx);
  if (dx > 0) seq += ">".repeat(dx);
  if (dy > 0) seq += "v".repeat(dy);
  seq += "A";

  return seq;
}

let press = (code, pad) => {
  let seq = "";
  let last = "A";
  for (let char of code) {
    seq += pad(last, char);
    last = char;
  }
  return seq;
};

let myComplexity = 0;
for (let code of codes) {
  let codeNum = press(code, numpad);
  let codeDir = press(codeNum, dpad);
  let codeSelf = press(codeDir, dpad);
  console.log(code);
  console.log(codeNum);
  console.log(codeDir);
  console.log(codeSelf);
  console.log();

  myComplexity += codeSelf.length * Number(code.slice(0, 3));
}
console.log("myComplexity =", myComplexity);

let tests = [
  "029A: <vA<AA>>^AvAA<^A>A<v<A>>^AvA^A<vA>^A<v<A>^A>AAvA^A<v<A>A>^AAAvA<^A>A",
  "980A: <v<A>>^AAAvA^A<vA<AA>>^AvAA<^A>A<v<A>A>^AAAvA<^A>A<vA>^A<A>A",
  "179A: <v<A>>^A<vA<A>>^AAvAA<^A>A<v<A>>^AAvA^A<vA>^AA<A>A<v<A>A>^AAAvA<^A>A",
  "456A: <v<A>>^AA<vA<A>>^AAvAA<^A>A<vA>^A<A>A<vA>^A<A>A<v<A>A>^AAvA<^A>A",
  "379A: <v<A>>^AvA^A<vA<AA>>^AAvA<^A>AAvA^A<vA>^AA<A>A<v<A>A>^AAAvA<^A>A",
].map((x) => x.split(": "));

let complexity = 0;
for (let [code, seq] of tests) {
  complexity += seq.length * Number(code.slice(0, 3));
}
console.log("complexity =", complexity);

// let part1 = 0;
// console.log("part1 =", part1);
// =

// let part2 = 0;
// console.log("part2 =", part2);
// =
