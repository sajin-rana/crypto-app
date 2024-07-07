import React from "react";

const Modal = ({ children }: { children: any }) => {
  return (
    <div className="top-0 left-0 z-10 bg-[#26243752] bg-opacity-65 backdrop-blur-[2px] fixed h-full w-full">
      {children}
    </div>
  );
};

export default Modal;
