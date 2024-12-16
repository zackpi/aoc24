let raw = await Bun.file("day16/input").text();
let grid = raw.split("\n");
let w = grid[0].length;
let h = grid.length;
let S = grid.join("").indexOf("S");
let E = grid.join("").indexOf("E");

let dirs = [
  [0, -1], // up
  [1, 0], // right
  [0, 1], // down
  [-1, 0], // left
];
let mod4 = (d) => ((d % 4) + 4) % 4;

function shortest() {
  let q = [[S, 1, 0, [S]]];
  let seen = new Map();
  let paths = [];
  while (q.length) {
    let [i, dir, score, path] = q.shift();
    if (i == E) {
      paths.push([path, score]);
      continue;
    }

    let k = (i << 2) | dir;
    if (seen.has(k) && seen.get(k) < score) continue;
    seen.set(k, score);
    let x = i % w;
    let y = (i / w) | 0;

    // turn
    q.push([i, mod4(dir + 1), score + 1000, path]);
    q.push([i, mod4(dir - 1), score + 1000, path]);

    // move
    let [dx, dy] = dirs[dir];
    let nx = x + dx;
    let ny = y + dy;
    if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
    if (grid[ny][nx] == "#") continue;
    let ni = ny * w + nx;
    q.push([ni, dir, score + 1, [...path, ni]]);
  }

  let minScore = Math.min(...paths.map((p) => p[1]));
  let minPaths = paths.filter((p) => p[1] == minScore);
  let pathSet = new Set();
  for (let [path] of minPaths) {
    for (let i of path) pathSet.add(i);
  }

  return [minScore, pathSet.size];
}

let [part1, part2] = shortest();
console.log("part1 =", part1);
// =102504

console.log("part2 =", part2);
// =535
