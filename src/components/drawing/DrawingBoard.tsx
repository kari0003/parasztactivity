import { useCallback, useEffect, useRef, useState } from 'react';
import { drawingBoardEmitterFactory, drawingBoardHandlerFactory } from '../../socketio/drawingBoardHandler';
import { useSocket } from '../../state/socket';

function DrawingBoard(prop: { roomId: number }): JSX.Element {
  const socket = useSocket();
  const drawingBoardEmitter = drawingBoardEmitterFactory(socket, prop.roomId);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPainting, setIsPainting] = useState(false);
  const [drawState, setDrawState] = useState({
    startX: 0,
    startY: 0,
  });
  const [styling, _setStyling] = useState({
    lineWidth: 5,
    color: '#222222',
  });

  const drawLine = (
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    lineWidth = 10,
    color = '#000000',
    remote = false,
  ) => {
    if (!remote) {
      drawingBoardEmitter.drawLine(startX, startY, endX, endY, lineWidth, color);
    }

    const canvas = canvasRef.current;
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

  const drawDot = (x: number, y: number, lineWidth = 10, color = '#000000', remote = false) => {
    if (!remote) {
      drawingBoardEmitter.drawDot(x, y, lineWidth, color);
    }

    const canvas = canvasRef.current;
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

  const getCanvasCoords = (x: number, y: number): { x: number; y: number } => {
    const canvas = canvasRef.current;
    if (canvas === null) {
      console.log('canvas is null');
      return { x: 0, y: 0 };
    }
    const canvasRect = canvas.getBoundingClientRect();
    return {
      x: x - canvasRect.left,
      y: y - canvasRect.top,
    };
  };

  const mouseDownHandler = useCallback(
    (e: MouseEvent) => {
      setIsPainting(true);
      const point = getCanvasCoords(e.x, e.y);
      drawDot(point.x, point.y, styling.lineWidth, styling.color);
      setDrawState({
        startX: point.x,
        startY: point.y,
      });
    },
    [setIsPainting, setDrawState, styling],
  );

  const mouseMoveHandler = useCallback(
    (e: MouseEvent) => {
      if (isPainting) {
        const point = getCanvasCoords(e.x, e.y);
        drawLine(drawState.startX, drawState.startY, point.x, point.y, styling.lineWidth, styling.color);
        setDrawState({
          startX: point.x,
          startY: point.y,
        });
      }
    },
    [isPainting, drawState, setDrawState, styling],
  );

  const mouseUpHandler = useCallback(
    (e: MouseEvent) => {
      setIsPainting(false);
    },
    [setIsPainting],
  );

  const clearCanvas = () => {
    drawClear(false);
  };
  const drawClear = (remote = false) => {
    if (!remote) {
      drawingBoardEmitter.clear();
    }

    const canvas = canvasRef.current;
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

  useEffect(() => {
    const handler = drawingBoardHandlerFactory(canvasRef.current);

    const clearListeners = handler(socket);

    return clearListeners;
  }, [canvasRef, socket]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) {
      console.log('canvas is null');
      return;
    }
    canvas.addEventListener('mousedown', mouseDownHandler);

    canvas.addEventListener('mousemove', mouseMoveHandler);

    canvas.addEventListener('mouseup', mouseUpHandler);
    canvas.addEventListener('mouseleave', mouseUpHandler);

    const context = canvas.getContext('2d');

    if (!context) {
      console.log('canvas context is null');
      return;
    }

    return () => {
      canvas.removeEventListener('mousedown', mouseDownHandler);
      canvas.removeEventListener('mousemove', mouseMoveHandler);
      canvas.removeEventListener('mouseup', mouseUpHandler);
      canvas.removeEventListener('mouseleave', mouseUpHandler);
    };
  }, [canvasRef, mouseDownHandler, mouseMoveHandler, mouseUpHandler]);
  return (
    <div className="drawingBoard">
      <canvas ref={canvasRef}></canvas>
      <button onClick={clearCanvas}>Clear</button>
    </div>
  );
}

export default DrawingBoard;
