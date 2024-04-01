import React, { useEffect, useRef } from "react";

const VectorCanvas = ({ vectors }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    vectors.forEach((vector) => {
      const { startX, startY, endX, endY, color, lineWidth } = vector;

      // Draw the vector line
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = color || "black";
      ctx.lineWidth = lineWidth || 1;
      ctx.stroke();

      // Calculate the angle and length of the vector
      const dx = endX - startX;
      const dy = endY - startY;
      const length = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);

      // Draw arrow
      const arrowLength = 30;
      const arrowWidth = 20;
      const arrowEndX = endX - arrowLength * Math.cos(angle);
      const arrowEndY = endY - arrowLength * Math.sin(angle);

      ctx.beginPath();
      ctx.moveTo(endX, endY);
      ctx.lineTo(
        arrowEndX + arrowWidth * Math.cos(angle - Math.PI / 6),
        arrowEndY + arrowWidth * Math.sin(angle - Math.PI / 6)
      );
      ctx.lineTo(
        arrowEndX + arrowWidth * Math.cos(angle + Math.PI / 6),
        arrowEndY + arrowWidth * Math.sin(angle + Math.PI / 6)
      );
      ctx.closePath();
      ctx.fillStyle = color || "black";
      ctx.fill();
    });
  }, [vectors]);

  return (
    <canvas
      ref={canvasRef}
      width={900}
      height={600}
      style={{ border: "2px solid black" }}
    />
  );
};

export default VectorCanvas;
