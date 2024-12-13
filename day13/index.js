let raw = await Bun.file("day13/input_small").text();

let e = 1e-10;
let vec = (s) => s.match(/\d+/g).map(Number);
let sys = raw.split("\n\n").map((s) => s.split("\n").map(vec));

let solve = (a, b, c) => {
  let x = (c[0] / b[0] - c[1] / b[1]) / (a[0] / b[0] - a[1] / b[1]);
  let y = -(a[0] / b[0]) * x + c[0] / b[0];
  let ix = ~~(x + e);
  let iy = ~~(y + e);
  return [ix, iy, Math.abs(ix - x) < e && Math.abs(iy - y) < e];
};

let part1 = 0;
for (let [a, b, c] of sys) {
  let [x, y, valid] = solve(a, b, c);
  let c0 = a[0] * x + b[0] * y;
  let c1 = a[1] * x + b[1] * y;
  console.log(x, y, valid, c0, c1);
  if (valid) part1 += x * 3 + y;
}
console.log("part1 =", part1);
// =33209

let solveRref = (a, b, c) => {
  let M = [
    [...a, c[0]],
    [...b, c[1]],
  ];
  console.log(c);
  return [0, 0, false];
};

let part2 = 0;
let off = 1e12;
for (let [a, b, c] of sys) {
  let [x, y, valid] = solveRref(a, b, [c[0] + off, c[1] + off]);
  if (valid) part2 += x * 3 + y;
}
console.log("part2 =", part2);
// =
