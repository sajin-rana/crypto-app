"use client";
import { selectIsDark } from "@/lib/features/cryptoSlice";
import { useSelector } from "react-redux";

export default function Home() {
  const isDark = useSelector(selectIsDark);
  return (
    <div
      className={`w-full  flex justify-center flex-col items-center ${
        isDark ? "bg-[#13121B]" : "bg-[rgba(255, 255, 255, 1)]"
      }`}
    >
      <div className="w-[1296px] ">
        <div className="text-white">Home</div>
      </div>
    </div>
  );
}
