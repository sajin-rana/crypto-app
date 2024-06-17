import React from "react";

function LoadingBox() {
  return <div className="h-[20px] w-[60px] skeleton rounded-[5px]"></div>;
}

const ChartLoading = ({ chartLoadingClass }: { chartLoadingClass: string }) => {
  return (
    <div className="flex flex-col h-[100%] justify-between ">
      <div className="">
        <div className="h-[30px] w-[40%] rounded-[5px] skeleton " />
        <div className="h-[42px] w-[50%] rounded-[5px] skeleton mt-[10px]" />
        <div className="h-[24px] w-[30%] rounded-[5px] skeleton mt-[10px] " />
      </div>
      <div className="flex justify-center items-center  h-[100px] ">
        <div className={chartLoadingClass} />
      </div>
      <div className="flex items-center justify-between">
        <LoadingBox />
        <LoadingBox />
        <LoadingBox />
        <LoadingBox />
        <LoadingBox />
      </div>
    </div>
  );
};

export default ChartLoading;
