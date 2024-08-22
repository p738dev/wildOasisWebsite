"use client";
import React, { useState } from "react";

const Counter = ({ users }) => {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
};

export default Counter;
