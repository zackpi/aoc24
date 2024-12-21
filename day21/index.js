let raw = await Bun.file("day21/input_small").text();
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

// function permute(dx, dy) {
//   let h = dx < 0 ? "<" : ">";
//   let v = dy < 0 ? "^" : "v";
//   let ax = Math.abs(dx);
//   let ay = Math.abs(dy);

//   let total = ax + ay;
//   let perms = [];
//   for (let i = 0; i < 1 << total; i++) {
//     let perm = i
//       .toString(2)
//       .padStart(total, "0")
//       .replace(/./g, (x) => (x === "0" ? h : v));
//     perms.push(perm);
//   }

//   return perms;
// }

let ch = {};
function choose(dx, dy) {
  let key = `${dx},${dy}`;
  if (key in ch) return ch[key];

  let h = dx < 0 ? "<" : ">";
  let v = dy < 0 ? "^" : "v";
  if (dx === 0) return [v.repeat(dy)];
  if (dy === 0) return [h.repeat(dx)];
  let sx = Math.sign(dx);
  let sy = Math.sign(dy);
  let hs = choose(dx - sx, dy).map((x) => h + x);
  let vs = choose(dx, dy - sy).map((x) => v + x);

  let ret = hs.concat(vs);
  ch[key] = ret;
  return ret;
}

process.exit(0);

function complexity(bots, code) {
  let [pad] = bots[0];

  let seqs = [];
  for (let char of code) {
  }

  complexity(bots.slice(1));
}

let bots = [
  [numpad, ["A"]],
  [dpad, ["A"]],
  [dpad, ["A"]],
  // one more dpad, controlled by user
];
console.log(complexity(bots, "029A"));
