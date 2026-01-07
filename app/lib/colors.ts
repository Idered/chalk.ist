import type { Backdrop } from "./backdrops";

export function cssGradientToCanvas(
  ctx: CanvasRenderingContext2D,
  gradient: string,
  width: number,
  height: number,
): CanvasGradient | null {
  const gradientType = gradient.split("(")[0];
  const gradientValues = gradient.match(/\(([^)]+)\)/);
  let canvasGradient: CanvasGradient | null = null;

  if (gradientValues && gradientValues[1]) {
    if (gradientType === "linear-gradient") {
      const angle = gradient.split(",")?.[0].match(/\d+/g)?.[0];
      const colorStops = gradient.match(/hsl\(.+?\)/g) || [];

      // Convert the angle to radians
      const angleRad = (Number(angle) * Math.PI) / 180;

      // Calculate the start and end points for the gradient
      const startX = width / 2 + Math.cos(angleRad) * width;
      const startY = height / 2 - Math.sin(angleRad) * height;
      const endX = width - startX;
      const endY = height - startY;

      canvasGradient = ctx.createLinearGradient(startX, startY, endX, endY);

      colorStops.forEach((colorStop, index) => {
        canvasGradient!.addColorStop(
          index / (colorStops.length - 1),
          colorStop.trim(),
        );
      });
    } else if (gradientType === "conic-gradient") {
      const angle = Number(gradient.split(",")?.[0].match(/\d+/g)?.[0]) / 100;
      //   const x = Number(gradient.split(",")?.[0].match(/\d+/g)?.[1]);
      //   const y = Number(gradient.split(",")?.[0].match(/\d+/g)?.[2]);
      const colorStopsWithAngle = gradient
        .match(/hsl\(.+?\)\s(\d+(\.\d+)?)deg/g)
        ?.map((item) => item.replace(/,\s/g, ",").split(" "));
      canvasGradient = ctx.createConicGradient(angle, width / 2, height / 2);

      colorStopsWithAngle?.forEach(([color, offset], index) => {
        canvasGradient!.addColorStop(
          Number(offset.replace("deg", "")) / 360,
          color,
        );
      });
    }
  }

  return canvasGradient;
}

export function hslToHex(hsl: string) {
  // Check if input is HSLA or HSL
  const isHsla = hsl.startsWith("hsla");
  let [h, s, l, a] = hsl
    .slice(isHsla ? 5 : 4, -1)
    .split(",")
    .map((x) => parseFloat(x));

  l /= 100;
  const alpha = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - alpha * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };

  // If it's HSLA, append the alpha channel
  if (isHsla && a !== undefined) {
    const alphaHex = Math.round(a * 255)
      .toString(16)
      .padStart(2, "0");
    return `#${f(0)}${f(8)}${f(4)}${alphaHex}`;
  }

  return `#${f(0)}${f(8)}${f(4)}`;
}

export function hslToRGB(hsl: string) {
  let [h, s, l] = hsl
    .slice(4, -1)
    .split(",")
    .map((x) => parseInt(x, 10));
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color);
  };
  return `rgb(${f(0)}, ${f(8)}, ${f(4)})`;
}

export function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

export function getRandomGradient() {
  const angles = [
    "0deg",
    "45deg",
    "90deg",
    "135deg",
    "180deg",
    "225deg",
    "270deg",
    "315deg",
  ];
  const colors = [
    getRandomColor(),
    getRandomColor(),
    getRandomColor(),
    getRandomColor(),
    getRandomColor(),
    getRandomColor(),
  ];
  const gradient = `conic-gradient(from ${
    angles[Math.floor(Math.random() * angles.length)]
  }, ${colors.join(", ")})`;
  return gradient;
}

export function generateRandomBackdrop(): Backdrop[keyof Backdrop] {
  return {
    backgroundStyle: {
      background: getRandomGradient(),
      filter: `blur(30px)`,
      transform: `scale(1.385)`,
    },
    shadow: "hsl(140, 40%, 2%)",
  };
}

export function rgbaToHex(str: string) {
  // Check if the input is already a hex value
  if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(str)) {
    return str;
  }

  // Extract rgba values
  const rgba = str.match(
    /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/,
  );

  if (!rgba) {
    throw new Error("Invalid rgba string format");
  }

  // Convert to hex
  const hex = (x: string) => ("0" + parseInt(x).toString(16)).slice(-2);

  // Handle alpha channel
  const alpha = rgba[4] ? Math.round(parseFloat(rgba[4]) * 255) : 255;

  return (
    "#" +
    hex(rgba[1]) +
    hex(rgba[2]) +
    hex(rgba[3]) +
    (alpha !== 255 ? hex(alpha.toString()) : "")
  );
}

export function toHex(color: string) {
  return color.startsWith("#")
    ? color
    : color.startsWith("rgb")
      ? rgbaToHex(color)
      : hslToHex(color);
}
