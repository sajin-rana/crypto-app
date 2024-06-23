import React from "react";

const ConvertorBoxLine = ({ isDark }: { isDark: boolean }) => {
  return (
    <div
      className={`mt-[20px] w-[full] border-b-[1px] ${
        isDark ? "border-[#FFFFFF] " : "border-[#353570]"
      }`}
    />
  );
};

export default ConvertorBoxLine;
