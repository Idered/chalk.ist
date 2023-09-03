import { Theme } from "~/composables/theme-utils";

const hue = -53;

export const chrome: Theme = {
  key: "chrome",
  name: "Chrome",
  mode: "dark",
  shadow: "hsl(0, 68%, 14%)",
  shadowStyle: {
    opacity: 0.15,
  },
  backgroundStyle: {
    filter: `blur(30px)`,
    transform: `scale(1.385)`,
  },

  appStyle: {
    backgroundColor: "#140a177c",
    boxShadow: `
      0 0 0px 1px rgba(17, 4, 14, 0.7),
      inset 0 0 0 1px rgba(255,255,255,.07), 
      0 0 18px 1px rgba(0,0,0,.6)
    `,
  },
  background: `conic-gradient(
    from 230.29deg at 51.63% 52.16%,
    hsl(238, 100%, 1%) 0deg,
    hsl(283, 71%, 12%) 67.5deg,
    hsl(230, 50%, 8%) 198.75deg,
    hsl(8, 100%, 60%) 251.25deg,
    hsl(280, 93%, 73%) 301.88deg,
    hsl(300, 100%, 9%) 360deg
    )
  `,
  monaco: {
    foreground: `hsl(${hue + 90}, 85%, 64%)`,
    comments: `hsl(${hue + 325}, 20%, 43%)`,
    keywords: `hsl(${hue + 35}, 85%, 41%)`,
    delimiters: `hsl(${hue - 57}, 25%, 40%)`,
    strings: `hsl(${hue + 88}, 67%, 73%)`,
    numbers: `hsl(${hue - 323}, 76%, 74%)`,
    regexp: `hsl(${hue + 107}, 86%, 61%)`,
  },
};
