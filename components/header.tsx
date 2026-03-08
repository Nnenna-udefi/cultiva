import React from "react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur w-full border-b border-text bg-primary">
      <nav className="container flex h-16 max-w-7xl items-center">
        <div className="ml-6 text-white  px-4 py-2 rounded-md">
          <h1 className="space-x-2 font-bold font-space-grotesk text-lg italic">
            Cultiva
          </h1>
        </div>
      </nav>
    </header>
  );
};

export default Header;
