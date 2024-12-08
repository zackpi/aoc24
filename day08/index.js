let raw = await Bun.file("day08/input").text();

function pairs(arr) {
  let ps = [];
  for (let i = 0; i < arr.length - 1; i++)
    for (let j = i + 1; j < arr.length; j++) ps.push([arr[i], arr[j]]);
  return ps;
}

function part1Fn() {
  let grid = raw.split("\n").map((l) => l.split(""));
  let w = grid[0].length;
  let h = grid.length;

  let freq = {};
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let f = grid[y][x];
      if (f !== ".") {
        if (f in freq) freq[f].push([x, y]);
        else freq[f] = [[x, y]];
      }
    }
  }

  let nodes = [];
  for (let coords of Object.values(freq)) {
    for (let pair of pairs(coords)) {
      let [c1, c2] = pair;
      let d1 = c1[0] - c2[0];
      let d2 = c1[1] - c2[1];
      let node1 = [c1[0] + d1, c1[1] + d2];
      let node2 = [c2[0] - d1, c2[1] - d2];
      nodes.push(node1, node2);
    }
  }
  nodes = nodes.filter(([x, y]) => x >= 0 && x < w && y >= 0 && y < h);
  nodes = [...new Set(nodes.map((n) => n.join(",")))];

  return nodes.length;
}

let part1 = part1Fn();
console.log("part1 =", part1);
// =261

function part2Fn() {
  let grid = raw.split("\n").map((l) => l.split(""));
  let w = grid[0].length;
  let h = grid.length;

  let freq = {};
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let f = grid[y][x];
      if (f !== ".") {
        if (f in freq) freq[f].push([x, y]);
        else freq[f] = [[x, y]];
      }
    }
  }

  let nodes = [];
  for (let coords of Object.values(freq)) {
    for (let pair of pairs(coords)) {
      let [c1, c2] = pair;
      let d1 = c1[0] - c2[0];
      let d2 = c1[1] - c2[1];

      let [x, y] = c1;
      while (x >= 0 && x < w && y >= 0 && y < h) {
        nodes.push([x, y]);
        x += d1;
        y += d2;
      }

      [x, y] = c2;
      while (x >= 0 && x < w && y >= 0 && y < h) {
        nodes.push([x, y]);
        x -= d1;
        y -= d2;
      }
    }
  }
  nodes = [...new Set(nodes.map((n) => n.join(",")))];

  return nodes.length;
}

let part2 = part2Fn();
console.log("part2 =", part2);
// =898
