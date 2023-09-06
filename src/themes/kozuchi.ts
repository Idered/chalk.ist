import { Theme } from "~/composables/theme-utils";

const hue = -53;

const genColor = (hShift: number, sShift: number, lShift: number) => (h: number, s: number, l: number) =>
  `hsl(${h + hShift}, ${s + sShift}%, ${l + lShift}%)`;

const bg = genColor(0, 0, 0);

export const kozuchi: Theme = {
  key: "kozuchi",
  name: "Kozuchi",
  mode: "dark",
  shadow: "hsl(220, 80%, 9%)",
  lightsOpacity: 0.13,
  shadowsOpacity: 1,
  backgroundStyle: {
    filter: `blur(30px)`,
    transform: `scale(1.385)`,
  },
  appStyle: {
    backgroundColor: "#140a17cc",
  },
  background: `conic-gradient(
    from 80deg at 47% 42%,
    ${bg(248, 20, 20)} 0deg,
    ${bg(243, 41, 29)} 60deg,
    ${bg(230, 50, 32)} 140deg,
    ${bg(268, 30, 46)} 200deg,
    ${bg(270, 56, 40)} 280deg,
    ${bg(300, 60, 12)} 360deg
  )`,
  // background: `conic-gradient(
  //   from 230.29deg at 51.63% 52.16%,
  //   hsl(238, 100%, 60%) 0deg,
  //   hsl(283, 71%, 38%) 67.5deg,
  //   hsl(230, 50%, 50%) 198.75deg,
  //   hsl(8, 100%, 60%) 251.25deg,
  //   hsl(280, 93%, 73%) 301.88deg,
  //   hsl(300, 100%, 101%) 360deg
  // )`,
  monaco: {
    foreground: `hsl(${hue + 238}, 75%, 70%)`,
    variables: `hsl(${hue + 238}, 85%, 90%)`,
    comments: `hsl(${hue + 305}, 25%, 49%)`,
    keywords: `hsl(${hue + 314}, 62%, 66%)`,
    delimiters: `hsl(${hue + 90}, 17%, 42%)`,
    strings: `hsl(${hue + 290}, 100%, 80%)`,
    numbers: `hsl(${hue + 100}, 86%, 54%)`,
    regexp: `hsl(${hue + 97}, 86%, 61%)`,
    selectionBackground: `hsl(${hue + 0}, 35%, 10%)`,
  },
};
