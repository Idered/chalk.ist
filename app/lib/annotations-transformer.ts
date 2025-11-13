import type { ShikiTransformer } from "shiki";
import type { CodeBlock } from "../types";

export function transformerNotationErrorsAndWarnings(
  marks: CodeBlock["marks"],
): ShikiTransformer {
  return {
    name: "error-and-warning-annotations",

    line(line, idx) {
      const mark = marks?.[idx];
      if (mark) {
        line.properties.style = "position: relative;";
        for (let actual_mark of mark) {
          const whole = this.tokens[idx - 1].map((t) => t.content).join("");
          line.children.push({
            type: "element",
            tagName: "div",
            properties: {
              style:
                "position: absolute; inset: 0; color: transparent; padding: inherit;",
            },
            children: [
              {
                type: "element",
                tagName: "span",
                properties: {},
                children: [
                  {
                    type: "text",
                    value: whole.slice(0, actual_mark.start),
                  },
                ],
              },
              {
                type: "element",
                tagName: "span",
                properties: {
                  style: `text-decoration: underline wavy ${actual_mark.kind === "error" ? "red" : "orange"};`,
                },
                children: [
                  {
                    type: "text",
                    value: whole.slice(actual_mark.start, actual_mark.end),
                  },
                ],
              },
              {
                type: "element",
                tagName: "span",
                properties: {},
                children: [
                  {
                    type: "text",
                    value: whole.slice(actual_mark.end),
                  },
                ],
              },
            ],
          });
        }
      }
    },
  };
}
