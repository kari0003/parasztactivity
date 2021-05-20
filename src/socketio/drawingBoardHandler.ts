import { EventHandlerFactory, RemoveListenersFunct } from './namespacehandler';
import * as canvasUtils from '../components/drawing/canvasUtils';

export type DrawingBoardEmitter = {
  drawDot: (x: number, y: number, lineWidth: number, color: string) => void;
  drawLine: (x: number, y: number, endX: number, endY: number, lineWidth: number, color: string) => void;
  clear: () => void;
};

export const drawingBoardHandlerFactory = (canvas: HTMLCanvasElement | null): EventHandlerFactory => (
  socket: SocketIOClient.Socket,
): RemoveListenersFunct => {
  const onDrawDot = (payload: canvasUtils.DrawDotProps & { timestamp: number }) => {
    console.log('drawDot', payload);
    canvasUtils.drawDot(canvas, payload);
  };
  const onDrawLine = (payload: canvasUtils.DrawLineProps & { timestamp: number }) => {
    console.log('drawLine', payload);
    canvasUtils.drawLine(canvas, payload);
  };
  const onClear = (payload: { timestamp: number }) => {
    console.log('clear', payload);
    canvasUtils.drawClear(canvas);
  };

  socket.on('drawDot', onDrawDot);
  socket.on('drawLine', onDrawLine);
  socket.on('clear', onClear);
  return () => {
    socket.off('drawDot', onDrawDot);
    socket.removeListener('drawLine', onDrawLine);
    socket.removeListener('clear', onClear);
  };
};

export const drawingBoardEmitterFactory = (socket: SocketIOClient.Socket, roomId: number): DrawingBoardEmitter => {
  return {
    drawDot: (x: number, y: number, lineWidth = 10, color = '#000000'): void => {
      socket.emit('drawDot', {
        x,
        y,
        lineWidth,
        color,
        timestamp: Date.now(),
      });
    },
    drawLine: (startX: number, startY: number, endX: number, endY: number, lineWidth = 10, color = '#000000'): void => {
      socket.emit('drawLine', { startX, startY, endX, endY, lineWidth, color, timestamp: Date.now() });
    },
    clear: (): void => {
      socket.emit('drawClear', { timestamp: Date.now() });
    },
  };
};
