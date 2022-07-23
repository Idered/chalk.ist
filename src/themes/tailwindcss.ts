import { Theme } from "~/composables/theme-utils";

export const tailwindcss: Theme = {
  key: "tailwindcss",
  inspiration: "Tailwind CSS",
  inspirationUrl: "https://tailwindcss.com/",
  mode: 'dark',
  name: "Tailwind CSS",
  shadow: "hsl(198, 93%, 6%)",
  background: `linear-gradient(
    140deg, 
    hsl(198, 93%, 49%), 
    hsl(198, 93%, 30%), 
    hsl(198, 93%, 24%), 
    hsl(198, 93%, 34%)
  )`,
  monaco: {
    foreground: "hsl(198, 86%, 70%)",
    comments: "hsl(198, 73%, 35%)",
    keywords: "hsl(327, 67%, 64%)",
    delimiters: "hsl(198, 16%, 47%)",
    strings: "hsl(160, 86%, 70%)",
    numbers: "hsl(160, 65%, 51%)",
    regexp: "hsl(160, 65%, 71%)",
  },
};
