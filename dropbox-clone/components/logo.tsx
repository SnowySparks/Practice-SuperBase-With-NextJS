import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/images/dropbox_icon.png"
        alt="Mini Dropbox Logo"
        width={50}
        height={30}
        className="!w-8 !h-auto"
      />
      <span className="text-xl font-bold">MiniBox</span>
    </div>
  );
};

export default Logo;
