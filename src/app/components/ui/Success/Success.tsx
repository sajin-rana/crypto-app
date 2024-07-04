import React from "react";

const Success = ({ className, text }: { className: string; text: string }) => {
  return (
    <div
      className={`fixed flex items-center gap-[8px] py-[12px] px-[16px] sm:py-[18px] sm:px-[22px]  success ${className} `}
    >
      <span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 0C4.49 0 0 4.49 0 10C0 15.51 4.49 20 10 20C15.51 20 20 15.51 20 10C20 4.49 15.51 0 10 0ZM14.78 7.7L9.11 13.37C8.97 13.51 8.78 13.59 8.58 13.59C8.38 13.59 8.19 13.51 8.05 13.37L5.22 10.54C4.93 10.25 4.93 9.77 5.22 9.48C5.51 9.19 5.99 9.19 6.28 9.48L8.58 11.78L13.72 6.64C14.01 6.35 14.49 6.35 14.78 6.64C15.07 6.93 15.07 7.4 14.78 7.7Z"
            fill="white"
          />
        </svg>
      </span>
      <p className="text-[14px] sm:text-[16px] font-[500] text-[white]">
        {text}
      </p>
    </div>
  );
};

export default Success;
