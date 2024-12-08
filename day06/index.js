let raw = await Bun.file("day06/input").text();
let w = raw.indexOf("\n");
let h = ~~(raw.length / w);

let setChar = (g, i, v) =>
  i >= g.length ? g : g.slice(0, i) + v + g.slice(i + 1);

let x = (i) => i % w;
let y = (i) => ~~(i / w);
let step = (i, d) =>
  d === "v"
    ? [i + w, y(i) > h - 2]
    : d === "<"
    ? [i - 1, x(i) < 1]
    : d === "^"
    ? [i - w, y(i) < 1]
    : [i + 1, x(i) > w - 2];
let rotate = (d) => (d === "v" ? "<" : d === "<" ? "^" : d === "^" ? ">" : "v");

let step2 = (i, d) =>
  d === D
    ? [i + w, y(i) > h - 2]
    : d === L
    ? [i - 1, x(i) < 1]
    : d === U
    ? [i - w, y(i) < 1]
    : [i + 1, x(i) > w - 2];
let rotate2 = (d) => (d === D ? L : d === L ? U : d === U ? R : D);

function walkPart1(grid, i, dir) {
  let steps = 1;
  while (1) {
    let [next, oob] = step(i, dir);
    if (oob) break;
    let char = grid[next];
    if (char === "#") {
      dir = rotate(dir);
    } else {
      grid = setChar(grid, i, dir);
      i = next;
      if (char === ".") steps++;
    }
  }
  return steps;
}

let gridInit = raw.replaceAll("\n", "");
let guard = gridInit.indexOf("^");
let part1 = walkPart1(gridInit, guard, "^");
console.log("part1 =", part1);
// =4826

function walkInner(grid, i, dir) {
  while (1) {
    let [next, oob] = step2(i, dir);
    if (oob) return false;
    let c = grid[next];
    if ((c & dir) > 0) return true;
    if (c > 0) {
      grid[next] |= dir;
      dir = rotate2(dir);
    } else i = next;
  }
}

function walkPart2(grid, i, dir) {
  let loops = [];
  let outer = [...grid];
  while (1) {
    outer[i] = dir;
    let [next, oob] = step2(i, dir);
    if (oob) break;
    let c = outer[next];
    if (c === X) dir = rotate2(dir);
    else {
      if (c === 0) {
        let inner = [...grid];
        inner[next] = dir;
        if (walkInner(inner, i, rotate2(dir))) loops.push(next);
      }

      i = next;
    }
  }
  return new Set(loops).size;
}

let U = 1;
let R = 2;
let D = 4;
let L = 8;
let X = 16;
let garr = gridInit.split("").map((c) => (c === "#" ? X : 0));

let part2 = walkPart2(garr, guard, U);
console.log("part2 =", part2);
// =1721
