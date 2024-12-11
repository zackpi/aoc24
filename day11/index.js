let raw = await Bun.file("day11/input").text();
let stones = raw.split(" ").map(Number);

let memo = {};
function blink(s, lvl) {
  if (lvl <= 0) return 1;
  if (s + "_" + lvl in memo) return memo[s + "_" + lvl];

  if (s === 0) {
    let ret = blink(1, lvl - 1);
    memo[s + "_" + lvl] = ret;
    return ret;
  }

  let l = Math.trunc(Math.log10(s) + 1);
  if (l % 2 !== 0) {
    let ret = blink(2024 * s, lvl - 1);
    memo[s + "_" + lvl] = ret;
    return ret;
  }

  let str = s + "";
  let left = Number(str.slice(0, l / 2));
  let right = Number(str.slice(l / 2));

  let ret = blink(left, lvl - 1) + blink(right, lvl - 1);
  memo[s + "_" + lvl] = ret;
  return ret;
}

let part1 = stones.reduce((sum, stone) => sum + blink(stone, 25), 0);
console.log("part1 =", part1);
// =

let part2 = stones.reduce((sum, stone) => sum + blink(stone, 75), 0);
console.log("part2 =", part2);
// =
