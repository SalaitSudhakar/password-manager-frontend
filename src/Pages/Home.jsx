import React, { useState } from "react";

const Home = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };
  return (
    <div className="flex flex-col items-center justify-center gap-3 ">
      <div className="flex items-center justify-center font-bold ">Home</div>
      <p> Count: {count}</p>
      <button
        onClick={increment}
        className="bg-teal-600 p-2 text-white rounded-full"
      >
        Increment
      </button>
    </div>
  );
};

export default Home;
