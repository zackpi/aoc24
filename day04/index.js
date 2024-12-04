let raw = await Bun.file("day04/input").text();

let grid = raw.split("\n").map((l) => l.split(""));
let rows = grid.length;
let cols = grid[0].length;
let char = ([ci, ri]) => grid[ri][ci];
let oob = ([c, r]) => c < 0 || c > cols - 1 || r < 0 || r > rows - 1;

let range = (s, e) => Array.from({ length: e - s }).map((_, i) => i + s);

let line = ([f0, f1], [s0, s1]) =>
  Array.from({ length: 4 }).map((_, i) => [f0 + i * s0, f1 + i * s1]);

let part1 = range(0, rows)
  .map((r) =>
    range(0, cols).map((c) =>
      range(-1, 2).map((dr) => range(-1, 2).map((dc) => line([c, r], [dc, dr])))
    )
  )
  .flat(3)
  .reduce(
    (count, l) =>
      count + (!l.find(oob) && l.map(char).join("") === "XMAS" ? 1 : 0),
    0
  );

console.log("part1 =", part1);
// =2406

let corners = (p) => [
  p,
  ...Array.from({ length: 4 }).map((_, i) => [
    p[0] + (i % 2 === 1 ? 1 : -1),
    p[1] + (i / 2 > 0.5 ? 1 : -1),
  ]),
];

let patterns = ["AMMSS", "ASSMM", "AMSMS", "ASMSM"];
let part2 = range(1, rows - 1)
  .flatMap((r) => range(1, cols - 1).map((c) => [c, r]))
  .reduce(
    (count, root) =>
      count + (patterns.includes(corners(root).map(char).join("")) ? 1 : 0),
    0
  );

console.log("part2 =", part2);
// =1807
