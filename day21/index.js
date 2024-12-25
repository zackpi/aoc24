let raw = await Bun.file("day21/input").text();
let codes = raw.split("\n");

/*
dpad:
    +---+---+
    | ^ | A |
+---+---+---+
| < | v | > |
+---+---+---+

numpad:
+---+---+---+
| 7 | 8 | 9 |
+---+---+---+
| 4 | 5 | 6 |
+---+---+---+
| 1 | 2 | 3 |
+---+---+---+
    | 0 | A |
    +---+---+
*/

let pair = (i) => [i % 3, (i / 3) | 0];
let numpad = "789456123_0A";
let dpad = "_^A<v>";

let ch = {};
function choose(pad, x, y, dx, dy) {
  if (pad[x + y * 3] === "_") return [];

  let key = `${pad}|${x},${y}|${dx},${dy}`;
  if (key in ch) return ch[key];

  let h = dx < 0 ? "<" : ">";
  let v = dy < 0 ? "^" : "v";
  let sx = Math.sign(dx);
  let sy = Math.sign(dy);
  if (sx === 0) return [v.repeat(sy * dy)];
  if (sy === 0) return [h.repeat(sx * dx)];

  let hs = choose(pad, x + sx, y, dx - sx, dy).map((x) => h + x);
  let vs = choose(pad, x, y + sy, dx, dy - sy).map((x) => v + x);

  let ret = hs.concat(vs);
  ch[key] = ret;
  return ret;
}

function sequence(pad, code) {
  let seqs = [[]];
  let last = "A";
  for (let char of code) {
    let [sx, sy] = pair(pad.indexOf(last));
    let [ex, ey] = pair(pad.indexOf(char));
    let dx = ex - sx;
    let dy = ey - sy;

    let newSeqs = [];
    for (let seq of seqs) {
      let paths = choose(pad, sx, sy, dx, dy);
      for (let path of paths) {
        newSeqs.push(seq.concat(path));
      }
    }

    seqs = newSeqs;
    last = char;
  }
  return seqs.map((s) => s.join("A") + "A");
}

function exec(n, code) {
  if (n === 0) return code.length;
  let min = Infinity;
  for (let subcode of sequence(dpad, code)) {
    let steps = exec(n - 1, subcode);
    if (steps < min) min = steps;
  }
  return min;
}

let memo = {};
function minSequence(state, from, to) {
  let key = `${state.join(",")}:${from}->${to}`;
  if (key in memo) {
    console.log("hit");
    return memo[key];
  }

  let minSteps = Infinity;

  let [sx, sy] = pair(dpad.indexOf(from));
  let [ex, ey] = pair(dpad.indexOf(to));
  let dx = ex - sx;
  let dy = ey - sy;
  if (n === 0) {
    minSteps = Math.abs(dx) + Math.abs(dy);
  } else {
    let sequence = choose(dpad, sx, sy, dx, dy);

    console.log("sequence:", sequence);
  }

  return (memo[key] = minSteps);
}

function complexity(code, n) {
  let minComp = Infinity;
  let minSeq = null;
  console.log();
  console.log("complexity:", code, n);
  for (let seqNum of sequence(numpad, code)) {
    console.log("  seqNum:", seqNum);

    let state = Array(n).fill("A");
    for (let char of seqNum) {
      let steps = minSequence(state, char);
      console.log("    steps:", state[0], "->", char, "=", steps);
      last = char;
      if (steps < minComp) {
        minComp = steps;
        minSeq = seqNum;
      }
    }
  }
  return minComp;
}

function part(n) {
  let sum = 0;
  for (let code of codes) {
    let cmp = complexity(code, n);
    let num = Number(code.slice(0, 3));
    sum += cmp * num;
  }
  return sum;
}

let part1 = part(2);
console.log("part1 =", part1);
// =137870

process.exit(0);

let part2 = part(25);
console.log("part2 =", part2);
// =
