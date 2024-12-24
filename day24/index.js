let raw = await Bun.file("day24/input").text();
let [inputsRaw, gatesRaw] = raw.split("\n\n").map((x) => x.split("\n"));

let inputs = Object.fromEntries(
  inputsRaw.map((x) => {
    let [name, val] = x.split(": ");
    return [name, Number(val)];
  })
);
let gates = gatesRaw.map((x) => {
  let [func, out] = x.split(" -> ");
  let [a, op, b] = func.split(" ");
  return { a, op, b, out };
});
let gatesMap = Object.fromEntries(gates.map((x) => [x.out, x]));

let outBits = 0;
for (let { out } of gates) {
  if (out.startsWith("z")) {
    let bit = Number(out.slice(1));
    outBits = Math.max(outBits, bit);
  }
}
outBits++;

function resolve(name) {
  console.log("resolve", name);
  if (typeof name === "number") return name;
  if (name in inputs) return inputs[name];
  if (name in gatesMap) {
    console.log("gates map", name);
    let { a, op, b } = gatesMap[name];
    if (op === "AND") return resolve(a) & resolve(b);
    if (op === "OR") return resolve(a) | resolve(b);
    if (op === "XOR") return resolve(a) ^ resolve(b);
    if (op === "LSHIFT") return resolve(a) << resolve(b);
    if (op === "RSHIFT") return resolve(a) >> resolve(b);
    if (op === "NOT") return ~resolve(a);
  }
  return Number(name);
}

let z = 0n;
for (let i = 0n; i < BigInt(outBits); i++) {
  let out = "z" + `${i}`.padStart(2, "0");
  z += BigInt(resolve(out)) << i;
}

let part1 = z;
console.log("part1 =", part1);
// =

let part2 = 0;
console.log("part2 =", part2);
// =
