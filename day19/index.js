let raw = await Bun.file("day19/input").text();
let [patternsRaw, designsRaw] = raw.split("\n\n");
let patterns = new Set(patternsRaw.split(", "));
let designs = designsRaw.split("\n");

let possMemo = {};
function possible(design) {
  if (design in possMemo) return possMemo[design];
  if (patterns.has(design)) return true;
  for (let i = 0; i < design.length; i++) {
    let sub = design.slice(0, i);
    if (!patterns.has(sub)) continue;
    if (possible(design.slice(i))) {
      possMemo[design] = true;
      return true;
    }
  }
  possMemo[design] = false;
  return false;
}

let part1 = designs.filter(possible).length;
console.log("part1 =", part1);
// =330

let waysMemo = {};
function ways(design) {
  if (design in waysMemo) return waysMemo[design];
  let count = 0;
  if (patterns.has(design)) count++;
  for (let i = 0; i < design.length; i++) {
    let sub = design.slice(0, i);
    if (!patterns.has(sub)) continue;
    count += ways(design.slice(i));
  }
  waysMemo[design] = count;
  return count;
}

let part2 = eval(designs.map(ways).join("+"));
console.log("part2 =", part2);
// =950763269786650
