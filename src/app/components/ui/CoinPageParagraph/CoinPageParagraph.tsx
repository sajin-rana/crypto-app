import React from "react";
import CopyLink from "../CopyLink/CopyLink";

const CoinPageParagraph = ({
  data,
  handleIsCopy,
}: {
  data: any;
  handleIsCopy: any;
}) => {
  const blockchainSite = data?.links.blockchain_site;
  return (
    <div className="w-[700px]  ">
      <p className="text-[14px] leading-[21px] font-[400] max-h-[320px] overflow-scroll ">
        {data?.description?.en.replace(/(<a[^>]+?>|<a>|<\/a>)/gim, "")}
      </p>
      <div className="flex items-center gap-[8px] mt-[20px] flex-wrap">
        {blockchainSite?.slice(0, 3).map((item: string) => (
          <CopyLink key={item} link={item} handleIsCopy={handleIsCopy} />
        ))}
      </div>
    </div>
  );
};

export default CoinPageParagraph;
