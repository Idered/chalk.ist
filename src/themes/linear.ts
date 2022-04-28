import { Theme } from "~/composables/theme-utils";

// Inspired by https://linear.app
export const linear: Theme = {
  key: "linear",
  name: "Linear",
  shadow: "hsl(275, 89%, 14%)",
  shadowStyle: {
    opacity: 0.95,
  },
  backgroundStyle: {
    filter: `blur(120px)`,
    opacity: 0.9,
    transform: `scale(.575)`,
  },
  background: `conic-gradient(
    from 230.29deg at 51.63% 52.16%, 
    hsl(238, 100%, 50%) 0deg, 
    hsl(283, 71%, 18%) 67.5deg, 
    hsl(230, 100%, 50%) 198.75deg, 
    hsl(8, 100%, 50%) 251.25deg, 
    hsl(280, 53%, 73%) 301.88deg, 
    hsl(300, 100%, 61%) 360deg
    )
  `,
  monaco: {
    foreground: "hsl(235, 20%, 42%)",
    comments: "hsl(238, 34%, 24%)",
    keywords: "hsl(237, 48%, 47%)",
    delimiters: "hsl(228, 35%, 32%)",
    strings: "hsl(290, 44%, 53%)",
    numbers: "hsl(250, 33%, 74%)",
    regexp: "hsl(242, 30%, 56%)",
  },
};
