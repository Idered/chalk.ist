import { Backdrop } from "./backdrops";

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
  let [h, s, l] = hsl
    .slice(4, -1)
    .split(",")
    .map((x) => parseInt(x, 10));
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
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
    shadowsOpacity: 1,
    lightsOpacity: 0.17,
  };
}
