let raw = await Bun.file("day14/input").text();
let bots = raw.split("\n").map((s) => s.match(/\-?\d+/g).map(Number));

let mod = (x, m) => ((x % m) + m) % m;
let linEval = (w, h, t) => {
  let hw = ~~(w / 2);
  let hh = ~~(h / 2);
  let quad = [0, 0, 0, 0];
  for (let bot of bots) {
    let [px, py, vx, vy] = bot;
    let x = mod(px + vx * t, w);
    let y = mod(py + vy * t, h);
    if (x === hw || y === hh) continue;
    let qx = x > hw ? 1 : 0;
    let qy = y > hh ? 2 : 0;
    quad[qx + qy]++;
  }
  return eval(quad.join("*"));
};

let part1 = linEval(101, 103, 100);
console.log("part1 =", part1);
// =226548000

let sim = (w, h) => {
  let c = (x) => ~~(x / 10);
  let dw = c(w) + 1;
  let dh = c(h) + 1;
  let dMax = -Infinity;
  let sec = 0;
  for (let s = 1; s <= w * h; s++) {
    let density = Array.from({ length: dh }).map(() => Array(dw).fill(0));

    for (let bot of bots) {
      let [px, py, vx, vy] = bot;
      bot[0] = mod(px + vx, w);
      bot[1] = mod(py + vy, h);
      density[c(bot[1])][c(bot[0])]++;
    }

    for (let j = 0; j < dh; j++) {
      for (let i = 0; i < dw; i++) {
        let d = density[j][i];
        if (d > dMax) {
          dMax = d;
          sec = s;
        }
      }
    }
  }
  return sec;
};

let part2 = sim(101, 103);
console.log("part2 =", part2);
// =7753
