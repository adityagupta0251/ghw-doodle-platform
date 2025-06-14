/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from "react";

const CanvasComponents = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      // Set canvas dimensions to match displayed size
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.lineCap = "round";
        ctx.strokeStyle = "green";
        ctx.lineWidth = 5;

        const handleMouseDown = (e: MouseEvent) => {
          isDrawing.current = true;
          const rect = canvas.getBoundingClientRect();
          lastPos.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          };
        };

        const handleMouseMove = (e: MouseEvent) => {
          if (!isDrawing.current) return;

          const rect = canvas.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          ctx.beginPath();
          ctx.moveTo(lastPos.current.x, lastPos.current.y);
          ctx.lineTo(x, y);
          ctx.stroke();
          lastPos.current = { x, y };
        };

        const handleMouseUp = () => {
          isDrawing.current = false;
        };

        // Attach event listeners
        canvas.addEventListener("mousedown", handleMouseDown);
        canvas.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        // Cleanup
        return () => {
          canvas.removeEventListener("mousedown", handleMouseDown);
          canvas.removeEventListener("mousemove", handleMouseMove);
          window.removeEventListener("mouseup", handleMouseUp);
        };
      }
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <canvas
        ref={canvasRef}
        id="doodleCanvas"
        style={{
          border: "2px solid black",
          borderRadius: "8px",
          cursor: "crosshair",
          backgroundColor: "white",
          width: "850px",
          height: "600px",
        }}
      >
        Your browser does not support HTML5 canvas API!
      </canvas>
    </div>
  );
};

export default CanvasComponents;
