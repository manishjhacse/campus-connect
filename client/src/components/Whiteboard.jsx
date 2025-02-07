import React, { useEffect, useRef, useState } from "react";
import { LuEraser } from "react-icons/lu";
const Whiteboard = ({ socket, room }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("#FFFFFF");
  const [brushSize, setBrushSize] = useState(5);
  const [isErasing, setIsErasing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 1100;
    canvas.height = 700;
    canvas.style.border = "2px solid white";

    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = color;
    ctxRef.current = ctx;

    socket.on("whiteboardSync", (data) => {
      const image = new Image();
      image.src = data;
      image.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0);
      };
    });

    return () => {
      socket.off("whiteboardSync");
    };
  }, [room, socket]);

  const startDrawing = (e) => {
    setDrawing(true);
    const ctx = ctxRef.current;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const draw = (e) => {
    if (!drawing) return;
    const ctx = ctxRef.current;
    ctx.lineWidth = isErasing ? 50 : brushSize;
    ctx.strokeStyle = isErasing ? "white" : color;
    ctx.globalCompositeOperation = isErasing ? "destination-out" : "source-over";

    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setDrawing(false);
    const canvas = canvasRef.current;
    socket.emit("whiteboardUpdate", { room, data: canvas.toDataURL() });
  };

  return (
    <div className="h-screen flex flex-col items-center w-full">
      <div className="my-2 flex gap-2">
        <button onClick={(e) => {
          setIsErasing(false)
          setColor("#FFFFFF")
        }} className="bg-white h-6 w-6 rounded-full"></button>
        <button onClick={(e) => {
          setIsErasing(false)
          setColor("#FF0000")
        }} className="bg-[#FF0000] h-6 w-6 rounded-full"></button>
        <button onClick={(e) => {
          setIsErasing(false)
          setColor(" #FFFF00")
        }} className="bg-[#FFFF00] h-6 w-6 rounded-full"></button>
        <button onClick={(e) => {
          setIsErasing(false)
          setColor("#87CEEB")
        }} className="bg-[#87CEEB] h-6 w-6 rounded-full"></button>
        <input type="range" min="2" max="20" value={brushSize} onChange={(e) => setBrushSize(e.target.value)} />
        <button className="text-white text-2xl" onClick={() => setIsErasing(true)}><LuEraser/></button>
      </div>
      <canvas className="bg-black" ref={canvasRef} onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseOut={stopDrawing} />


    </div>
  );
};

export default Whiteboard;
