import React from "react";

const Footer = () => {
  return (
    <div className="bg-black border-t border-[#fafafa] text-white text-center p-8 md:p-12">
      <ul className="flex flex-col md:flex-row gap-4">
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
