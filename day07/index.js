let raw = await Bun.file("day07/input").text();
let lines = raw.split("\n").map((l) => l.split(": "));

function hasOperatorMatch(args, retVal) {
  let res = [args[0]];
  for (let i = 1; i < args.length; i++) {
    res = res.flatMap((r) => [r + args[i], r * args[i]]);
  }
  return res.find((r) => r === retVal);
}

let part1 = 0;
for (let [ret, argStr] of lines) {
  let retVal = Number(ret);
  let args = argStr.split(" ").map(Number);
  if (hasOperatorMatch(args, retVal)) part1 += retVal;
}
console.log("part1 =", part1);
// =882304362421

function hasOperatorMatch2(args, retVal) {
  let res = [args[0]];
  for (let i = 1; i < args.length; i++) {
    res = res.flatMap((r) => [
      r + args[i],
      r * args[i],
      eval(r + "" + args[i]),
    ]);
  }
  return res.find((r) => r === retVal);
}

let part2 = 0;
for (let [ret, argStr] of lines) {
  let retVal = Number(ret);
  let args = argStr.split(" ").map(Number);
  if (hasOperatorMatch2(args, retVal)) part2 += retVal;
}
console.log("part2 =", part2);
// =145149066755184
