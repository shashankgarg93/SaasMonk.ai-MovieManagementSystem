import React from 'react';
import router from "next/router";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 shadow-sm">
    <button className="text-xl font-bold text-gray-800" onClick={()=>router.push("/")}>MOVIECRITIC</button>
    <div>
      <button 
        className="bg-indigo-500 text-white px-4 py-2 rounded-md mr-2"
        onClick={() => router.push("/add-movie")}
      >
        Add new movie
      </button>
      <button 
        className="bg-purple-500 text-white px-4 py-2 rounded-md"
        onClick={() => router.push("/add-review")}
      >
        Add new review
      </button>
    </div>
  </header>
  );
};

export default Header;