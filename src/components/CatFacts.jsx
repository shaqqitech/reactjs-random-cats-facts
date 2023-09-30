import React, { useState, useEffect } from "react";
import { VscRefresh } from "react-icons/vsc";

const CatFacts = () => {
  const [fact, setFact] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchCatFact();
  }, []);

  const fetchCatFact = async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch("https://catfact.ninja/fact");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setFact(data.fact);
    } catch (error) {
      console.error("Error fetching cat fact:", error);
    }

    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <>
      <main className="min-h-screen w-screen bg-gray-900 flex justify-center items-center flex-col ">
        <div className="w-96 h-full space-y-6  flex justify-center items-center flex-col text-white">
          <h1 className="font-bold text-3xl lg:text-4xl text-green-500">
            Cats Facts
          </h1>
          <div className=" relative flex justify-center items-center flex-col">
            <p className="w-60 md:w-72 lg:w-96 h-full ring-2 ring-green-500 px-8 py-10 bg-gray-800 rounded-xl text-center">
              {fact}
            </p>
            <button
              className={`bg-green-500 hover:bg-green-600 px-3 py-1 rounded-full text-white font-bold absolute -bottom-5 shadow-lg shadow-green-800`}
              onClick={fetchCatFact}
            >
                 {isRefreshing ? 'Clicked' : 'Click Me'}
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default CatFacts;
