import { Theme } from "~/composables/theme-utils";

export const dawn: Theme = {
  key: "dawn",
  name: "Dawn",
  mode: "dark",
  shadow: "hsl(8, 45%, 13%)",
  background: `linear-gradient(
    140deg, 
    hsl(33, 60%, 50%), 
    hsl(4, 49%, 42%), 
    hsl(296, 22%, 13%)
    )`,
  monaco: {
    foreground: "hsl(11, 28%, 58%)",
    variables: `hsl(11, 70%, 70%)`,
    comments: "hsl(30, 52%, 30%)",
    keywords: "hsl(20, 66%, 52%)",
    delimiters: "hsl(265, 29%, 79%)",
    strings: "hsl(265, 29%, 79%)",
    numbers: "hsl(266, 21%, 94%)",
    regexp: "hsl(20, 51%, 64%)",
  },
};
