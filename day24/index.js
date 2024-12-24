let raw = await Bun.file("day24/input").text();
let [inputsRaw, gatesRaw] = raw.split("\n\n").map((x) => x.split("\n"));
let inputs = Object.fromEntries(
  inputsRaw.map((input) => {
    let [name, val] = input.split(": ");
    return [name, BigInt(val)];
  })
);
let gates = gatesRaw.map((x) => x.split(" -> "));
let funcMap = Object.fromEntries(
  gates.flatMap((x) => {
    let [a, op, b] = x[0].split(" ");
    return [
      [`${a} ${op} ${b}`, x[1]],
      [`${b} ${op} ${a}`, x[1]],
    ];
  })
);
let outMap = Object.fromEntries(gates.map((x) => [x[1], x[0]]));

let name = (p, i) => p + `${i}`.padStart(2, "0");

function resolve(out, swaps = {}) {
  if (typeof out === "bigint") return out;
  if (out in inputs) return inputs[out];
  if (out in outMap) {
    if (out in swaps) out = swaps[out];
    let [a, op, b] = outMap[out].split(" ");
    if (op === "AND") return resolve(a, swaps) & resolve(b, swaps);
    if (op === "OR") return resolve(a, swaps) | resolve(b, swaps);
    if (op === "XOR") return resolve(a, swaps) ^ resolve(b, swaps);
  }
  return Number(out);
}
function resolveAll(swaps = {}) {
  let z = 0n;
  for (let i = 0; i < 46; i++) {
    z += resolve(name("z", i), swaps) << BigInt(i);
  }
  return z;
}

let part1 = resolveAll();
console.log("part1 =", part1);
// =52956035802096

// check for defects in a full-adder circuit
function adder() {
  let swaps = { tqr: "hth", hth: "tqr" }; // found via inspection
  function expect(func, exp) {
    let obs = funcMap[func];
    if (!obs) throw new Error("missing: " + func);
    if (obs === exp) return;
    swaps[exp] = obs;
    swaps[obs] = exp;
  }

  function wire(name) {
    let obs = funcMap[name];
    if (obs in swaps) return swaps[obs];
    return obs;
  }

  let c = [""];
  for (let i = 0; i < 45; i++) {
    let aXorB = name("x", i) + " XOR " + name("y", i);
    let aAndB = name("x", i) + " AND " + name("y", i);

    if (i === 0) {
      expect(aXorB, "z00");
      c.push(wire(aAndB));
    } else if (i < 44) {
      let si = wire(aXorB) + " XOR " + c[i];
      // console.log(i, si, funcMap[si]);
      expect(si, name("z", i));

      let cAndXor = c[i] + " AND " + wire(aXorB);
      let cOut = wire(cAndXor) + " OR " + wire(aAndB);
      c.push(wire(cOut));
    }
  }

  return swaps;
}

let swaps = adder();

if (false)
  check: {
    let vals = inputsRaw.map((x) => BigInt(x.split(": ")[1]));
    let toInt = (bs) => bs.reduce((acc, b, i) => acc + (b << BigInt(i)), 0n);
    let xs = vals.slice(0, 45);
    let ys = vals.slice(45, 90);
    let zExp = toInt(xs) + toInt(ys);
    let zObs = resolveAll(swaps);
    console.log("adder check =", zExp === zObs);
  }

let part2 = Object.keys(swaps).sort().join(",");
console.log("part2 =", part2);
// =hnv,hth,kfm,tqr,vmv,z07,z20,z28
