import { Theme } from "~/composables/theme-utils";

export const vue: Theme = {
  key: "vue",
  name: "Vue",
  inspiration: "Vue.js",
  inspirationUrl: "https://vuejs.org/",
  shadow: "hsl(153, 50%, 6%)",
  background: `linear-gradient(
    140deg, 
    hsl(153, 47%, 49%), 
    hsl(153, 47%, 30%), 
    hsl(153, 47%, 24%), 
    hsl(153, 47%, 34%)
  )`,
  monaco: {
    foreground: "hsl(153, 47%, 49%)",
    comments: "hsl(152, 34%, 33%)",
    keywords: "hsl(230, 100%, 70%)",
    delimiters: "hsl(150, 13%, 91%)",
    strings: "hsl(97, 54%, 77%)",
    numbers: "hsl(66, 60%, 61%)",
    regexp: "hsl(66, 60%, 81%)",
  },
};
