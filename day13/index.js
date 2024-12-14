let raw = await Bun.file("day13/input_small").text();

let e = 1e-10;
let sys = raw
  .split("\n\n")
  // .slice(0, 2)
  .map((s) => s.split("\n").map((s) => s.match(/\d+/g).map(Number)));

let solve = (a, b, c) => {
  // let x = (c[0] / b[0] - c[1] / b[1]) / (a[0] / b[0] - a[1] / b[1]);
  let x = (c[0] * b[1] - c[1] * b[0]) / (a[0] * b[1] - a[1] * b[0]);
  let y = (c[0] - a[0] * x) / b[0];
  let ix = ~~(x + e);
  let iy = ~~(y + e);
  return [ix, iy, Math.abs(ix - x) < e && Math.abs(iy - y) < e];
};

let part1 = 0;
for (let [a, b, c] of sys) {
  let [x, y, valid] = solve(a, b, c);
  if (valid) part1 += x * 3 + y;
}
console.log("part1 =", part1);
// =33209

let solveRref = (a, b, c) => {
  // let x = (c[0] * b[1] - c[1] * b[0]) / (a[0] * b[1] - a[1] * b[0]);
  // let y = (c[0] - a[0] * x) / b[0];

  let xNumer = c[0] * b[1] - c[1] * b[0];
  let xDenom = a[0] * b[1] - a[1] * b[0];

  console.log();
  console.log("xNumer");
  console.log(`${c[0]} * ${b[1]} - ${c[1]} * ${b[0]} =`);
  console.log(xNumer.toString());

  console.log();
  console.log("xDenom");
  console.log(`${a[0]} * ${b[1]} - ${a[1]} * ${b[0]} =`);
  console.log(xDenom.toString());

  // if xNumer is divisible by xDenom, then x is an int

  let x = xNumer / xDenom;

  let yNumer = xDenom * c[0] - a[0] * xNumer;
  let yDenom = xDenom * b[0];

  let y = yNumer / yDenom;

  return [x, y, false];
};

sys = raw
  .split("\n\n")
  .map((s) => s.split("\n").map((s) => s.match(/\d+/g).map(BigInt)));
let part2 = 0;
let off = BigInt(1e12);
for (let [a, b, c] of sys) {
  console.log();
  console.log(`[ ${a[0]} ${b[0]} | ${c[0] + off} ]`);
  console.log(`[ ${a[1]} ${b[1]} | ${c[1] + off} ]`);

  let [x, y, valid] = solveRref(a, b, [c[0] + off, c[1] + off]);

  let c0 = a[0] * x + b[0] * y;
  let c1 = a[1] * x + b[1] * y;
  console.log();
  console.log("c0  c1");
  console.log((c0 - off - c[0]).toString(), (c1 - off - c[1]).toString());

  if (valid) part2 += x * 3 + y;
}
console.log("part2 =", part2);
// =
