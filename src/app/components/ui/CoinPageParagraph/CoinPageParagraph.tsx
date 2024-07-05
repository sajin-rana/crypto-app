import React from "react";
import CopyLink from "../CopyLink/CopyLink";

const CoinPageParagraph = ({
  data,
  isError,
  isLoading,
  handleIsCopy,
}: {
  data: any;
  isError: any;
  handleIsCopy: any;
  isLoading: boolean;
}) => {
  const blockchainSite = data?.links.blockchain_site;
  return (
    <div className="mt-[20px] sm:mt-[0px] w-full sm:w-[700px]  ">
      <p className="text-[12px] sm:text-[14px] leading-[21px] font-[400] max-h-[320px] overflow-scroll noScrollbar ">
        {data?.description?.en.replace(/(<a[^>]+?>|<a>|<\/a>)/gim, "")}
      </p>
      <div className="flex items-center gap-[8px] mt-[20px] flex-wrap">
        {blockchainSite?.slice(0, 3).map((item: string) => (
          <CopyLink
            key={item}
            link={item}
            isError={isError}
            isLoading={isLoading}
            handleIsCopy={handleIsCopy}
          />
        ))}
      </div>
    </div>
  );
};

export default CoinPageParagraph;
