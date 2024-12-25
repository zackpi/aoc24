let raw = await Bun.file("day21/input").text();
let codes = raw.split("\n");

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

let memo = {};
function complexity(pad, code, n) {
  let comp = 0;

  let from = "A";
  for (let to of code) {
    let key = `${n}|${from}|${to}`;
    if (!(key in memo)) {
      let [sx, sy] = pair(pad.indexOf(from));
      let [ex, ey] = pair(pad.indexOf(to));

      let minComp = Infinity;
      let paths = choose(pad, sx, sy, ex - sx, ey - sy);
      for (let p of paths) {
        let c = n > 0 ? complexity(dpad, p.concat("A"), n - 1) : p.length + 1;
        if (c < minComp) minComp = c;
      }
      memo[key] = minComp;
    }

    comp += memo[key];
    from = to;
  }

  return comp;
}

function part(n) {
  let sum = 0;
  for (let code of codes) {
    let cmp = complexity(numpad, code, n);
    let num = Number(code.slice(0, 3));
    sum += cmp * num;
  }
  return sum;
}

let part1 = part(2);
console.log("part1 =", part1);
// =137870

let part2 = part(25);
console.log("part2 =", part2);
// =170279148659464
