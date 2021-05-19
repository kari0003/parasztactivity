export type DrawingBoardEmitter = {
  drawDot: (x: number, y: number, lineWidth: number, color: string) => void;
  drawLine: (x: number, y: number, endX: number, endY: number, lineWidth: number, color: string) => void;
  clear: () => void;
};

export const drawingBoardHandler = (): void => {
  return;
};

export const drawingBoardEmitterFactory = (socket: SocketIOClient.Socket): DrawingBoardEmitter => {
  return {
    drawDot: (x: number, y: number, lineWidth = 10, color = '#000000'): void => {
      socket.emit('drawDot', { x, y, lineWidth, color, timestamp: Date.now() });
    },
    drawLine: (startX: number, startY: number, endX: number, endY: number, lineWidth = 10, color = '#000000'): void => {
      socket.emit('drawLine', { startX, startY, endX, endY, lineWidth, color, timestamp: Date.now() });
    },
    clear: (): void => {
      socket.emit('drawClear', { timestamp: Date.now() });
    },
  };
};
