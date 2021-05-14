import { useCallback, useEffect, useRef, useState } from 'react';
import { drawingBoardEmitterFactory } from '../../socketio/drawingBoardHandler';
import { useSocket } from '../../state/socket';

function DrawingBoard(): JSX.Element {
  const socket = useSocket();
  const drawingBoardEmitter = drawingBoardEmitterFactory(socket);
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
  const [canvasCoords, setCanvasCoords] = useState({ x: 0, y: 0 });

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
    console.log('lol drawDot', x, y);
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

  const mouseDownHandler = useCallback(
    (e: MouseEvent) => {
      setIsPainting(true);
      drawDot(e.x - canvasCoords.x, e.y - canvasCoords.y, styling.lineWidth, styling.color);
      setDrawState({
        startX: e.x - canvasCoords.x,
        startY: e.y - canvasCoords.y,
      });
    },
    [canvasCoords, setIsPainting, setDrawState],
  );

  const mouseMoveHandler = useCallback(
    (e: MouseEvent) => {
      if (isPainting) {
        drawLine(
          drawState.startX,
          drawState.startY,
          e.x - canvasCoords.x,
          e.y - canvasCoords.y,
          styling.lineWidth,
          styling.color,
        );
        setDrawState({
          startX: e.x - canvasCoords.x,
          startY: e.y - canvasCoords.y,
        });
      }
    },
    [isPainting, canvasCoords, drawState, setDrawState],
  );

  const mouseUpHandler = useCallback(
    (e: MouseEvent) => {
      setIsPainting(false);
    },
    [canvasCoords, setIsPainting],
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
    const windowResizeHandler = () => {
      const canvas = canvasRef.current;
      if (canvas === null) {
        console.log('canvas is null');
        return;
      }
      const canvasRect = canvas.getBoundingClientRect();
      setCanvasCoords({ x: canvasRect.left, y: canvasRect.top });
    };
    window.addEventListener('resize', windowResizeHandler);

    return () => window.removeEventListener('resize', windowResizeHandler);
  }, []);

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
