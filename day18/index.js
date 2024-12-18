let raw = await Bun.file("day18/input").text();
let coords = raw.split("\n").map((l) => l.split(",").map(Number));

let dim = 71;
let grid = Array.from({ length: dim }).map(() =>
  Array.from({ length: dim }).fill(Infinity)
);
for (let t = 0; t < coords.length; t++) {
  let [x, y] = coords[t];
  grid[y][x] = t;
}

function bfs(bytes) {
  let q = [[0, 0, 0]];
  let v = new Set();
  v.add("0,0");
  while (q.length) {
    let [x, y, steps] = q.shift();
    if (x === dim - 1 && y === dim - 1) return steps;

    for (let [dx, dy] of [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ]) {
      let [nx, ny] = [x + dx, y + dy];
      if (nx < 0 || ny < 0 || nx >= dim || ny >= dim) continue;
      if (grid[ny][nx] < bytes) continue;

      let key = `${nx},${ny}`;
      if (v.has(key)) continue;

      v.add(key);
      q.push([nx, ny, steps + 1]);
    }
  }
  return -1;
}

let part1 = bfs(1024);
console.log("part1 =", part1);
// =280

function binsearch(max) {
  let left = 1;
  let right = max;
  while (left < right) {
    let mid = (left + right) >> 1;
    if (bfs(mid) === -1) right = mid;
    else left = mid + 1;
  }
  return left;
}

let part2 = coords[binsearch(coords.length) - 1];
console.log("part2 =", part2);
// =28,56
