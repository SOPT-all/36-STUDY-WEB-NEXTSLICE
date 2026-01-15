'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>클릭 수: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}