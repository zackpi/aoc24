let raw = await Bun.file("day12/input").text();

let cells = raw.split("\n").map((l) => l.split(""));
let h = cells.length;
let w = cells[0].length;

let k = ([x, y]) => x + "_" + y;
let seen = new Set();
let grid = () => Array.from({ length: h + 1 }).map(() => Array(w + 1).fill(0));

function clique(r) {
  let verts = grid();
  let horiz = grid();

  seen.add(k(r));
  let nodes = [r];
  let area = 1;
  while (nodes.length) {
    let nextNodes = [];
    for (let n of nodes) {
      let [x, y] = n;

      verts[y][x] += 1;
      verts[y][x + 1] -= 1;
      horiz[y][x] += 1;
      horiz[y + 1][x] -= 1;

      for (let adj of [
        [x, y - 1],
        [x, y + 1],
        [x - 1, y],
        [x + 1, y],
      ]) {
        let [x, y] = adj;
        if (x < 0 || x >= w || y < 0 || y >= h) continue;
        if (seen.has(k(adj))) continue;
        if (cells[y][x] !== cells[r[1]][r[0]]) continue;

        nextNodes.push(adj);
        area++;
        seen.add(k(adj));
      }
    }
    nodes = nextNodes;
  }

  let perim = 0;
  let edges = 0;
  for (let j = 0; j < h + 1; j++) {
    let prev = 0;
    for (let i = 0; i < w; i++) {
      let h = horiz[j][i];
      if (h !== 0) {
        perim++;
        if (h !== prev) edges++;
      }
      prev = h;
    }
  }
  for (let i = 0; i < w + 1; i++) {
    let prev = 0;
    for (let j = 0; j < h; j++) {
      let v = verts[j][i];
      if (v !== 0) {
        perim++;
        if (v !== prev) edges++;
      }
      prev = v;
    }
  }

  return [area, perim, edges];
}

let part1 = 0;
let part2 = 0;
for (let j = 0; j < h; j++) {
  for (let i = 0; i < w; i++) {
    let root = [i, j];
    if (seen.has(k(root))) continue;

    let [area, perimeter, uniques] = clique(root);
    part1 += area * perimeter;
    part2 += area * uniques;
  }
}

console.log("part1 =", part1);
// =1473408

console.log("part2 =", part2);
// =886364
