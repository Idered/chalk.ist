// import { generateRandomBackdrop } from "./colors";

import { svgToFilterUrl } from "./svg";

export interface Backdrop {
  [key: string]: {
    backgroundStyle: {
      background: string;
      filter?: string;
      transform?: string;
      inset?: string;
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

  Solid: {
    backgroundStyle: {
      background: `var(--solid-background)`,
    },
    shadow: "hsl(0, 0%, 6%)",
    shadowsOpacity: 1,
    lightsOpacity: 0.08,
    appStyle: {
      backgroundColor: "hsla(0, 0%, 6%, 0.85)",
    },
  },

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

  TurbulentGradient_2: {
    backgroundStyle: {
      background: `linear-gradient(#ffffff 5%, #808080 50%, #333 95%)`,
      filter: svgToFilterUrl(
        `<svg xmlns="http://www.w3.org/2000/svg" height="0">
          <filter id="myFilter">
            <feTurbulence type="fractalNoise" baseFrequency=".005 .001" numOctaves="2" />
            <feDisplacementMap xChannelSelector="R" scale="500" in="SourceGraphic" result="bands" />
            <feTurbulence type="fractalNoise" baseFrequency="3.71" />
            <feDisplacementMap in="bands" scale="32" xChannelSelector="R" />
          </filter>
        </svg>`,
      ),
      inset: "-9em",
    },
    shadow: "hsl(220, 17%, 17%)",
    shadowsOpacity: 1,
    lightsOpacity: 0.17,
  },

  TurbulentGradient_1: {
    backgroundStyle: {
      background: `linear-gradient(yellow 5%, fuchsia, royalblue 95%)`,
      filter: svgToFilterUrl(
        `<svg xmlns="http://www.w3.org/2000/svg" height="0">
          <filter id="myFilter">
            <feTurbulence type="fractalNoise" baseFrequency=".005 .001" numOctaves="2" />
            <feDisplacementMap xChannelSelector="R" scale="500" in="SourceGraphic" result="bands" />
            <feTurbulence type="fractalNoise" baseFrequency="3.71" />
            <feDisplacementMap in="bands" scale="32" xChannelSelector="R" />
          </filter>
        </svg>`,
      ),
      inset: "-9em",
    },
    shadow: "hsl(220, 17%, 17%)",
    shadowsOpacity: 1,
    lightsOpacity: 0.17,
  },
  TurbulentGradient_3: {
    backgroundStyle: {
      background: "linear-gradient(#002c66 5%, #006dff 50%, #99c5ff 95%)",
      filter: svgToFilterUrl(
        `<svg xmlns="http://www.w3.org/2000/svg" height="0">
          <filter id="myFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.005 0.003" numOctaves="3" />
            <feDisplacementMap xChannelSelector="R" scale="430" in="SourceGraphic" result="bands" />
            <feTurbulence type="fractalNoise" baseFrequency="3.71" />
            <feDisplacementMap in="bands" scale="32" xChannelSelector="R" />
          </filter>
        </svg>`,
      ),
      inset: "-9em",
    },
    shadow: "hsl(220, 17%, 17%)",
    shadowsOpacity: 1,
    lightsOpacity: 0.17,
  },

  TurbulentGradient_5: {
    backgroundStyle: {
      background: "linear-gradient(#003366 5%, #007eff 50%, #C7E3FF 95%)",
      filter:
        svgToFilterUrl(`<svg xmlns="http://www.w3.org/2000/svg" height="0">
    <filter id="myFilter">
      <feTurbulence type="fractalNoise" baseFrequency="0.009 0.012" numOctaves="5" />
      <feDisplacementMap xChannelSelector="R" scale="260" in="SourceGraphic" result="bands" />
      <feTurbulence type="fractalNoise" baseFrequency="3.71" />
      <feDisplacementMap in="bands" scale="32" xChannelSelector="R" />
    </filter>
  </svg>`),
      inset: "-8em",
    },
    shadow: "hsl(220, 17%, 17%)",
    shadowsOpacity: 1,
    lightsOpacity: 0.17,
  },
  TurbulentGradient_4: {
    backgroundStyle: {
      background: "linear-gradient(#000e66 5%, #0023ff 50%, #99a7ff 95%)",
      filter: svgToFilterUrl(
        `<svg xmlns="http://www.w3.org/2000/svg" height="0">
          <filter id="myFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.005 0.002" numOctaves="2" />
            <feDisplacementMap xChannelSelector="R" scale="380" in="SourceGraphic" result="bands" />
            <feTurbulence type="fractalNoise" baseFrequency="3.71" />
            <feDisplacementMap in="bands" scale="32" xChannelSelector="R" />
          </filter>
        </svg>`,
      ),
      inset: "-9em",
    },
    shadow: "hsl(220, 17%, 17%)",
    shadowsOpacity: 1,
    lightsOpacity: 0.17,
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

  Linear2: {
    backgroundStyle: {
      background:
        "conic-gradient(from 135deg, #69107E, #8B2AF0, #6248FA, #130971, #D20706, #F346E1)",
      filter: `blur(120px)`,
      transform: `scale(.885)`,
    },
    appStyle: {
      backgroundColor: `rgba(16, 15, 20, 0.9)`,
    },
    shadow: "hsl(140, 40%, 2%)",
    shadowsOpacity: 1,
    lightsOpacity: 0.08,
  },

  R6: {
    backgroundStyle: {
      background:
        "conic-gradient(from 0deg, #380A1A, #F9493A, #209BC6, #032F73, #B7D6B4, #11298B)",
      filter: "blur(30px)",
      transform: "scale(1.385)",
    },
    shadow: "hsl(140, 40%, 2%)",
    shadowsOpacity: 1,
    lightsOpacity: 0.17,
  },

  R5: {
    backgroundStyle: {
      background:
        "conic-gradient(from 45deg, #7A25AE, #0B1A4B, #F12CDE, #351FFE, #141EC3)",
      filter: `blur(120px)`,
      transform: `scale(.885)`,
    },
    appStyle: {
      backgroundColor: `rgba(16, 15, 20, 0.9)`,
    },
    shadow: "hsl(140, 40%, 2%)",
    shadowsOpacity: 1,
    lightsOpacity: 0.08,
  },

  R2: {
    backgroundStyle: {
      background:
        "conic-gradient(from 90deg, #8CC3E4, #250CA3, #05C5EB, #05D1C0, #049223, #1EEF6E)",
      filter: `blur(120px)`,
      transform: `scale(.885)`,
    },
    appStyle: {
      backgroundColor: `rgba(16, 15, 20, 0.9)`,
    },
    shadow: "hsl(140, 40%, 2%)",
    shadowsOpacity: 1,
    lightsOpacity: 0.08,
  },

  R3: {
    backgroundStyle: {
      background:
        "conic-gradient(from 45deg, #6A66BE, #724FF7, #24A551, #1198B2, #2287F9, #C7BCEC)",
      filter: `blur(120px)`,
      transform: `scale(.885)`,
    },
    appStyle: {
      backgroundColor: `rgba(16, 15, 20, 0.9)`,
    },
    shadow: "hsl(140, 40%, 2%)",
    shadowsOpacity: 1,
    lightsOpacity: 0.08,
  },

  R4: {
    backgroundStyle: {
      background:
        "conic-gradient(from 0deg, #D6A426, #A75001, #FFAD7E, #A8B2B9, #10DBCB, #6DB19A)",
      filter: `blur(120px)`,
      transform: `scale(.885)`,
    },
    appStyle: {
      backgroundColor: `rgba(16, 15, 20, 0.9)`,
    },
    shadow: "hsl(140, 40%, 2%)",
    shadowsOpacity: 1,
    lightsOpacity: 0.08,
  },

  Supa: {
    backgroundStyle: {
      background:
        "conic-gradient(from 135deg, #B0F2AD, #3AEAE6, #21BBB8, #3B8A8D, #95AC06, #B8E958)",
      filter: "blur(120px)",
      transform: "scale(.885)",
    },
    appStyle: {
      backgroundColor: "rgba(16, 15, 20, 0.9)",
    },
    shadow: "hsl(140, 40%, 2%)",
    shadowsOpacity: 1,
    lightsOpacity: 0.08,
  },

  WhiteWithDots: {
    backgroundStyle: {
      background: `
      url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 15 15"><circle fill-opacity="0.25" fill="%23000000" cx="13.5" cy="13.5" r="1.5"/></svg>'), 
      linear-gradient(
        140deg, 
        hsl(0, 0%, 100%), 
        hsl(0, 0%, 90%), 
        hsl(0, 0%, 80%)
      )`,
    },
    shadow: "hsl(0, 0%, 10%)",
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

  Jigglypuff: {
    backgroundStyle: {
      background: `linear-gradient(
        140deg, 
        hsl(300, 60%, 90%), 
        hsl(300, 60%, 80%), 
        hsl(300, 60%, 70%)
      )`,
    },
    shadow: "hsl(300, 60%, 10%)",
    shadowsOpacity: 1,
    lightsOpacity: 0.29,
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

  Gengar: {
    backgroundStyle: {
      background: `linear-gradient(
        140deg, 
        hsl(270, 60%, 50%), 
        hsl(270, 60%, 40%), 
        hsl(270, 60%, 30%)
      )`,
    },
    shadow: "hsl(270, 60%, 10%)",
    shadowsOpacity: 1,
    lightsOpacity: 0.29,
  },

  Lucario: {
    backgroundStyle: {
      background: `conic-gradient(
        from 140deg at 50% 50%, 
        hsl(225, 60%, 55%) 0%, 
        hsl(225, 60%, 45%) 33%, 
        hsl(225, 60%, 35%) 66%, 
        hsl(225, 60%, 25%) 100%
      )`,
      filter: `blur(30px)`,
      transform: `scale(1.385)`,
    },
    shadow: "hsl(225, 60%, 10%)",
    shadowsOpacity: 1,
    lightsOpacity: 0.29,
  },

  Snorlax: {
    backgroundStyle: {
      background: `conic-gradient(
        from 140deg at 50% 50%, 
        hsl(240, 30%, 50%) 0%, 
        hsl(240, 30%, 40%) 33%, 
        hsl(240, 30%, 30%) 66%, 
        hsl(240, 30%, 20%) 100%
      )`,
      filter: `blur(30px)`,
      transform: `scale(1.385)`,
    },
    shadow: "hsl(240, 30%, 10%)",
    shadowsOpacity: 1,
    lightsOpacity: 0.29,
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

  Squirtle: {
    backgroundStyle: {
      background: `linear-gradient(
        140deg, 
        hsl(195, 100%, 50%), 
        hsl(195, 100%, 40%), 
        hsl(195, 100%, 30%)
      )`,
    },
    shadow: "hsl(195, 100%, 10%)",
    shadowsOpacity: 1,
    lightsOpacity: 0.29,
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

  Bulbasaur: {
    backgroundStyle: {
      background: `linear-gradient(
        140deg, 
        hsl(120, 40%, 50%), 
        hsl(120, 40%, 40%), 
        hsl(120, 40%, 30%)
      )`,
    },
    shadow: "hsl(120, 40%, 10%)",
    shadowsOpacity: 1,
    lightsOpacity: 0.29,
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

  Dragonite: {
    backgroundStyle: {
      background: `linear-gradient(
        140deg, 
        hsl(39, 100%, 50%), 
        hsl(39, 100%, 40%), 
        hsl(39, 100%, 30%)
      )`,
    },
    shadow: "hsl(39, 100%, 10%)",
    shadowsOpacity: 1,
    lightsOpacity: 0.29,
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

  Transparent: {
    backgroundStyle: {
      background:
        "repeating-conic-gradient(#000 0% 25%, #111 0% 50%) 0% 0% / 16px 16px",
    },
    shadow: "hsl(0, 0%, 6%)",
    shadowsOpacity: 1,
    lightsOpacity: 0.08,
    appStyle: {
      backgroundColor: "hsla(0, 0%, 2%, 0.9)",
    },
  },
};
