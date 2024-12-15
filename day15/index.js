let raw = await Bun.file("day15/input_small").text();
let [gridRaw, movesRaw] = raw.split("\n\n");
let moves = movesRaw.replaceAll("\n", "");
let grid = gridRaw.split("\n").map((row) => row.split(""));
let w = grid[0].length;
let h = grid.length;

let bot = gridRaw.replaceAll("\n", "").indexOf("@");
let [x, y] = [bot % w, (bot / w) | 0];
for (let move of moves) {
  let [dx, dy] = [
    move == "<" ? -1 : move == ">" ? 1 : 0,
    move == "^" ? -1 : move == "v" ? 1 : 0,
  ];
  let [nx, ny] = [x + dx, y + dy];
  let next = grid[ny][nx];
  if (next == "#") continue;
  if (next == "O") {
    let [ox, oy] = [nx, ny];
    do {
      ox += dx;
      oy += dy;
      next = grid[oy][ox];
    } while (next == "O");

    if (next == ".") {
      grid[ny][nx] = "@";
      grid[oy][ox] = "O";
      grid[y][x] = ".";
      [x, y] = [nx, ny];
    }
  } else if (next == ".") {
    grid[ny][nx] = "@";
    grid[y][x] = ".";
    [x, y] = [nx, ny];
  }
}

let part1 = 0;
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    if (grid[y][x] == "O") {
      part1 += x + y * 100;
    }
  }
}
console.log("part1 =", part1);
// =

let grid2 = gridRaw.split("\n").map((row) =>
  row.split("").flatMap((c) => {
    if (c == "#") return ["#", "#"];
    if (c == "O") return ["[", "]"];
    if (c == ".") return [".", "."];
    if (c == "@") return ["@", "."];
    return [c, "."];
  })
);

[x, y] = [2 * (bot % w), (bot / w) | 0];
for (let move of moves) {
  let [dx, dy] = [
    move == "<" ? -1 : move == ">" ? 1 : 0,
    move == "^" ? -1 : move == "v" ? 1 : 0,
  ];
  let [nx, ny] = [x + dx, y + dy];
  let next = grid2[ny][nx];
  if (next == "#") continue;
  if (next == "[" || next == "]") {
    continue;
  } else if (next == ".") {
    grid2[ny][nx] = "@";
    grid2[y][x] = ".";
    [x, y] = [nx, ny];
  }

  await Bun.sleep(300);
  console.clear();
  console.log(grid2.map((row) => row.join("")).join("\n"));
  console.log("move =", move);
}

// console.log(grid2.map((row) => row.join("")).join("\n"));

let part2 = 0;
console.log("part2 =", part2);
// =
