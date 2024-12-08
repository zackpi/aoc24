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
    let [next, oob] = step(i, dir);
    if (oob) return false;
    let char = grid[next];
    if (char === "O") return true;
    if (char === "#") {
      grid = setChar(grid, next, "O");
      dir = rotate(dir);
    } else i = next;
  }
}

function walkPart2(grid, i, dir) {
  let loops = [];
  while (1) {
    grid = setChar(grid, i, dir);
    let [next, oob] = step(i, dir);
    if (oob) break;
    let char = grid[next];
    if (char === "#") dir = rotate(dir);
    else {
      if (walkInner(setChar(grid, next, "O"), i, rotate(dir))) loops.push(next);
      i = next;
    }
  }
  return new Set(loops).size;
}

let part2 = walkPart2(gridInit, guard, "^");
console.log("part2 =", part2);
// =
