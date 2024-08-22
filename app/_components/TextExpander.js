"use client";
import React, { useState } from "react";

const TextExpander = ({ children }) => {
  const [isOpenText, setIsOpenText] = useState(false);
  const displayText =
    typeof children === "string"
      ? isOpenText
        ? children
        : children.split("").slice(0, 3).join("") + "..."
      : children;

  return (
    <span>
      {displayText}{" "}
      <button
        className="text-primary-700 border-b border-primary-700 leading-3 pb-1"
        onClick={() => setIsOpenText(!isOpenText)}
      >
        {isOpenText ? "Pokaż mniej" : "Pokaż więcej"}
      </button>
    </span>
  );
};

export default TextExpander;
