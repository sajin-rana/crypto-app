import React from "react";

const ConvertorBoxHeading = ({
  isDark,
  headingText,
}: {
  isDark: boolean;
  headingText: string;
}) => {
  return (
    <p
      className={` text-[12px] sm:text-[14px] font-[400] ${
        isDark ? "text-[#d1d1d6]" : "text-[#181825]"
      }`}
    >
      {headingText}
    </p>
  );
};

export default ConvertorBoxHeading;
