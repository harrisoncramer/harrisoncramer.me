import React, { useState } from 'react';

interface CounterProps {
  initialCount: number;
}

const Counter: React.FC<CounterProps> = ({ initialCount = 0 }) => {
  const [count, setCount] = useState<number>(initialCount);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <div className="gap-1 flex">
        <button className="bg-app-white text-app-black w-6 rounded-sm" onClick={decrement}>-</button>
        <button className="bg-app-white text-app-black w-6 rounded-sm" onClick={increment}>+</button>
      <p>Count: {count}</p>
      </div>
    </div>
  );
};

export default Counter;
