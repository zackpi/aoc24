let raw = await Bun.file("day04/input").text();
let grid = raw.split("\n").map((l) => l.split(""));
let rows = grid.length;
let cols = grid[0].length;

const char = ([ci, ri]) => grid[ri][ci];
const range = ([f0, f1], [s0, s1]) =>
  Array.from({ length: 4 }).map((_, i) => [f0 + i * s0, f1 + i * s1]);
const oob = ([c, r]) => {
  return c < 0 || c > cols - 1 || r < 0 || r > rows - 1;
};

let part1 = 0;
for (let ri = 0; ri < rows; ri++) {
  let rsum = 0;
  for (let ci = 0; ci < cols; ci++) {
    let root = [ci, ri];
    let count = 0;
    for (let drow = -1; drow <= 1; drow++) {
      for (let dcol = -1; dcol <= 1; dcol++) {
        let r = range(root, [dcol, drow]);
        if (!oob(r[3]) && r.map(char).join("") === "XMAS") {
          count++;
        }
      }
    }
    rsum += count;
  }
  part1 += rsum;
}
console.log("part1 =", part1);
// =2406

const xshape = ([c, r]) =>
  Array.from({ length: 4 }).map((_, i) => [
    c + (i % 2 === 1 ? 1 : -1),
    r + (i / 2 > 0.5 ? 1 : -1),
  ]);

let part2 = 0;
for (let ri = 1; ri < rows - 1; ri++) {
  let rsum = 0;
  for (let ci = 1; ci < cols - 1; ci++) {
    let root = [ci, ri];
    let count = 0;

    let x = [root].concat(xshape(root));
    let word = x.map(char).join("");
    if (
      word === "AMMSS" ||
      word === "ASSMM" ||
      word === "AMSMS" ||
      word === "ASMSM"
    ) {
      console.log("found", word, x.join(" | "));
      count++;
    }
    rsum += count;
  }
  part2 += rsum;
}
console.log("part2 =", part2);
// =1807
