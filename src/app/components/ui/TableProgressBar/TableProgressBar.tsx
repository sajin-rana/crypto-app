import React from "react";

const TableProgressBar = ({
  percentage,
  color,
}: {
  percentage: number;
  color: string;
}) => {
  return (
    <div className="relative w-[228px] ">
      <div
        className="absolute top-0 left-0 h-[6px] w-full rounded-[2px] opacity-50"
        style={{ background: color }}
      />
      <div
        className="absolute top-0 left-0 h-[6px] rounded-[2px] opacity-100"
        style={{ width: `${percentage}%`, background: color }}
      />
    </div>
  );
};

export default TableProgressBar;
