let raw = await Bun.file("day20/input").text();
let grid = raw.split("\n");
let w = grid[0].length;
let h = grid.length;
let pair = (i) => [i % w, (i / w) | 0];

let START = pair(grid.join("").indexOf("S"));
let END = pair(grid.join("").indexOf("E"));

let dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];
let key = (x, y) => x + "," + y;

function cheats(len) {
  // bfs to calculate APSP from all empty cells (no cheats)
  let apsp = {};
  {
    let q = [[END, 0]];
    let seen = new Set([key(...END)]);
    while (q.length) {
      let [[x, y], steps] = q.shift();
      let k = key(x, y);
      if (apsp[k] !== undefined) continue;
      apsp[k] = steps;

      for (let d of dirs) {
        let [nx, ny] = [x + d[0], y + d[1]];
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
        if (grid[ny][nx] === "#") continue;

        let nk = key(nx, ny);
        if (seen.has(nk)) continue;
        seen.add(nk);

        q.push([[nx, ny], steps + 1]);
      }
    }
  }
  let nocheat = apsp[key(...START)];

  // bfs (with cheats!)
  let nCheats = 0;
  {
    let q = [[START, 0]];
    let seen = new Set([key(...START)]);
    while (q.length) {
      let [[x, y], steps] = q.shift();

      for (let d of dirs) {
        let [nx, ny] = [x + d[0], y + d[1]];
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
        if (grid[ny][nx] === "#") continue;

        let nk = key(nx, ny);
        if (seen.has(nk)) continue;
        seen.add(nk);

        q.push([[nx, ny], steps + 1]);
      }

      // CHEAT!
      for (let dx = -len; dx <= len; dx++) {
        for (let dy = -len; dy <= len; dy++) {
          if (dx === 0 && dy === 0) continue;
          let manhat = Math.abs(dx) + Math.abs(dy);
          if (manhat > len) continue;
          let [nx, ny] = [x + dx, y + dy];
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
          if (grid[ny][nx] === "#") continue;

          let rest = apsp[key(nx, ny)];
          let total = steps + manhat + rest;
          if (nocheat - total >= 100) nCheats++;
        }
      }
    }
  }

  return nCheats;
}

let part1 = cheats(2);
console.log("part1 =", part1);
// =1441

let part2 = cheats(20);
console.log("part2 =", part2);
// =1021490
