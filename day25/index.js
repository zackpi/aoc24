let raw = await Bun.file("day25/input").text();
let patterns = raw.split("\n\n").map((x) => {
  let rows = x.split("\n");
  let cols = [];
  for (let i = 0; i < rows[0].length; i++) {
    cols.push(rows.map((x) => x[i]));
  }
  return cols;
});

let count = (a) => a.map((c) => c.filter((x) => x === "#").length - 1);
let keys = patterns.filter((x) => x[0][0] === "#").map(count);
let locks = patterns.filter((x) => x[0][0] === ".").map(count);

let part1 = 0;
for (let key of keys) {
  for (let lock of locks) {
    if (key.every((k, i) => k + lock[i] <= 5)) part1++;
  }
}
console.log("part1 =", part1);
// =3242

let part2 = "Merry Christmas!";
console.log("part2 =", part2);
// =Merry Christmas!
