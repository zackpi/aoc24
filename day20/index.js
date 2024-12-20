let raw = await Bun.file("day20/input").text();
let grid = raw.split("\n");
let w = grid[0].length;
let h = grid.length;
let char = (i) => grid[(i / w) | 0][i % w];

let START = grid.join("").indexOf("S");
let END = grid.join("").indexOf("E");

let step = (p, d) => {
  if (d === 0) return [p - w, p / w > 0];
  if (d === 1) return [p + w, p / w < h - 1];
  if (d === 2) return [p - 1, p % w > 0];
  if (d === 3) return [p + 1, p % w < w - 1];
};

function spsp(cheat) {
  let q = [[START, 0]];
  let seen = new Set([START]);

  while (q.length) {
    let [p, s] = q.shift();
    for (let d = 0; d < 4; d++) {
      let [np, bounds] = step(p, d);
      if (!bounds || seen.has(np)) continue;
      seen.add(np);
      if (np === END) return s + 1;
      if (char(np) === "#" && np !== cheat) continue;
      q.push([np, s + 1]);
    }
  }

  return -1;
}

function apsp() {
  let nocheat = spsp(-1);

  let cheats = {};
  let nAbove100 = 0;
  for (let i = 0; i < w * h; i++) {
    if (char(i) !== "#") continue;
    let steps = spsp(i);
    if (steps < 0) continue;
    let saved = nocheat - steps;
    cheats[saved] = (cheats[saved] || 0) + 1;
    if (saved >= 100) nAbove100++;
  }

  return nAbove100;
}

let part1 = apsp();
console.log("part1 =", part1);
// =1441

let part2 = 0;
console.log("part2 =", part2);
// =
