import { Theme } from "~/composables/theme-utils";

export const lavender: Theme = {
  key: "lavender",
  name: "Lavender",
  shadow: "hsl(231, 65%, 10%)",
  background: `linear-gradient(
    140deg, 
    hsl(220, 63%, 55%), 
    hsl(250, 70%, 35%), 
    hsl(250, 67%, 28%),
    hsl(250, 76%, 45%)
  )`,
  monaco: {
    foreground: "hsl(235, 77%, 71%)",
    comments: "hsl(250, 37%, 41%)",
    keywords: "hsl(254, 69%, 58%)",
    delimiters: "hsl(228, 25%, 40%)",
    strings: "hsl(292, 37%, 70%)",
    numbers: "hsl(162, 56%, 74%)",
    regexp: "hsl(292, 56%, 61%)",
  },
};
