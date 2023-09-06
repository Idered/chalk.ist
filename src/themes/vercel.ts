import { Theme } from "~/composables/theme-utils";

export const vercel: Theme = {
  key: "vercel",
  name: "Vercel",
  inspiration: "Vercel",
  inspirationUrl: "https://vercel.com",
  mode: "light",
  windowVariants: false,
  lightsOpacity: 0.0,
  shadowsOpacity: 0.0,
  background: `#fafafa`,
  // backgroundAlt: `#000 url(https://pbs.twimg.com/profile_banners/81712767/1635828256/1500x500)`,
  // backgroundStyle: {
  //   backgroundSize: "contain",
  //   backgroundRepeat: "no-repeat",
  //   backgroundPosition: "bottom",
  // },
  appStyle: {
    backgroundColor: `#ffffff`,
    boxShadow: `0px 2px 4px rgba(0,0,0,.1)`,
  },
  monaco: {
    foreground: `hsl(0deg, 0%, 0%)`,
    variables: "hsl(0deg, 0%, 50%)",
    functions: `hsl(212deg, 100%, 48%)`,
    comments: `hsl(0deg, 0%, 60%)`,
    keywords: "hsl(332deg, 100%, 50%)",
    delimiters: `hsl(0deg, 0%, 0%)`,
    strings: `hsl(166deg, 97%, 26%)`,
    numbers: `hsl(212deg, 100%, 48%)`,
    regexp: `hsl(0deg, 0%, 0%)`,
    selectionBackground: `hsl(167deg, 100%, 74%)`,
  },
};
