let pairs = (await Bun.file("day01/input").text())
  .split("\n")
  .map((line) => line.split("   ").map(Number));
const col = (i) => pairs.map((pair) => pair[i]).toSorted((a, b) => a - b);
let left = col(0);
let right = col(1);

let part1 = left.reduce((prev, curr, i) => prev + Math.abs(curr - right[i]), 0);
console.log("part1 =", part1);
// =3246517

let counts = right.reduce((c, v) => ({ ...c, [v]: (c[v] ?? 0) + 1 }), {});
let part2 = left.reduce((sum, v) => sum + v * (counts[v] ?? 0), 0);
console.log("part2 =", part2);
// =29379307
