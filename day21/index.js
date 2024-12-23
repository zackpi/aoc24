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
  console.log("exec:", n, code);
  if (n === 1) return code.length;
  let min = 0;
  for (let subcode of sequence(dpad, code)) {
    let steps = exec(n - 1, subcode);
    if (steps < min) min = steps;
  }
  return min;
}

function complexity(code, n) {
  let minComplexity = Infinity;
  let minSequence = null;
  for (let seqNum of sequence(numpad, code)) {
    let steps = exec(n, seqNum);
    if (steps < minComplexity) {
      minComplexity = steps;
      minSequence = seqNum;
    }
    // for (let seqDir1 of sequence(dpad, seqNum)) {
    //   let localMinComplexity = Infinity;
    //   let localMinSequence = null;
    //   for (let seqDir2 of sequence(dpad, seqDir1)) {
    //     let complexity = seqDir2.length;
    //     if (complexity < localMinComplexity) {
    //       localMinComplexity = complexity;
    //       localMinSequence = seqDir2;
    //     }
    //   }

    //   if (localMinComplexity < minComplexity) {
    //     minComplexity = localMinComplexity;
    //     minSequence = localMinSequence;
    //   }
    // }
  }
  return minComplexity;
}

function part(n) {
  let sum = 0;
  for (let code of codes) {
    console.log("code:", code);
    let cmp = complexity(code, n);
    let num = Number(code.slice(0, 3));
    sum += cmp * num;
  }
  return sum;
}

let part1 = part(2);
console.log("part1 =", part1);
// =137870

// let part2 = part(25);
// console.log("part2 =", part2);
// // =
