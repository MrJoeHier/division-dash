/* Live-game intro, lose, and win graphics, grouped by level. One of each per level; no version letters. */
window.LEVELS = [
  {
    code: "01", ep: 1, lv: 1, name: "Unspoken River",
    intro: [ { v: "../assets/setup-l1-01c.mp4?v=20261114-r44", a: "../assets/music/level-intro.mp3", d: 14.833333 } ],
    lose: [ { img: "../assets/lose-l1-01b.jpg?v=20261114-r44" } ],
    win: [ { v: "../assets/win-l1-01f.mp4?v=20261114-r44", a: "../assets/music/main-theme.mp3", d: 23.958333 } ]
  },
  {
    code: "02", ep: 1, lv: 2, name: "Tangled Valley",
    intro: [ { v: "../assets/setup-l2-02d.mp4?v=20261114-r44", a: "../assets/music/level-intro.mp3", d: 14.833333 } ],
    lose: [ { img: "../assets/lose-l2-02b.jpg?v=20261114-r44" } ],
    win: [ { v: "../assets/win-l2-02d.mp4?v=20261114-r44", a: "../assets/music/main-theme.mp3", d: 25.500000 } ]
  },
  {
    code: "03", ep: 1, lv: 3, name: "Forgotten Ridge",
    intro: [ { v: "../assets/setup-l3.mp4?v=20261114-r44", a: "../assets/music/level-intro.mp3", sfx: "../assets/sfx/setup-l3-03b.m4a?v=20261114-r44", d: 14.833333 } ],
    lose: [ { img: "../assets/lose-l3.jpg?v=20261114-r44" } ],
    win: [ { v: "../assets/win-l3-03d.mp4?v=20261114-r44", a: "../assets/music/main-theme.mp3", d: 30.875000 } ]
  },
  {
    code: "04", ep: 1, lv: 4, name: "Rendezvous Point",
    intro: [ { v: "../assets/setup-l4-04b.mp4?v=20261114-r44", a: "../assets/music/level-intro.mp3", sfx: "../assets/sfx/setup-l4-04b.m4a?v=20261114-r44", d: 14.833333 } ],
    lose: [ { img: "../assets/lose-l4-04c.jpg?v=20261114-r44" } ],
    win: [ { v: "../assets/win-l4-04e.mp4?v=20261114-r44", a: "../assets/music/main-theme.mp3", d: 30.500000 } ]
  },
  {
    code: "05", ep: 2, lv: 1, name: "Ghost Ferry",
    intro: [ { v: "../assets/setup-e2l1-05b.mp4?v=20261114-r44", a: "../assets/music/level-intro.mp3", d: 14.833333 } ],
    lose: [ { img: "../assets/lose-e2l1-05b.jpg?v=20261114-r44" } ],
    win: [ { v: "../assets/win-e2l1-05d.mp4?v=20261114-r44", a: "../assets/music/main-theme.mp3", d: 25.166667 } ]
  },
  {
    code: "06", ep: 2, lv: 2, name: "Needle Gap",
    intro: [ { v: "../assets/setup-e2l2-06d.mp4?v=20261114-r44", a: "../assets/music/level-intro.mp3", sfx: "../assets/sfx/setup-e2l2-06d.m4a?v=20261114-r44", d: 14.833333 } ],
    lose: [ { img: "../assets/lose-e2l2-06c.jpg?v=20261114-r44" } ],
    win: [ { v: "../assets/win-e2l2-06e.mp4?v=20261114-r44", a: "../assets/music/main-theme.mp3", sfx: "../assets/sfx/win-e2l2-06e.m4a?v=20261114-r44", d: 25.000000 } ]
  },
  {
    code: "07", ep: 2, lv: 3, name: "King's Crossing",
    intro: [ { v: "../assets/setup-e2l3-07b.mp4?v=20261114-r44", a: "../assets/music/level-intro.mp3", sfx: "../assets/sfx/setup-e2l3-07b.m4a?v=20261114-r44", d: 14.833333 } ],
    lose: [ { img: "../assets/lose-e2l3.jpg?v=20261114-r44" } ],
    win: [ { v: "../assets/win-e2l3-07c.mp4?v=20261114-r44", a: "../assets/music/main-theme.mp3", sfx: "../assets/sfx/win-e2l3-07c.m4a?v=20261114-r44", d: 22.291667 } ]
  },
  {
    code: "08", ep: 2, lv: 4, name: "Rendezvous Point",
    intro: [ { v: "../assets/setup-e2l4-08c.mp4?v=20261114-r44", a: "../assets/music/level-intro.mp3", sfx: "../assets/sfx/setup-e2l4-08c.m4a?v=20261114-r44", d: 14.833333 } ],
    lose: [ { img: "../assets/lose-e2l4.jpg?v=20261114-r44", loseLay: "left" } ],
    win: [ { v: "../assets/win-e2l4-08d.mp4?v=20261114-r44", a: "../assets/music/main-theme.mp3", sfx: "../assets/sfx/win-e2l4-08d.m4a?v=20261114-r44", d: 30.041667 } ]
  },
  {
    code: "09", ep: 3, lv: 1, name: "Razorback Ridge",
    intro: [ { v: "../assets/setup-e3l1-09b.mp4?v=20261114-r44", a: "../assets/music/level-intro.mp3", d: 14.833333 } ],
    lose: [ { img: "../assets/lose-e3l1-09b.jpg?v=20261114-r44", loseLay: "mount" } ],
    win: [ { v: "../assets/win-e3l1-09b.mp4?v=20261114-r44", a: "../assets/music/main-theme.mp3", d: 24.583333 } ]
  },
  {
    code: "10", ep: 3, lv: 2, name: "White Shroud",
    intro: [ { v: "../assets/setup-e3l2-10b.mp4?v=20261114-r44", a: "../assets/music/level-intro.mp3", sfx: "../assets/sfx/setup-e3l2-10b.m4a?v=20261114-r44", d: 10.833333 } ],
    lose: [ { img: "../assets/lose-e3l2.jpg?v=20261114-r44" } ],
    win: [ { v: "../assets/win-e3l2-10d.mp4?v=20261114-r44", a: "../assets/music/main-theme.mp3", sfx: "../assets/sfx/win-e3l2-10d.m4a?v=20261114-r44", d: 26.833333 } ]
  },
  {
    code: "11", ep: 3, lv: 3, name: "Widow's Camp",
    intro: [ { v: "../assets/setup-e3l3-11b.mp4?v=20261114-r44", a: "../assets/music/level-intro.mp3", sfx: "../assets/sfx/setup-e3l3-11b.m4a?v=20261114-r44", d: 14.833333 } ],
    lose: [ { img: "../assets/lose-e3l3-11b.jpg?v=20261114-r44", loseSplit: true } ],
    win: [ { v: "../assets/win-e3l3-11b.mp4?v=20261114-r44", a: "../assets/music/main-theme.mp3", sfx: "../assets/sfx/win-e3l3-11b.m4a?v=20261114-r44", d: 26.041667 } ]
  },
  {
    code: "12", ep: 3, lv: 4, name: "Rendezvous Point",
    intro: [ { v: "../assets/setup-e3l4-12f.mp4?v=20261114-r44", a: "../assets/music/level-intro.mp3", sfx: "../assets/sfx/setup-e3l4-12f.m4a?v=20261114-r44", d: 14.833333 } ],
    lose: [ { img: "../assets/lose-e3l4-12b.jpg?v=20261114-r44", loseSplit: true } ],
    win: [ { v: "../assets/win-e3l4-12b.mp4?v=20261114-r44", a: "../assets/music/main-theme.mp3", sfx: "../assets/sfx/win-e3l4-12b.m4a?v=20261114-r44", d: 40.125000 } ]
  }
];
