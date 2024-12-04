let raw = await Bun.file("day01/input").text();
let pairs = raw.split("\n").map((l) => l.split("   ").map(Number));
let [left, right] = [0, 1].map((i) => pairs.map((p) => p[i]).toSorted());

let part1 = left.reduce((sum, leftV, i) => sum + Math.abs(leftV - right[i]), 0);
console.log("part1 =", part1);
// =3246517

let counts = right.reduce((c, v) => ({ ...c, [v]: (c[v] ?? 0) + 1 }), {});
let part2 = left.reduce((sum, v) => sum + v * (counts[v] ?? 0), 0);
console.log("part2 =", part2);
// =29379307
