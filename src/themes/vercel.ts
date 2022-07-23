import { Theme } from "~/composables/theme-utils";

export const vercel: Theme = {
  key: "vercel",
  name: "Vercel",
  inspiration: "Vercel",
  inspirationUrl: "https://vercel.com",
  mode: 'light',
  shadow: "hsl(305, 70%, 24%)",
  shadowStyle: {
    opacity: 0,
  },
  backgroundStyle: {
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'bottom'
    // filter: `blur(120px)`,
    // transform: `scale(.685)`,
  },
  appStyle: {
    backgroundColor: `white`,
    boxShadow: `0px 2px 4px rgba(0,0,0,.1) `,
  },
  // background: `#000 url(https://pbs.twimg.com/profile_banners/81712767/1635828256/1500x500)`,
  background: `white`,
  monaco: {
    foreground: `hsl(0deg, 0%, 0%)`,
    functions: `hsl(212deg, 100%, 48%)`,
    comments: `hsl(0deg, 0%, 60%)`,
    keywords: "hsl(332deg, 100%, 50%)",
    delimiters: `hsl(0deg, 0%, 0%)`,
    strings: `hsl(0deg, 0%, 0%)`,
    numbers: `hsl(212deg, 100%, 48%)`,
    regexp: `hsl(0deg, 0%, 0%)`
  },
};
