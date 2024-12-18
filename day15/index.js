let raw = await Bun.file("day15/input").text();
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
// =1471826

let grid2 = gridRaw.split("\n").map((row) =>
  row.split("").flatMap((c) => {
    if (c == "#") return ["#", "#"];
    if (c == "O") return ["[", "]"];
    if (c == ".") return [".", "."];
    if (c == "@") return ["@", "."];
    return [c, "."];
  })
);

let dir = (m) => [
  m == "<" ? -1 : m == ">" ? 1 : 0,
  m == "^" ? -1 : m == "v" ? 1 : 0,
];

let canMove = (x, y, m) => {
  let [dx, dy] = dir(m);
  let [nx, ny] = [x + dx, y + dy];
  let next = grid2[ny][nx];
  if (next == ".") return true;
  if (next == "[") {
    if (m == ">") return canMove(nx + 1, ny, m);
    else if (m == "v") return canMove(nx, ny, m) && canMove(nx + 1, ny, m);
    else if (m == "^") return canMove(nx, ny, m) && canMove(nx + 1, ny, m);
  }
  if (next == "]") {
    if (m == "<") return canMove(nx - 1, ny, m);
    else if (m == "v") return canMove(nx - 1, ny, m) && canMove(nx, ny, m);
    else if (m == "^") return canMove(nx - 1, ny, m) && canMove(nx, ny, m);
  }
  return false;
};

let move = (x, y, m) => {
  let curr = grid2[y][x];
  let [dx, dy] = dir(m);
  let [nx, ny] = [x + dx, y + dy];
  let next = grid2[ny][nx];

  if (m == "<") {
    if (next == "]") {
      move(nx - 1, ny, m);
      grid2[ny][nx - 2] = "[";
      grid2[ny][nx - 1] = "]";
    }
  } else if (m == ">") {
    if (next == "[") {
      move(nx + 1, ny, m);
      grid2[ny][nx + 1] = "[";
      grid2[ny][nx + 2] = "]";
    }
  } else if (m == "v") {
    if (next == "[") {
      move(nx, ny, m);
      move(nx + 1, ny, m);
      grid2[ny + 1][nx] = "[";
      grid2[ny + 1][nx + 1] = "]";
      grid2[ny][nx + 1] = ".";
    } else if (next == "]") {
      move(nx - 1, ny, m);
      move(nx, ny, m);
      grid2[ny + 1][nx - 1] = "[";
      grid2[ny + 1][nx] = "]";
      grid2[ny][nx - 1] = ".";
    }
  } else if (m == "^") {
    if (next == "[") {
      move(nx, ny, m);
      move(nx + 1, ny, m);
      grid2[ny - 1][nx] = "[";
      grid2[ny - 1][nx + 1] = "]";
      grid2[ny][nx + 1] = ".";
    } else if (next == "]") {
      move(nx - 1, ny, m);
      move(nx, ny, m);
      grid2[ny - 1][nx - 1] = "[";
      grid2[ny - 1][nx] = "]";
      grid2[ny][nx - 1] = ".";
    }
  }

  grid2[ny][nx] = curr;
  grid2[y][x] = ".";
  return [nx, ny];
};

[x, y] = [2 * (bot % w), (bot / w) | 0];
for (let m of moves) if (canMove(x, y, m)) [x, y] = move(x, y, m);

let part2 = 0;
for (let y = 0; y < h; y++) {
  for (let x = 0; x < 2 * w; x++) {
    if (grid2[y][x] == "[") {
      part2 += x + y * 100;
    }
  }
}
console.log("part2 =", part2);
// =1457703
