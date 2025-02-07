import React, { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";

const CodeEditor = ({ socket, room }) => {
  const [code, setCode] = useState("// Write your code here...");

  useEffect(() => {
    socket.on("codeSync", (newCode) => {
      setCode(newCode);
    });

    return () => {
      socket.off("codeSync");
    };
  }, [socket]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    socket.emit("codeChange", { room, code: newCode });
  };

  return (
    <div className="">
      <Editor height="100vh" language="javascript" theme="vs-dark" value={code} onChange={handleCodeChange} />
    </div>
  );
};

export default CodeEditor;
