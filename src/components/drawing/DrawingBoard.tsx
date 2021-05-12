import { useCallback, useEffect, useRef, useState } from 'react';

function DrawingBoard(): JSX.Element {
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

  const drawLine = (startX: number, startY: number, endX: number, endY: number, lineWidth = 10, color = '#000000') => {
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
  const mouseDownHandler = useCallback(
    (e: MouseEvent) => {
      setIsPainting(true);
      setDrawState({
        startX: e.x - canvasCoords.x,
        startY: e.y - canvasCoords.y,
      });
    },
    [setIsPainting, setDrawState],
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
    [isPainting, drawState, setDrawState],
  );

  const mouseUpHandler = useCallback(
    (e: MouseEvent) => {
      setIsPainting(false);
    },
    [setIsPainting],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) {
      console.log('canvas is null');
      return;
    }
    const canvasRect = canvas.getBoundingClientRect();
    setCanvasCoords({ x: canvasRect.left, y: canvasRect.top });

    canvas.addEventListener('mousedown', mouseDownHandler);

    canvas.addEventListener('mousemove', mouseMoveHandler);

    canvas.addEventListener('mouseup', mouseUpHandler);
    canvas.addEventListener('mouseleave', mouseUpHandler);

    const context = canvas.getContext('2d');

    if (!context) {
      console.log('canvas context is null');
      return;
    }

    context.fillStyle = '#ffcc0012';
    context.fillRect(0, 0, canvas.width, canvas.height);
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
    </div>
  );
}

export default DrawingBoard;
