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

let part1 = (() => {
  let zeros = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (data[y][x] === 0) zeros.push([x, y]);
    }
  }

  function score(c) {
    let coords = [c];
    for (let i = 1; i <= 9; i++) {
      coords = coords.flatMap((c) =>
        dirs
          .map((d) => [c[0] + d[0], c[1] + d[1]])
          .filter((n) => !oob(n) && data[n[1]][n[0]] === i)
      );
    }
    return new Set(coords.map((c) => c.join(","))).size;
  }

  return zeros.map(score).reduce((a, b) => a + b, 0);
})();
console.log("part1 =", part1);
// =

let part2 = (() => {
  let zeros = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (data[y][x] === 0) zeros.push([x, y]);
    }
  }

  function rating(c) {
    let coords = [c];
    for (let i = 1; i <= 9; i++) {
      coords = coords.flatMap((c) =>
        dirs
          .map((d) => [c[0] + d[0], c[1] + d[1]])
          .filter((n) => !oob(n) && data[n[1]][n[0]] === i)
      );
    }
    return coords.length;
  }

  return zeros.map(rating).reduce((a, b) => a + b, 0);
})();
console.log("part2 =", part2);
// =
