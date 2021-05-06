import { useEffect, useRef, useState } from 'react';

function DrawingBoard(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawState, setDrawState] = useState({
    isMouseDown: false,
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    lineWidth: 5,
    color: '#222222',
  });

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) {
      console.log('canvas is null');
      return;
    }
    const canvasRect = canvas.getBoundingClientRect();
    const { left: canvasX, top: canvasY } = canvasRect;

    canvas.onmousedown = (e: MouseEvent) => {
      console.log(canvasX, canvasY, e.x, e.y);
      if (!drawState.isMouseDown) {
        setDrawState({
          isMouseDown: true,
          startX: e.x - canvasX,
          startY: e.y - canvasY,
          lineWidth: drawState.lineWidth,
          color: drawState.color,
          endX: drawState.endX,
          endY: drawState.endY,
        });
      }
    };

    canvas.onmousemove = (e: MouseEvent) => {
      if (drawState.isMouseDown) {
        drawLine(
          drawState.startX,
          drawState.startY,
          e.x - canvasX,
          e.y - canvasY,
          drawState.lineWidth,
          drawState.color,
        );
        setDrawState({
          isMouseDown: drawState.isMouseDown,
          startX: e.x - canvasX,
          startY: e.y - canvasY,
          lineWidth: drawState.lineWidth,
          color: drawState.color,
          endX: e.x - canvasX,
          endY: e.y - canvasY,
        });
      }
    };

    canvas.onmouseup = (e: MouseEvent) => {
      console.log('onMouseUp', drawState);
      if (drawState.isMouseDown) {
        setDrawState({
          isMouseDown: false,
          startX: drawState.startX,
          startY: drawState.startY,
          lineWidth: drawState.lineWidth,
          color: drawState.color,
          endX: e.x - canvasX,
          endY: e.y - canvasY,
        });
      }
    };

    const context = canvas.getContext('2d');

    if (!context) {
      console.log('canvas context is null');
      return;
    }

    context.fillStyle = '#ffcc00';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, [canvasRef]);
  return (
    <div className="drawingBoard">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default DrawingBoard;
