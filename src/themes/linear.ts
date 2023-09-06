import { Theme } from "~/composables/theme-utils";

const hue = 292;

// Inspired by https://linear.app
export const linear: Theme = {
  key: "linear",
  name: "Linear",
  inspiration: "Linear",
  inspirationUrl: "https://linear.app",
  mode: "dark",
  shadow: "hsl(23, 60%, 6%)",
  shadowsOpacity: 1,
  lightsOpacity: 0.08,
  backgroundStyle: {
    filter: `blur(120px)`,
    transform: `scale(.685)`,
  },
  appStyle: {
    backgroundColor: `rgba(16, 15, 20, 0.8)`,
  },
  // background: `conic-gradient(
  //   from 230.29deg at 51.63% 52.16%,
  //   hsl(238, 100%, 60%) 0deg,
  //   hsl(283, 71%, 38%) 67.5deg,
  //   hsl(230, 50%, 50%) 198.75deg,
  //   hsl(8, 100%, 60%) 251.25deg,
  //   hsl(280, 93%, 73%) 301.88deg,
  //   hsl(300, 100%, 101%) 360deg
  //   )
  // `,
  background: `conic-gradient(
    from 230.29deg at 51.63%52.16%,
    #2400ff 0deg,
    #0087ff 67.5deg,
    #ff1d7a 198.75deg,
    #f5381b 251.25deg,
    #ff5335 301.88deg,
    hsl(260, 100%, 56%) 360deg
  )`,
  monaco: {
    foreground: `hsl(${hue + 90}, 85%, 64%)`,
    variables: `hsl(${hue + 90}, 45%, 85%)`,
    comments: `hsl(${hue + 325}, 20%, 43%)`,
    keywords: `hsl(${hue + 35}, 85%, 41%)`,
    delimiters: `hsl(${hue - 57}, 25%, 40%)`,
    strings: `hsl(${hue + 88}, 67%, 73%)`,
    numbers: `hsl(${hue - 323}, 76%, 74%)`,
    regexp: `hsl(${hue + 107}, 86%, 61%)`,
  },
};
