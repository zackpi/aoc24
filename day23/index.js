let raw = await Bun.file("day23/input").text();
let pairs = raw.split("\n").map((x) => x.split("-"));
let edges = {};
for (let [a, b] of pairs) {
  edges[a] = [...(edges[a] || []), b];
  edges[b] = [...(edges[b] || []), a];
}

function make3Cliques() {
  let cliques = new Set();
  for (let a in edges) {
    let aNbrs = edges[a];
    for (let b of aNbrs) {
      let bNbrs = edges[b];
      for (let c of bNbrs) {
        if (c === a) continue;
        if (aNbrs.find((n) => n === c)) {
          let key = [a, b, c].sort().join(",");
          cliques.add(key);
        }
      }
    }
  }
  return cliques;
}

let part1 = [...make3Cliques()].filter((s) =>
  s.split(",").find((n) => n.startsWith("t"))
).length;
console.log("part1 =", part1);
// =1411

let cliques = [new Set(Object.keys(edges))];
let nCliques;
do {
  nCliques = new Set();
  let nm1Cliques = cliques[cliques.length - 1]; // (n-1)-cliques
  for (let nm1Key of nm1Cliques) {
    let nm1 = nm1Key.split(",");
    for (let a of nm1) {
      for (let b of edges[a]) {
        if (nm1.includes(b)) continue;
        if (!nm1.every((n) => edges[n].includes(b))) continue;
        let newClique = nm1.concat(b).sort().join(",");
        nCliques.add(newClique);
      }
    }
  }
  if (nCliques.size === 0) break;
  cliques.push(nCliques);
} while (1);

let part2 = [...cliques.pop()][0];
console.log("part2 =", part2);
// =aq,bn,ch,dt,gu,ow,pk,qy,tv,us,yx,zg,zu
