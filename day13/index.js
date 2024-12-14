let raw = await Bun.file("day13/input").text();
let soe = raw
  .split("\n\n")
  .map((s) => s.split("\n").map((s) => s.match(/\d+/g).map(BigInt)));

function solve(a, b, c) {
  let xn = c[0] * b[1] - c[1] * b[0];
  let xd = a[0] * b[1] - a[1] * b[0];
  let x = xn / xd;

  let yn = xd * c[0] - a[0] * xn;
  let yd = xd * b[0];
  let y = yn / yd;

  return [x, y, xn % xd === 0n && yn % yd === 0n];
}

let part1 = 0;
for (let [a, b, c] of soe) {
  let [x, y, valid] = solve(a, b, c);
  if (valid) part1 += Number(x * 3n + y);
}
console.log("part1 =", part1);
// =33209

let part2 = 0;
let off = BigInt(1e13);
for (let [a, b, c] of soe) {
  let [x, y, valid] = solve(a, b, [c[0] + off, c[1] + off]);
  if (valid) part2 += Number(x * 3n + y);
}
console.log("part2 =", part2);
// =83102355665474
