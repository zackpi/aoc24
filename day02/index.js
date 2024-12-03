let reports = (await Bun.file("day02/input").text())
  .split("\n")
  .map((l) => l.split(" ").map(Number));

let bounds = (a) => a.map(Math.abs).every((d) => d > 0 && d < 4);
let mono = (a) => a.slice(1).every((d, i) => Math.sign(d) === Math.sign(a[i]));
let diff = (r) => r.slice(1).map((v, i) => v - r[i]);
let safe = (a) => bounds(diff(a)) && mono(diff(a));

let part1 = reports.filter(safe).length;
console.log("part1 =", part1);
// =483

let part2 = reports.filter((a) => a.map((_, i) => a.filter((_, j) => j != i)).find(safe)).length;
console.log("part2 =", part2);
// =528
