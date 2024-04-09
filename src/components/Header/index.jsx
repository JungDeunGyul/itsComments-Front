import React from "react";

import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [activeButton, setActiveButton] = useState("dashboard");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <header className="flex w-full py-2 pr-4 bg-black border-2 border-solid md:pr-8 md:h-16">
      <Link
        to="/"
        className="flex items-center"
        onClick={() => handleButtonClick("dashboard")}
      >
        <span
          className={`ml-4 md:ml-8 text-${activeButton === "dashboard" ? "blue-500" : "white"} text-lg md:text-2xl font-bold py-1 px-2 md:py-2 md:px-4 rounded cursor-pointer`}
        >
          Dashboard
        </span>
      </Link>
      <span className="px-2 py-1 ml-1 mr-1 text-lg font-bold text-white rounded md:ml-2 md:mr-2 md:text-2xl md:py-2 md:px-4">
        |
      </span>
      <Link
        to="/single"
        className="flex items-center"
        onClick={() => handleButtonClick("singleView")}
      >
        <span
          className={`ml-1 md:ml-2 mr-1 md:mr-2 text-${activeButton === "singleView" ? "blue-500" : "white"} text-lg md:text-2xl font-bold py-1 px-2 md:py-2 md:px-4 rounded cursor-pointer`}
        >
          SingleView
        </span>
      </Link>
      <span className="px-2 py-1 ml-1 mr-1 text-lg font-bold text-white rounded md:ml-2 md:mr-2 md:text-2xl md:py-2 md:px-4">
        |
      </span>
      <Link
        to="/friend"
        className="flex items-center"
        onClick={() => handleButtonClick("friends")}
      >
        <span
          className={`ml-1 md:ml-2 mr-1 md:mr-2 text-${activeButton === "friends" ? "blue-500" : "white"} text-lg md:text-2xl font-bold py-1 px-2 md:py-2 md:px-4 rounded cursor-pointer`}
        >
          Friends
        </span>
      </Link>
    </header>
  );
}

export default Header;
