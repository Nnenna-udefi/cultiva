import React from "react";

const Footer = () => {
  return (
    <div className="bg-foreground border-t text-sm border-[#fafafa] text-white flex justify-center items-center flex-col text-center p-8">
      <ul className="flex flex-col md:flex-row gap-4 md:gap-6">
        <li>Terms of Service</li>
        <li>Privacy Policy</li>
      </ul>
      <div className="pt-4 md:pt-10 md:pb-6 pb-2 text-center text-sm">
        © 2026 Cultiva. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
