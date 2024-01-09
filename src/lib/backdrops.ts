export interface Backdrop {
  [key: string]: {
    backgroundStyle: {
      background: string;
      filter?: string;
      transform?: string;
    };
    appStyle?: {
      backgroundColor: string;
    };
    shadow?: string;
    shadowsOpacity?: number;
    lightsOpacity?: number;
  };
}

export const Backdrops: Backdrop = {
  // Random1: generateRandomBackdrop(),
  // Random2: generateRandomBackdrop(),
  // Random3: generateRandomBackdrop(),
  // Random4: generateRandomBackdrop(),
  // Random5: generateRandomBackdrop(),

  Monochrome_1: {
    backgroundStyle: {
      background: `conic-gradient(
        from 230.29deg at 51.63% 52.16%,
        hsl(0, 0%, 0%) 0deg,
        hsl(0, 0%, 16%) 67.5deg,
        hsl(0, 0%, 2%) 198.75deg,
        hsl(0, 0%, 40%) 251.25deg,
        hsl(0, 0%, 13%) 301.88deg,
        hsl(0, 0%, 9%) 360deg
      )`,
      filter: `blur(30px)`,
      transform: `scale(1.385)`,
    },
    shadow: "hsl(0, 0%, 6%)",
    shadowsOpacity: 1,
    lightsOpacity: 0.08,
    appStyle: {
      backgroundColor: "hsla(0, 0%, 6%, 0.85)",
    },
  },

  Monochrome_2: {
    backgroundStyle: {
      background: `linear-gradient(
        140deg, 
        hsl(0, 0%, 18%), 
        hsl(0, 0%, 7%), 
        hsl(0, 0%, 2%)
      )`,
    },
    shadow: "hsl(0, 0%, 4%)",
    shadowsOpacity: 1,
    lightsOpacity: 0.08,
    appStyle: {
      backgroundColor: "hsla(0, 0%, 6%, 0.85)",
    },
  },

  R1: {
    backgroundStyle: {
      background: `conic-gradient(from 45deg, rgb(102, 7, 203), rgb(14, 188, 212), rgb(184, 71, 243), rgb(82, 14, 204), rgb(0, 168, 244), rgb(79, 92, 184))`,
      filter: `blur(34px)`,
      transform: `scale(2.49328)`,
    },
    shadow: "hsl(140, 40%, 2%)",
    shadowsOpacity: 1,
    lightsOpacity: 0.17,
  },

  Chrome: {
    backgroundStyle: {
      background: `conic-gradient(
          from 230.29deg at 51.63% 52.16%,
          hsl(238, 100%, 1%) 0deg,
          hsl(283, 71%, 12%) 67.5deg,
          hsl(230, 50%, 8%) 198.75deg,
          hsl(8, 100%, 60%) 251.25deg,
          hsl(280, 93%, 73%) 301.88deg,
          hsl(300, 100%, 9%) 360deg
        )`,
      filter: `blur(30px)`,
      transform: `scale(1.385)`,
    },
    shadow: "hsl(300, 50%, 6%)",
    shadowsOpacity: 1,
    lightsOpacity: 0.08,
    appStyle: {
      backgroundColor: "#140a17cc",
    },
  },

  Lakka: {
    backgroundStyle: {
      background: `conic-gradient(
        from 230.29deg at 51.63% 52.16%,
        hsl(238, 100%, 60%) 0deg,
        hsl(283, 71%, 38%) 67.5deg,
        hsl(230, 50%, 50%) 198.75deg,
        hsl(8, 100%, 60%) 251.25deg,
        hsl(280, 93%, 73%) 301.88deg,
        hsl(300, 100%, 101%) 360deg
      )`,
      filter: `blur(30px)`,
      transform: `scale(1.385)`,
    },
    shadow: "hsl(13, 80%, 7%)",
    shadowsOpacity: 1,
    lightsOpacity: 0.19,
  },

  Kozuchi: {
    backgroundStyle: {
      background: `conic-gradient(
        from 80deg at 47% 42%,
        hsl(248, 20%, 20%) 0deg,
        hsl(243, 41%, 29%) 60deg,
        hsl(230, 50%, 32%) 140deg,
        hsl(268, 30%, 46%) 200deg,
        hsl(270, 56%, 40%) 280deg,
        hsl(300, 60%, 12%) 360deg
      )`,
      filter: `blur(30px)`,
      transform: `scale(1.385)`,
    },
    shadow: "hsl(220, 80%, 9%)",
    shadowsOpacity: 1,
    lightsOpacity: 0.15,
    appStyle: {
      backgroundColor: "#140a17dd",
    },
  },

  Linear: {
    backgroundStyle: {
      background: `conic-gradient(
          from 230.29deg at 51.63%52.16%,
          #2400ff 0deg,
          #0087ff 67.5deg,
          #ff1d7a 198.75deg,
          #f5381b 251.25deg,
          #ff5335 301.88deg,
          hsl(260, 100%, 56%) 360deg
        )`,
      filter: `blur(120px)`,
      transform: `scale(.885)`,
    },
    appStyle: {
      backgroundColor: `rgba(16, 15, 20, 0.9)`,
    },
    shadow: "hsl(23, 60%, 6%)",
    shadowsOpacity: 1,
    lightsOpacity: 0.08,
  },

  Nord: {
    backgroundStyle: {
      background: `linear-gradient(
          140deg,
          hsl(220, 16%, 36%),
          hsl(220, 17%, 32%),
          hsl(222, 16%, 28%),
          hsl(220, 16%, 22%)
        )`,
    },
    shadow: "hsl(220, 17%, 17%)",
    shadowsOpacity: 1,
    lightsOpacity: 0.17,
  },

  Vue: {
    backgroundStyle: {
      background: `linear-gradient(
        140deg, 
        hsl(153, 47%, 49%), 
        hsl(153, 47%, 30%), 
        hsl(153, 47%, 24%), 
        hsl(153, 47%, 34%)
      )`,
    },
    shadow: "hsl(153, 50%, 6%)",
    shadowsOpacity: 1,
    lightsOpacity: 0.24,
  },

  TailwindCSS: {
    backgroundStyle: {
      background: `linear-gradient(
          140deg, 
          hsl(198, 93%, 49%), 
          hsl(198, 93%, 30%), 
          hsl(198, 93%, 24%), 
          hsl(198, 93%, 34%)
        )`,
    },
    shadow: "hsl(198, 93%, 6%)",
    shadowsOpacity: 1,
    lightsOpacity: 0.19,
  },

  Dawn: {
    backgroundStyle: {
      background: `linear-gradient(
        140deg, 
        hsl(33, 60%, 50%), 
        hsl(4, 49%, 42%), 
        hsl(296, 22%, 13%)
        )`,
    },
    shadow: "hsl(8, 45%, 13%)",
    shadowsOpacity: 1,
    lightsOpacity: 0.17,
  },

  Sakura: {
    backgroundStyle: {
      background: `linear-gradient(
      140deg, 
      hsl(330, 80%, 90%), 
      hsl(330, 80%, 80%), 
      hsl(330, 80%, 70%)
    )`,
    },
    shadow: "hsl(330, 80%, 13%)",
    shadowsOpacity: 1,
    lightsOpacity: 0.17,
  },

  Ocean: {
    backgroundStyle: {
      background: `linear-gradient(
        140deg, 
        hsl(200, 80%, 70%), 
        hsl(200, 80%, 60%), 
        hsl(200, 80%, 50%)
      )`,
    },
    shadow: "hsl(200, 80%, 10%)",
    shadowsOpacity: 1,
    lightsOpacity: 0.29,
  },

  Lavender: {
    backgroundStyle: {
      background: `linear-gradient(
        140deg, 
        hsl(255, 100%, 90%), 
        hsl(255, 100%, 80%), 
        hsl(255, 100%, 70%)
        )`,
    },
    shadow: "hsl(255, 100%, 10%)",
    shadowsOpacity: 1,
    lightsOpacity: 0.29,
  },

  Sunset: {
    backgroundStyle: {
      background: `linear-gradient(
        140deg, 
        hsl(30, 80%, 70%), 
        hsl(30, 80%, 60%), 
        hsl(30, 80%, 50%)
      )`,
    },
    shadow: "hsl(30, 80%, 10%)",
    shadowsOpacity: 1,
    lightsOpacity: 0.29,
  },

  Sand: {
    backgroundStyle: {
      background: `linear-gradient(
        140deg, 
        hsl(30, 80%, 90%), 
        hsl(30, 80%, 80%), 
        hsl(30, 80%, 70%)
      )`,
    },
    shadow: "hsl(30, 80%, 10%)",
    shadowsOpacity: 1,
    lightsOpacity: 0.29,
  },

  Liveblocks: {
    backgroundStyle: {
      background: `linear-gradient(125deg, rgba(253,226,237,1) 0%, rgba(247,229,246,1) 91%, rgba(244,231,250,1) 100%)`,
    },
    appStyle: {
      backgroundColor: `#03000AEE`,
    },
    shadow: "hsl(347, 100%, 8%)",
    lightsOpacity: 0.35,
    shadowsOpacity: 1,
  },

  // Rose: {
  //   backgroundStyle: {
  //     background: `linear-gradient(
  //           140deg,
  //           hsl(330, 100%, 80%),
  //           hsl(330, 100%, 60%),
  //           hsl(330, 100%, 40%),
  //           hsl(330, 100%, 20%),
  //           hsl(330, 100%, 10%),
  //           hsl(330, 100%, 5%),
  //           hsl(330, 100%, 2%),
  //           hsl(330, 100%, 1%)
  //       )`,
  //   },
  //   shadow: "hsl(330, 100%, 10%)",
  //   shadowsOpacity: 1,
  //   lightsOpacity: 0.12,
  // },

  // Galaxy: {
  //   backgroundStyle: {
  //     background: `linear-gradient(
  //         140deg,
  //         hsl(240, 80%, 10%),
  //         hsl(240, 80%, 30%),
  //         hsl(240, 80%, 50%),
  //         hsl(240, 80%, 70%)
  //       )`,
  //   },
  //   shadow: "hsl(240, 80%, 10%)",
  //   shadowsOpacity: 1,
  //   lightsOpacity: 0.12,
  // },

  // MilkyWay: {
  //   backgroundStyle: {
  //     background: `linear-gradient(
  //     140deg,
  //     hsl(240, 80%, 10%),
  //     hsl(240, 80%, 5%),
  //     hsl(240, 80%, 2%),
  //     hsl(240, 80%, 1%)
  //   )`,
  //   },
  //   shadow: "hsl(240, 80%, 10%)",
  //   shadowsOpacity: 1,
  //   lightsOpacity: 0.12,
  // },

  //   Vercel: {
  //     backgroundStyle: {
  //       background: `#fafafa`,
  //     },
  //     appStyle: {
  //       backgroundColor: `#ffffff`,
  //       boxShadow: `0px 2px 4px rgba(0,0,0,.1)`,
  //     },
  //     shadow: "hsl(208, 100%, 10%)",
  //     lightsOpacity: 0.0,
  //     shadowsOpacity: 0.0,
  //   },
};
