let raw = await Bun.file("day10/input").text();
let data = raw.split("\n").map((x) => x.split("").map(Number));
let w = raw.indexOf("\n");
let h = (raw.length / w) | 0;

let oob = ([x, y]) => x < 0 || y < 0 || x >= w || y >= h;
let dirs = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];

let zeros = [];
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    if (data[y][x] === 0) zeros.push([x, y]);
  }
}

function trails(c) {
  let cs = [c];
  for (let i = 1; i <= 9; i++) {
    cs = cs.flatMap((c) =>
      dirs
        .map((d) => [c[0] + d[0], c[1] + d[1]])
        .filter((n) => !oob(n) && data[n[1]][n[0]] === i)
    );
  }
  return cs;
}

let score = (cs) => new Set(cs.map((c) => c.join(","))).size;
let rating = (cs) => cs.length;

let part1 = zeros.reduce((sum, cs) => sum + score(trails(cs)), 0);
console.log("part1 =", part1);
// =646

let part2 = zeros.reduce((sum, cs) => sum + rating(trails(cs)), 0);
console.log("part2 =", part2);
// =1494
