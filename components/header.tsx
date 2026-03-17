import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur w-full border-b border-text bg-primary py-2 px-6 md:px-12">
      <nav className="container flex justify-between h-16 max-w-7xl items-center">
        <div className="ml-6 text-white ">
          <h1 className="space-x-2 font-bold font-space-grotesk text-lg ">
            ArchitR
          </h1>
        </div>
        <Link href="#upload-section">
          <Button variant={"secondary"} size={"lg"}>
            Analyze your data
          </Button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
