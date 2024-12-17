let raw = await Bun.file("day17/input").text();
let lines = raw.split("\n");
let A = BigInt(lines[0].slice(12));
let prgm = lines[4].slice(9).split(",").map(BigInt);

function exec(A, B, C, prgm) {
  let ip = 0n;
  let out = [];
  while (ip < prgm.length) {
    let i = prgm[ip];
    let o = prgm[ip + 1n];

    let r = o;
    if (r == 4n) r = A;
    else if (r == 5n) r = B;
    else if (r == 6n) r = C;

    if (i == 0n) A >>= r; // adv
    else if (i == 1n) B ^= o; // bxl
    else if (i == 2n) B = r & 7n; // bst
    else if (i == 3n) ip = A == 0n ? ip : o - 2n; // jnz
    else if (i == 4n) B ^= C; // bxc
    else if (i == 5n) out.push(r & 7n); // out
    else if (i == 6n) B = A >> r; // bdv
    else C = A >> r; // cdv

    ip += 2n;
  }
  return out;
}

let part1 = exec(A, 0n, 0n, prgm).join(",");
console.log("part1 =", part1);
// =6,2,7,2,3,1,6,0,5

function quine(prgm) {
  let stack = [[0, 0n]];
  while (stack.length) {
    let [i, a] = stack.pop();
    if (i == prgm.length) return a;

    for (let w = 7n; w >= 0n; w--) {
      let nextA = (a << 3n) | w;
      let out = exec(nextA, 0n, 0n, prgm);
      if (out[0] == prgm.at(-i - 1)) stack.push([i + 1, nextA]);
    }
  }
  return -1;
}

let part2 = quine(prgm);
console.log("part2 =", part2);
// =236548287712877
