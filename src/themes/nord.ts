import { Theme } from "~/composables/theme-utils";

export const nord: Theme = {
  key: "nord",
  name: "Nord",
  inspiration: "Nord Theme",
  inspirationUrl: "https://www.nordtheme.com/",
  mode: 'dark',
  shadow: "hsl(220, 17%, 17%)",
  background: `linear-gradient(
    140deg,
	hsl(220, 16%, 36%),
	hsl(220, 17%, 32%),
	hsl(222, 16%, 28%),
	hsl(220, 16%, 22%)
  )`,
  monaco: {
    foreground: "hsl(218, 27%, 94%)",
    comments: "hsl(220, 16%, 36%)",
    keywords: "hsl(213, 32%, 52%)",
    delimiters: "hsl(219, 28%, 88%)",
    strings: "hsl(92, 28%, 65%)",
    numbers: "hsl(311, 20%, 63%)",
    regexp: "hsl(14, 51%, 63%)",
  },
};
