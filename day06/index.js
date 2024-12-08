let raw = await Bun.file("day06/input").text();

let w = raw.indexOf("\n");
let h = ~~(raw.length / w);
let x = (i) => i % w;
let y = (i) => ~~(i / w);

let U = 1;
let R = 2;
let D = 4;
let L = 8;
let X = 16;

let step = (i, d) =>
  d === D
    ? [i + w, y(i) > h - 2]
    : d === L
    ? [i - 1, x(i) < 1]
    : d === U
    ? [i - w, y(i) < 1]
    : [i + 1, x(i) > w - 2];
let rotate = (d) => (d === D ? L : d === L ? U : d === U ? R : D);

let gridStr = raw.replaceAll("\n", "");
let grid = gridStr.split("").map((c) => (c === "#" ? X : 0));
let guard = gridStr.indexOf("^");

function walkPart1(grid, i, dir) {
  let steps = 1;
  while (1) {
    let [next, oob] = step(i, dir);
    if (oob) break;
    let char = grid[next];
    if (char === X) dir = rotate(dir);
    else {
      grid[i] = dir;
      i = next;
      if (char === 0) steps++;
    }
  }
  return steps;
}
let part1 = walkPart1([...grid], guard, U);
console.log("part1 =", part1);
// =4826

function walkInner(inner, i, dir) {
  while (1) {
    let [next, oob] = step(i, dir);
    if (oob) return false;
    let c = inner[next];
    if ((c & dir) > 0) return true;
    if (c > 0) {
      inner[next] |= dir;
      dir = rotate(dir);
    } else i = next;
  }
}

function walkPart2(outer, i, dir) {
  let loops = [];
  while (1) {
    outer[i] = dir;
    let [next, oob] = step(i, dir);
    if (oob) break;
    let c = outer[next];
    if (c === X) dir = rotate(dir);
    else {
      if (c === 0) {
        let inner = [...grid];
        inner[next] = dir;
        if (walkInner(inner, i, rotate(dir))) loops.push(next);
      }

      i = next;
    }
  }
  return new Set(loops).size;
}

let part2 = walkPart2([...grid], guard, U);
console.log("part2 =", part2);
// =1721
