export function getLineNumbers(textarea?: HTMLTextAreaElement) {
  if (!textarea) return [];

  const lines = textarea.value.split("\n");
  const lineNumbers = [];

  for (let i = 0; i < lines.length; i++) {
    let lineNumber = i + 1;
    const line = lines[i];

    lineNumbers.push(lineNumber);

    // Create a temporary off-screen element with the same styles as the textarea
    const tempElement = document.createElement("div");
    tempElement.style.width = `${textarea.clientWidth}px`;
    tempElement.style.font = window.getComputedStyle(textarea).font;
    tempElement.style.whiteSpace = "pre-wrap";
    tempElement.textContent = line;

    // Calculate the number of wrapped lines using the temporary element's height
    const wrappedLines = Math.ceil(
      tempElement.clientHeight / textarea.scrollHeight,
    );

    // Add the current line number for each wrapped line
    for (let j = 0; j < wrappedLines; j++) lineNumbers.push(lineNumber);

    // Adjust the line number for the next line
    lineNumber += wrappedLines - 1;
  }

  return lineNumbers;
}
