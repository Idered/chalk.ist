import { Theme } from "~/composables/theme-utils";

const hue = 0;

export const lakka: Theme = {
  key: "lakka",
  name: "Lakka",
  mode: "dark",
  shadow: "hsl(13, 80%, 7%)",
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
    from 230.29deg at 51.63% 52.16%,
    hsl(238, 100%, 60%) 0deg,
    hsl(283, 71%, 38%) 67.5deg,
    hsl(230, 50%, 50%) 198.75deg,
    hsl(8, 100%, 60%) 251.25deg,
    hsl(280, 93%, 73%) 301.88deg,
    hsl(300, 100%, 101%) 360deg
  )`,
  monaco: {
    foreground: `hsl(${hue + 188}, 50%, 80%)`,
    comments: `hsl(${hue + 176}, 10%, 45%)`,
    keywords: `hsl(${hue + 176}, 90%, 50%)`,
    delimiters: `hsl(${hue + 100}, 17%, 90%)`,
    strings: `hsl(${hue + 0}, 80%, 70%)`,
    numbers: `hsl(${hue + 210}, 86%, 54%)`,
    regexp: `hsl(${hue + 97}, 86%, 61%)`,
    selectionBackground: `hsl(${hue + 176}, 35%, 30%)`,
  },
};
