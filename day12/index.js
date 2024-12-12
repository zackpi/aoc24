let raw = await Bun.file("day12/input_small2").text();

let cells = raw.split("\n").map((l) => l.split(""));
let h = cells.length;
let w = cells[0].length;

let k = ([x, y]) => x + "_" + y;
let seen = new Set();

let boolgrid = (x, y) =>
  Array.from({ length: y }).map(() => Array(x).fill(false));
let toggle = (a, x, y) => (a[y][x] = !a[y][x]);

function buildClique(r) {
  let letter = cells[r[1]][r[0]];
  let clique = [r];
  let nodes = [r];
  seen.add(k(r));

  let verts = boolgrid(w + 1, h);
  let horiz = boolgrid(w, h + 1);

  while (nodes.length) {
    let nextNodes = [];
    for (let n of nodes) {
      let [x, y] = n;

      toggle(verts, x, y);
      toggle(verts, x + 1, y);
      toggle(horiz, x, y);
      toggle(horiz, x, y + 1);

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
  let uniques = 0;
  for (let j = 0; j < h + 1; j++) {
    let onedge = false;
    for (let i = 0; i < w; i++) {
      if (horiz[j][i]) {
        perimeter++;
        if (!onedge) uniques++;
        onedge = true;
      } else {
        onedge = false;
      }
    }
  }
  for (let i = 0; i < w + 1; i++) {
    let onedge = false;
    for (let j = 0; j < h; j++) {
      if (verts[j][i]) {
        perimeter++;
        if (!onedge) uniques++;
        onedge = true;
      } else {
        onedge = false;
      }
    }
  }

  return [letter, clique.length, perimeter, uniques];
}

let sum = 0;
let sum2 = 0;
for (let j = 0; j < h; j++) {
  for (let i = 0; i < w; i++) {
    let root = [i, j];
    if (seen.has(k(root))) continue;

    let [letter, area, perimeter, uniques] = buildClique(root);
    // process.exit();
    sum += area * perimeter;
    sum2 += area * uniques;
  }
}

let part1 = sum;
console.log("part1 =", part1);
// =1473408

let part2 = sum2;
console.log("part2 =", part2);
// =

// let edges = {};
// for (let n of clique) {
//   // for (let key of [
//   //   k(n) + "_down",
//   //   k(n) + "_right",
//   //   k([n[0] + 1, n[1]]) + "_down",
//   //   k([n[0], n[1] + 1]) + "_right",
//   // ]) {
//   //   if (key in edges) edges[key] = false;
//   //   else edges[key] = true;
//   // }

//   // vert
//   for (let ox of [0, 1]) {
//     let x = n[0] + ox;
//     let sy = n[1];
//     let ey = sy + 1;

//   for (let [ox, oy, dx, dy, m] of [
//     [[0, 0, 0, 1, 1]],
//     [[0, 0, 1, 0, 0]],
//     [[1, 0, 0, 1, 1]],
//     [[0, 1, 1, 0, 0]],
//   ]) {
//     let sx = n[0] + ox;
//     let sy = n[1] + oy;
//     let ex = sx + dx;
//     let ey = sy + dy;

//     // try to find edge above or below to connect to
//     let uniqueEdge = uniqueEdges.find((edge) => {
//       if (edge[4] === m) {
//         if (edge[0] === ex && edge[1] === ey) {
//         }
//       }
//     });
//   }
// }

// let perimeter = Object.values(edges).filter((v) => !!v).length;
