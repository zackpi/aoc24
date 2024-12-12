let raw = await Bun.file("day12/input").text();

let cells = raw.split("\n").map((l) => l.split(""));
let h = cells.length;
let w = cells[0].length;

let k = ([x, y]) => x + "_" + y;
let seen = new Set();

let grid = () => Array.from({ length: h + 1 }).map(() => Array(w + 1).fill(0));

function buildClique(r) {
  let letter = cells[r[1]][r[0]];
  let clique = [r];
  let nodes = [r];
  seen.add(k(r));

  let verts = grid();
  let horiz = grid();

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
        if (cells[y][x] !== letter) continue;

        nextNodes.push(adj);
        clique.push(adj);
        seen.add(k(adj));
      }
    }
    nodes = nextNodes;
  }

  let perimeter = 0;
  let nHoriz = 0;
  for (let j = 0; j < h + 1; j++) {
    let onedge = 0;
    for (let i = 0; i < w; i++) {
      let h = horiz[j][i];
      if (h !== 0) {
        perimeter++;
        if (h !== onedge) nHoriz++;
      }
      onedge = h;
    }
  }
  let nVerts = 0;
  for (let i = 0; i < w + 1; i++) {
    let onedge = 0;
    for (let j = 0; j < h; j++) {
      let v = verts[j][i];
      if (v !== 0) {
        perimeter++;
        if (v !== onedge) nVerts++;
      }
      onedge = v;
    }
  }
  let uniques = nVerts + nHoriz;

  return [clique.length, perimeter, uniques];
}

let part1 = 0;
let part2 = 0;
for (let j = 0; j < h; j++) {
  for (let i = 0; i < w; i++) {
    let root = [i, j];
    if (seen.has(k(root))) continue;

    let [area, perimeter, uniques] = buildClique(root);
    part1 += area * perimeter;
    part2 += area * uniques;
  }
}

console.log("part1 =", part1);
// =1473408

console.log("part2 =", part2);
// =886364
