let raw = await Bun.file("day09/input").text();

let part1 = (() => {
  let s = [];
  for (let i = 0; i < raw.length; i++) {
    let char = i & 1 ? -1 : (i / 2) | 0;
    for (let j = 0; j < raw[i]; j++) {
      s.push(char);
    }
  }
  let i;
  for (let j = s.length - 1; j >= 0; j--) {
    i = s.indexOf(-1);
    if (i >= j) break;
    let t = s[i];
    s[i] = s[j];
    s[j] = t;
  }
  let chk = 0;
  for (let k = 0; k < i; k++) {
    if (s[k] >= 0) chk += s[k] * k;
  }
  return chk;
})();
console.log("part1 =", part1);
// =

let part2 = (() => {
  let s = [];
  for (let i = 0; i < raw.length; i++) {
    let char = i & 1 ? -1 : (i / 2) | 0;
    for (let j = 0; j < raw[i]; j++) {
      s.push(char);
    }
  }
  let j = s.length - 1;
  for (; j > 0; j--) {
    if (s[j] < 0) continue;

    // get range to move
    let k = j;
    while (s[k] === s[j]) k--;
    let move = j - k;
    // console.log(j, k, "move", move, "val", s.slice(k + 1, j + 1));
    j = k + 1;

    let i = 0;
    let space = 0;
    for (; i < j; i++) {
      if (s[i] < 0) space++;
      else space = 0;
      if (space >= move) break;
    }
    if (space < move) continue;
    i -= space - 1;

    // console.log("space", space, "move", move, "i", i, "j", j);

    // console.log("before", s.map((v) => (v < 0 ? "." : v)).join(""));
    let moving = s.splice(j, move, ...Array(move).fill(-1));
    s.splice(i, move, ...moving);
    // console.log("after ", s.map((v) => (v < 0 ? "." : v)).join(""));

    // s.splice(i - space, move);
    // s.splice(i - space, 0, ...Array(move).fill(s[j]));

    // if (i >= j) break;

    // let t = s[i];
    // s[i] = s[j];
    // s[j] = t;
  }

  // let s = raw.split("").map(Number);
  // for (let j = s.length-1; j >= 0; j-=2) {
  //   for (let i = 1; i < j; i+=2) {
  //     let rem = s[i] - s[j];
  //     if (rem < 0) continue;
  //     s[i] = s[j];
  //   }
  // }

  let chk = 0;
  for (let k = 0; k < s.length; k++) {
    if (s[k] >= 0) chk += s[k] * k;
  }
  return chk;
})();
console.log("part2 =", part2);
// =
