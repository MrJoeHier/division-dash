/* Grouped by level. intro, lose and win are each a list of versions. Where a kind has more than one version:
   a = what's in the live game now (../assets/), b (c, ...) = later versions (review/media/, review page only).
   A single-version kind has no ver/note and shows no a/b label. */
window.LEVELS = [
  {
    code: "01", ep: 1, lv: 1, name: "Unspoken River",
    intro: [
      { ver: "a", note: "live", v: "../assets/setup-l1.mp4", a: "../assets/music/level-intro.mp3", d: 14.833333 },
      { ver: "b", note: "later", v: "media/intro-01b.mp4?v=20261112-r12", a: "../assets/music/level-intro.mp3", d: 14.833333 },
      { ver: "c", note: "new", v: "media/intro-01c.mp4?v=20261112-r15", a: "../assets/music/level-intro.mp3", d: 14.833333 }
    ],
    lose: [
      { ver: "a", note: "live", img: "../assets/lose-l1.jpg" },
      { ver: "b", note: "new", img: "media/lose-01b.jpg?v=20261112-r15" }
    ],
    win: [
      { ver: "a", note: "live", v: "../assets/win-l1.mp4", a: "../assets/music/main-theme.mp3", d: 16.041667 },
      { ver: "b", note: "later", v: "media/win-01b.mp4?v=20261112-r12", a: "../assets/music/main-theme.mp3", d: 25.041667 },
      { ver: "c", note: "later", v: "media/win-01c.mp4?v=20261112-r12", a: "../assets/music/main-theme.mp3", d: 25.041667 },
      { ver: "d", note: "later", v: "media/win-01d.mp4?v=20261112-r15", a: "../assets/music/main-theme.mp3", d: 25.000000 },
      { ver: "e", note: "later", v: "media/win-01e.mp4?v=20261112-r22", a: "../assets/music/main-theme.mp3", d: 18.791667 },
      { ver: "f", note: "new", v: "media/win-01f.mp4?v=20261112-r29", a: "../assets/music/main-theme.mp3", d: 23.958333 }
    ]
  },
  {
    code: "02", ep: 1, lv: 2, name: "Tangled Valley",
    intro: [
      { ver: "a", note: "live", v: "../assets/setup-l2.mp4", a: "../assets/music/level-intro.mp3", d: 14.833333 },
      { ver: "b", note: "later", v: "media/intro-02b.mp4?v=20261112-r12", a: "../assets/music/level-intro.mp3", d: 14.833333 },
      { ver: "c", note: "later", v: "media/intro-02c.mp4?v=20261112-r17", a: "../assets/music/level-intro.mp3", d: 14.833333 },
      { ver: "d", note: "new", v: "media/intro-02d.mp4?v=20261112-r19", a: "../assets/music/level-intro.mp3", d: 14.833333 }
    ],
    lose: [
      { ver: "a", note: "live", img: "../assets/lose-l2.jpg" },
      { ver: "b", note: "new", img: "media/lose-02b.jpg?v=20261112-r12" }
    ],
    win: [
      { ver: "a", note: "live", v: "../assets/win-l2.mp4", a: "../assets/music/main-theme.mp3", d: 16.041667 },
      { ver: "b", note: "later", v: "media/win-02b.mp4?v=20261112-r12", a: "../assets/music/main-theme.mp3", d: 25.000000 },
      { ver: "c", note: "later", v: "media/win-02c.mp4?v=20261112-r12", a: "../assets/music/main-theme.mp3", d: 23.000000 },
      { ver: "d", note: "new", v: "media/win-02d.mp4?v=20261112-r17", a: "../assets/music/main-theme.mp3", d: 25.500000 }
    ]
  },
  {
    code: "03", ep: 1, lv: 3, name: "Forgotten Ridge",
    intro: [ { v: "../assets/setup-l3.mp4", a: "../assets/music/level-intro.mp3", sfx: "media/intro-03b-roar.wav?v=20261112-r34", d: 14.833333 } ],
    lose: [ { img: "../assets/lose-l3.jpg" } ],
    win: [
      { ver: "a", note: "live", v: "../assets/win-l3.mp4", a: "../assets/music/main-theme.mp3", d: 16.041667 },
      { ver: "b", note: "later", v: "media/win-03b.mp4?v=20261112-r12", a: "../assets/music/main-theme.mp3", d: 14.666667 },
      { ver: "c", note: "later", v: "media/win-03c.mp4?v=20261112-r14", a: "../assets/music/main-theme.mp3", d: 28.041667 },
      { ver: "d", note: "new", v: "media/win-03d.mp4?v=20261112-r24", a: "../assets/music/main-theme.mp3", d: 30.875000 }
    ]
  },
  {
    code: "04", ep: 1, lv: 4, name: "Rendezvous Point",
    intro: [
      { ver: "a", note: "live", v: "../assets/setup-l4.mp4", a: "../assets/music/level-intro.mp3", d: 14.833333 },
      { ver: "b", note: "new", v: "media/intro-04b.mp4?v=20261112-r26", a: "../assets/music/level-intro.mp3", sfx: "media/intro-04b-twig.wav?v=20261112-r26", d: 14.833333 }
    ],
    lose: [
      { ver: "a", note: "live", img: "../assets/lose-l4.jpg" },
      { ver: "b", note: "later", img: "media/lose-04b.jpg?v=20261112-r12" },
      { ver: "c", note: "new", img: "media/lose-04c.jpg?v=20261112-r15" }
    ],
    win: [
      { ver: "a", note: "live", v: "../assets/win-l4.mp4", a: "../assets/music/main-theme.mp3", d: 17.041667 },
      { ver: "b", note: "later", v: "media/win-04b.mp4?v=20261112-r12", a: "../assets/music/main-theme.mp3", d: 30.041667 },
      { ver: "c", note: "later", v: "media/win-04c.mp4?v=20261112-r13", a: "../assets/music/main-theme.mp3", d: 28.541667 },
      { ver: "d", note: "later", v: "media/win-04d.mp4?v=20261112-r17", a: "../assets/music/main-theme.mp3", d: 30.000000 },
      { ver: "e", note: "new", v: "media/win-04e.mp4?v=20261112-r27", a: "../assets/music/main-theme.mp3", d: 30.500000 }
    ]
  },
  {
    code: "05", ep: 2, lv: 1, name: "Ghost Ferry",
    intro: [
      { ver: "a", note: "live", v: "../assets/setup-e2l1.mp4", a: "../assets/music/level-intro.mp3", d: 14.833333 },
      { ver: "b", note: "new", v: "media/intro-05b.mp4?v=20261112-r17", a: "../assets/music/level-intro.mp3", d: 14.833333 }
    ],
    lose: [
      { ver: "a", note: "live", img: "../assets/lose-e2l1.jpg" },
      { ver: "b", note: "new", img: "media/lose-05b.jpg?v=20261112-r25" }
    ],
    win: [
      { ver: "a", note: "live", v: "../assets/win-e2l1.mp4", a: "../assets/music/main-theme.mp3", d: 16.041667 },
      { ver: "b", note: "later", v: "media/win-05b.mp4?v=20261112-r12", a: "../assets/music/main-theme.mp3", d: 25.000000 },
      { ver: "c", note: "later", v: "media/win-05c.mp4?v=20261112-r17", a: "../assets/music/main-theme.mp3", d: 25.500000 },
      { ver: "d", note: "new", v: "media/win-05d.mp4?v=20261112-r29", a: "../assets/music/main-theme.mp3", d: 25.166667 }
    ]
  },
  {
    code: "06", ep: 2, lv: 2, name: "Needle Gap",
    intro: [
      { ver: "a", note: "live", v: "../assets/setup-e2l2.mp4", a: "../assets/music/level-intro.mp3", d: 14.833333 },
      { ver: "c", note: "later", v: "media/intro-06c.mp4?v=20261112-r21", a: "../assets/music/level-intro.mp3", sfx: "media/intro-06c-sfx.wav?v=20261112-r21", d: 14.833333 },
      { ver: "d", note: "new", v: "media/intro-06d.mp4?v=20261112-r31", a: "../assets/music/level-intro.mp3", sfx: "media/intro-06d-sfx.wav?v=20261112-r31", d: 14.833333 }
    ],
    lose: [
      { ver: "a", note: "live", img: "../assets/lose-e2l2.jpg" },
      { ver: "b", note: "later", img: "media/lose-06b.jpg?v=20261112-r12" },
      { ver: "c", note: "new", img: "media/lose-06c.jpg?v=20261112-r31" }
    ],
    win: [
      { ver: "a", note: "live", v: "../assets/win-e2l2.mp4", a: "../assets/music/main-theme.mp3", d: 16.041667 },
      { ver: "b", note: "later", v: "media/win-06b.mp4?v=20261112-r12", a: "../assets/music/main-theme.mp3", d: 25.041667 },
      { ver: "c", note: "later", v: "media/win-06c.mp4?v=20261112-r21", a: "../assets/music/main-theme.mp3", d: 25.000000 },
      { ver: "d", note: "new", v: "media/win-06d.mp4?v=20261112-r31", a: "../assets/music/main-theme.mp3", sfx: "media/win-06d-sfx.wav?v=20261112-r31", d: 25.000000 }
    ]
  },
  {
    code: "07", ep: 2, lv: 3, name: "King's Crossing",
    intro: [
      { ver: "a", note: "live", v: "../assets/setup-e2l3.mp4", a: "../assets/music/level-intro.mp3", d: 14.833333 },
      { ver: "b", note: "new", v: "media/intro-07b.mp4?v=20261112-r36", a: "../assets/music/level-intro.mp3", sfx: "media/intro-07b-roar.wav?v=20261112-r36", d: 14.833333 }
    ],
    lose: [ { img: "../assets/lose-e2l3.jpg" } ],
    win: [
      { ver: "a", note: "live", v: "../assets/win-e2l3.mp4", a: "../assets/music/main-theme.mp3", d: 16.041667 },
      { ver: "b", note: "later", v: "media/win-07b.mp4?v=20261112-r12", a: "../assets/music/main-theme.mp3", d: 25.041667 },
      { ver: "c", note: "new", v: "media/win-07c.mp4?v=20261112-r28", a: "../assets/music/main-theme.mp3", d: 22.291667 }
    ]
  },
  {
    code: "08", ep: 2, lv: 4, name: "Rendezvous Point",
    intro: [
      { ver: "a", note: "live", v: "../assets/setup-e2l4.mp4", a: "../assets/music/level-intro.mp3", d: 14.833333 },
      { ver: "b", note: "later", v: "media/intro-08b.mp4?v=20261112-r18", a: "../assets/music/level-intro.mp3", sfx: "media/intro-08b-hooves.wav?v=20261112-r18", d: 14.833333 },
      { ver: "c", note: "new", v: "media/intro-08c.mp4?v=20261112-r35", a: "../assets/music/level-intro.mp3", sfx: "media/intro-08c-hooves.wav?v=20261112-r35", d: 14.833333 }
    ],
    lose: [ { img: "../assets/lose-e2l4.jpg" } ],
    win: [
      { ver: "a", note: "live", v: "../assets/win-e2l4.mp4", a: "../assets/music/main-theme.mp3", d: 16.041667 },
      { ver: "b", note: "later", v: "media/win-08b.mp4?v=20261112-r12", a: "../assets/music/main-theme.mp3", d: 25.000000 },
      { ver: "c", note: "later", v: "media/win-08c.mp4?v=20261112-r18", a: "../assets/music/main-theme.mp3", sfx: "media/win-08c-hooves.wav?v=20261112-r18", d: 31.708333 },
      { ver: "d", note: "new", v: "media/win-08d.mp4?v=20261112-r30", a: "../assets/music/main-theme.mp3", sfx: "media/win-08d-hooves.wav?v=20261112-r30", d: 30.041667 }
    ]
  },
  {
    code: "09", ep: 3, lv: 1, name: "Razorback Ridge",
    intro: [
      { ver: "a", note: "live", v: "../assets/setup-e3l1.mp4", a: "../assets/music/level-intro.mp3", d: 14.833333 },
      { ver: "b", note: "earlier", v: "media/intro-09b.mp4?v=20261112-r31", a: "../assets/music/level-intro.mp3", d: 9.916667 }
    ],
    lose: [
      { ver: "a", note: "live", img: "../assets/lose-e3l1.jpg" },
      { ver: "b", note: "new", img: "media/lose-09b.jpg?v=20261112-r12" }
    ],
    win: [
      { ver: "a", note: "live", v: "../assets/win-e3l1.mp4", a: "../assets/music/main-theme.mp3", d: 16.041667 },
      { ver: "b", note: "later", v: "media/win-09b.mp4?v=20261112-r12", a: "../assets/music/main-theme.mp3", d: 24.583333 }
    ]
  },
  {
    code: "10", ep: 3, lv: 2, name: "White Shroud",
    intro: [
      { ver: "a", note: "live", v: "../assets/setup-e3l2.mp4", a: "../assets/music/level-intro.mp3", d: 11.833333 },
      { ver: "b", note: "new", v: "media/intro-10b.mp4?v=20261112-r18", a: "../assets/music/level-intro.mp3", sfx: "media/intro-10b-sfx.wav?v=20261112-r18", d: 10.833333 }
    ],
    lose: [ { img: "../assets/lose-e3l2.jpg" } ],
    win: [
      { ver: "a", note: "live", v: "../assets/win-e3l2.mp4", a: "../assets/music/main-theme.mp3", d: 16.041667 },
      { ver: "b", note: "later", v: "media/win-10b.mp4?v=20261112-r12", a: "../assets/music/main-theme.mp3", d: 25.000000 },
      { ver: "c", note: "later", v: "media/win-10c.mp4?v=20261112-r18", a: "../assets/music/main-theme.mp3", sfx: "media/win-10c-sfx.wav?v=20261112-r18", d: 25.000000 },
      { ver: "d", note: "new", v: "media/win-10d.mp4?v=20261112-r32", a: "../assets/music/main-theme.mp3", sfx: "media/win-10d-sfx.wav?v=20261112-r32", d: 26.833333 }
    ]
  },
  {
    code: "11", ep: 3, lv: 3, name: "Widow's Camp",
    intro: [
      { ver: "a", note: "live", v: "../assets/setup-e3l3.mp4", a: "../assets/music/level-intro.mp3", d: 14.833333 },
      { ver: "b", note: "new", v: "media/intro-11b.mp4?v=20261112-r33", a: "../assets/music/level-intro.mp3", sfx: "media/intro-11b-sfx.wav?v=20261112-r33", d: 14.833333 }
    ],
    lose: [
      { ver: "a", note: "live", img: "../assets/lose-e3l3.jpg", go: "left" },
      { ver: "b", note: "new", img: "media/lose-11b.jpg?v=20261112-r16", go: "left" }
    ],
    win: [
      { ver: "a", note: "live", v: "../assets/win-e3l3.mp4", a: "../assets/music/main-theme.mp3", d: 26.041667 },
      { ver: "b", note: "new", v: "media/win-11b.mp4?v=20261112-r20", a: "../assets/music/main-theme.mp3", sfx: "media/win-11b-growls.wav?v=20261112-r20", d: 26.041667 }
    ]
  },
  {
    code: "12", ep: 3, lv: 4, name: "Rendezvous Point",
    intro: [
      { ver: "a", note: "live", v: "../assets/setup-e3l4.mp4", a: "../assets/music/level-intro.mp3", d: 14.833333 },
      { ver: "b", note: "later", v: "media/intro-12b.mp4?v=20261112-r20", a: "../assets/music/level-intro.mp3", d: 14.833333 },
      { ver: "c", note: "new", v: "media/intro-12c.mp4?v=20261112-r36", a: "../assets/music/level-intro.mp3", sfx: "media/intro-12c-sfx.wav?v=20261112-r36", d: 14.833333 }
    ],
    lose: [
      { ver: "a", note: "live", img: "../assets/lose-e3l4.jpg" },
      { ver: "b", note: "new", img: "media/lose-12b.jpg?v=20261112-r12" }
    ],
    win: [
      { ver: "a", note: "live", v: "../assets/win-e3l4.mp4", a: "../assets/music/main-theme.mp3", d: 20.625000 },
      { ver: "b", note: "new", v: "media/win-12b.mp4?v=20261112-r20", a: "../assets/music/main-theme.mp3", sfx: "media/win-12b-sfx.wav?v=20261112-r31", d: 40.125000 }
    ]
  }
];
