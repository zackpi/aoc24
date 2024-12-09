let raw = await Bun.file("day08/input").text();
let grid = raw.split("\n").map((l) => l.split(""));
let w = grid[0].length;
let h = grid.length;

let bounded = ([x, y]) => x >= 0 && x < w && y >= 0 && y < h;
let i = ([x, y]) => y * w + x;

let freq = {};
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    let f = grid[y][x];
    if (f !== ".") freq[f] = [...(freq[f] || []), [x, y]];
  }
}
let coords = Object.values(freq).flatMap((a) =>
  a
    .slice(0, a.length - 1)
    .flatMap((c1, j) => a.slice(j + 1).map((c2) => [c1, c2]))
);

let part1 = (() => {
  let nodes = new Set();
  for (let [a, b] of coords) {
    let n = [2 * a[0] - b[0], 2 * a[1] - b[1]],
      m = [2 * b[0] - a[0], 2 * b[1] - a[1]];
    if (bounded(n)) nodes.add(i(n));
    if (bounded(m)) nodes.add(i(m));
  }
  return nodes.size;
})();
console.log("part1 =", part1);
// =261

let part2 = (() => {
  let nodes = new Set();
  for (let [a, b] of coords) {
    let dx = a[0] - b[0];
    let dy = a[1] - b[1];
    while (bounded(a)) {
      nodes.add(i(a));
      a = [a[0] + dx, a[1] + dy];
    }
    while (bounded(b)) {
      nodes.add(i(b));
      b = [b[0] - dx, b[1] - dy];
    }
  }
  return nodes.size;
})();
console.log("part2 =", part2);
// =898
