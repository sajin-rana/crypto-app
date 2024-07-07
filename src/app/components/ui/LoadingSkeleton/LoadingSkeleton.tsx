import React from "react";

const LoadingSkeleton = ({ style }: { style: string }) => {
  return <div className={`skeleton ${style}`} />;
};

export default LoadingSkeleton;
