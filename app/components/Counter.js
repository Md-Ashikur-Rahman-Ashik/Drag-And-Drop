"use client";
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Increase the count</button>
      <button onClick={() => setCount(count - 1)}>Decrease the count</button>
      <button onClick={() => setCount(0)}>Reset the counter</button>
    </div>
  );
}
