let raw = await Bun.file("day11/input").text();
let stones = raw.split(" ").map(Number);

function blink(stone, lvl) {
  if (lvl <= 0) return 1;
  if (stone === 0) return blinkMemo(1, lvl - 1);

  let l = Math.trunc(Math.log10(stone) + 1);
  if (l % 2 !== 0) return blinkMemo(2024 * stone, lvl - 1);

  let left = Number((stone + "").slice(0, l / 2));
  let right = Number((stone + "").slice(l / 2));
  return blinkMemo(left, lvl - 1) + blinkMemo(right, lvl - 1);
}

let memo = {};
const key = (s, l) => s + "_" + l;
function blinkMemo(stone, lvl) {
  if (key(stone, lvl) in memo) return memo[key(stone, lvl)];
  let ret = blink(stone, lvl);
  memo[key(stone, lvl)] = ret;
  return ret;
}

let part1 = stones.reduce((sum, stone) => sum + blinkMemo(stone, 25), 0);
console.log("part1 =", part1);
// =186996

let part2 = stones.reduce((sum, stone) => sum + blinkMemo(stone, 75), 0);
console.log("part2 =", part2);
// =221683913164898
