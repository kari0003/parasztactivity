export const drawingBoardHandler = () => {
  return 'fuck the compiler';
};

export const drawingBoardEmitterFactory = (socket: SocketIOClient.Socket) => {
  return {
    drawDot: (x: number, y: number, lineWidth = 10, color = '#000000') => {
      socket.emit('drawDot', { x, y, lineWidth, color, timestamp: Date.now() });
    },
    drawLine: (startX: number, startY: number, endX: number, endY: number, lineWidth = 10, color = '#000000') => {
      socket.emit('drawLine', { startX, startY, endX, endY, lineWidth, color, timestamp: Date.now() });
    },
    clear: () => {
      socket.emit('drawClear', { timestamp: Date.now() });
    },
  };
};
