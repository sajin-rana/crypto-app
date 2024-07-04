import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import CopyToClipboard from "react-copy-to-clipboard";
import CopyIcon from "../CopyIcon/CopyIcon";
import { selectIsDark } from "@/lib/features/cryptoSlice";

const CopyLink = ({ link, handleIsCopy }: { link: any; handleIsCopy: any }) => {
  const isDark = useSelector(selectIsDark);
  return (
    <div
      className={`py-[8px] sm:py-[16px] px-[16px] sm:px-[24px] flex gap-[8px] sm:gap-[16px] items-center rounded-[12px] ${
        isDark ? "bg-[#1E1932]" : "bg-[#ffffff] "
      }`}
    >
      <Link href={link} target="_blank">
        <p className="text-[14px] sm:text-[16px] font-[500] cursor-pointer hover:underline underline-offset-[2px]">
          {link}
        </p>
      </Link>
      <CopyToClipboard text={link} onCopy={handleIsCopy}>
        <span className="cursor-pointer">
          <CopyIcon />
        </span>
      </CopyToClipboard>
    </div>
  );
};

export default CopyLink;
