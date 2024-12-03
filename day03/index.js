let raw = await Bun.file("day03/input").text();
let mul = (s) =>
  s
    .match(/\d+/g)
    .map(Number)
    .reduce((a, b) => a * b, 1);

let part1 = raw.match(/mul\(\d+\,\d+\)/g).reduce((sum, s) => sum + mul(s), 0);
console.log("part1 =", part1);
// =161085926

let part2 = raw
  .match(/do\(\)|don\'t\(\)|mul\(\d+\,\d+\)/g)
  .reduce(
    ([sum, doing], s) =>
      s[0] === "m" ? [sum + (doing ? mul(s) : 0), doing] : [sum, s === "do()"],
    [0, true]
  )[0];
console.log("part2 =", part2);
// =82045421
