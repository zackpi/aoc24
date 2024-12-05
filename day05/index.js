let raw = await Bun.file("day05/input").text();

let [rulesRaw, updatesRaw] = raw.split("\n\n");
let rules = rulesRaw
  .split("\n")
  .map((l) => l.split("|"))
  .reduce((r, [from, to]) => ({ ...r, [from]: [...(r[from] || []), to] }), {});
let updates = updatesRaw.split("\n").map((l) => l.split(","));

const ordered = (u) =>
  u.every((vi, i) => !u.find((vj, j) => j < i && rules[vi]?.includes(vj)));
const addMiddle = (s, u) => s + Number(u[Math.trunc(u.length / 2)]);

let part1 = updates.filter(ordered).reduce(addMiddle, 0);
console.log("part1 =", part1);
// =6505

let part2 = updates
  .filter((u) => !ordered(u))
  .map((u) => u.toSorted((a, b) => (rules[b]?.includes(a) ? -1 : 1)))
  .reduce(addMiddle, 0);
console.log("part2 =", part2);
// =6897
