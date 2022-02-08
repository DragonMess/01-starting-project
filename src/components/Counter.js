import React, { useEffect, useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  document.title = `The count ${count}`;

  return (
    <>
      <h1>The count is: {count}</h1>
      <button onClick={() => setCount(count + 1)}>ADD 1</button>
    </>
  );
}
