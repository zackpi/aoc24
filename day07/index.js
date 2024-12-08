let raw = await Bun.file("day07/input").text();
let lines = raw
  .split("\n")
  .map((l) => l.split(": "))
  .map(([r, args]) => [r, args.split(" ")]);

const sumMatches = (ops) =>
  lines.reduce(
    (sum, [rets, args]) =>
      sum +
      (args
        .slice(1)
        .reduce(
          (vals, a) => vals.flatMap((r) => ops.map((o) => eval(r + o + a))),
          [args[0]]
        )
        .find((val) => val === eval(rets))
        ? eval(rets)
        : 0),
    0
  );

let part1 = sumMatches(["+", "*"]);
console.log("part1 =", part1);
// =882304362421

let part2 = sumMatches(["+", "*", ""]);
console.log("part2 =", part2);
// =145149066755184
