export type DrawLineProps = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  lineWidth: number;
  color: string;
};

export const drawLine = (
  canvas: HTMLCanvasElement | null,
  { startX, startY, endX, endY, lineWidth = 10, color = '#000000' }: DrawLineProps,
) => {
  if (canvas === null) {
    console.log('canvas is null');
    return;
  }
  const context = canvas.getContext('2d');

  if (!context) {
    console.log('canvas context is null');
    return;
  }

  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.lineCap = 'round';
  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(endX, endY);
  context.stroke();
};

export type DrawDotProps = { x: number; y: number; lineWidth: number; color: string };

export const drawDot = (
  canvas: HTMLCanvasElement | null,
  { x, y, lineWidth = 10, color = '#000000' }: DrawDotProps,
) => {
  if (canvas === null) {
    console.log('canvas is null');
    return;
  }
  const context = canvas.getContext('2d');

  if (!context) {
    console.log('canvas context is null');
    return;
  }

  context.fillStyle = color;
  context.lineCap = 'round';
  context.beginPath();
  context.arc(x, y, lineWidth / 2, 0, Math.PI * 2, true);
  context.fill();
};
export const drawClear = (canvas: HTMLCanvasElement | null) => {
  if (canvas === null) {
    console.log('canvas is null');
    return;
  }

  const context = canvas.getContext('2d');

  if (!context) {
    console.log('canvas context is null');
    return;
  }

  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);
};
