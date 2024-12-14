let raw = await Bun.file("day13/input").text();

let sys = raw
  .split("\n\n")
  .map((s) => s.split("\n").map((s) => s.match(/\d+/g).map(Number)));

let e = 1e-10;
let solve = (a, b, c) => {
  let x = (c[0] * b[1] - c[1] * b[0]) / (a[0] * b[1] - a[1] * b[0]);
  let y = (c[0] - a[0] * x) / b[0];
  let ix = ~~(x + e);
  let iy = ~~(y + e);
  return [ix, iy, Math.abs(ix - x) < e && Math.abs(iy - y) < e];
};

let solveRref = (a, b, c) => {
  // console.log();
  // console.log(`[ ${a[0]} ${b[0]} | ${c[0]} ]`);
  // console.log(`[ ${a[1]} ${b[1]} | ${c[1]} ]`);

  let xNumer = c[0] * b[1] - c[1] * b[0];
  let xDenom = a[0] * b[1] - a[1] * b[0];
  let x = xNumer / xDenom;

  // console.log();
  // console.log(`xNumer: ${xNumer} = ${c[0]} * ${b[1]} - ${c[1]} * ${b[0]}`);
  // console.log(`xDenom: ${xDenom} = ${a[0]} * ${b[1]} - ${a[1]} * ${b[0]}`);
  // console.log(`x: ${x} = ${xNumer} / ${xDenom}`);

  // if xNumer is divisible by xDenom, then x is an int

  let yNumer = xDenom * c[0] - a[0] * xNumer;
  let yDenom = xDenom * b[0];
  let y = yNumer / yDenom;

  // console.log();
  // console.log(`yNumer: ${yNumer} = ${xDenom} * ${c[0]} - ${a[0]} * ${xNumer}`);
  // console.log(`yDenom: ${yDenom} = ${xDenom} * ${b[0]}`);
  // console.log(`y: ${y} = ${yNumer} / ${yDenom}`);

  return [x, y, xNumer % xDenom === 0n && yNumer % yDenom === 0n];
};

let part1 = 0;
for (let [a, b, c] of sys) {
  let [x, y, valid] = solve(a, b, c);
  if (valid) part1 += x * 3 + y;
}
console.log("part1 =", part1);
// =33209

sys = raw
  .split("\n\n")
  .map((s) => s.split("\n").map((s) => s.match(/\d+/g).map(BigInt)));
let part2 = 0;
let off = BigInt(1e13);
for (let [a, b, c] of sys) {
  let [x, y, valid] = solveRref(a, b, [c[0] + off, c[1] + off]);
  if (valid) part2 += Number(x * 3n + y);
}
console.log("part2 =", part2);
// =83102355665474
