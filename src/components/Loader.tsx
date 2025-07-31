import React from "react";
import logo from "../assets/Images/logo.png";

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <img
        src={logo}
        alt="Loading..."
        className="w-24 h-24 animate-pulse"
      />
    </div>
  );
};

export default Loader;
