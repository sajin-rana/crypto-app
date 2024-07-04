import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWindowWidth } from "@/app/customHook/CustomHook";

const HomePortifolio = ({ isDark }: { isDark: boolean }) => {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 1107;
  const isHome = usePathname() === "/";
  const isPortfolio = usePathname() === "/portfolio";

  const isOtherPage = !isHome && !isPortfolio ? "hidden" : "";

  const darkHomeSelected = isHome ? "text-[#ffff]" : "text-[#FFFFFF80]";
  const lightHomeSelected = isHome ? "text-[#353570]" : "text-[#9A9AB9]";

  const darkPortfolioSelected = isPortfolio
    ? "text-[#ffff]"
    : "text-[#FFFFFF80]";
  const lightPortfolioSelected = isPortfolio
    ? "text-[#353570]"
    : "text-[#9A9AB9]";

  const homeColor = isDark ? darkHomeSelected : lightHomeSelected;

  const portfolioColor = isDark
    ? darkPortfolioSelected
    : lightPortfolioSelected;

  const mobileDarkHomeSelected = isHome ? "darkGlowBackground" : "bg-[#232337]";
  const mobileLightHomeSelected = isHome
    ? " lightGlowBackground"
    : " bg-[#ffffff]";
  const mobileDarkPortfolioSelected = isPortfolio
    ? "darkGlowBackground"
    : "bg-[#232337]";
  const mobileLightPortfolioSelected = isPortfolio
    ? "lightGlowBackground"
    : "bg-[#ffffff]";

  const mobileHomeBackground = isDark
    ? mobileDarkHomeSelected
    : mobileLightHomeSelected;
  const mobilePortfolioBackground = isDark
    ? mobileDarkPortfolioSelected
    : mobileLightPortfolioSelected;

  return (
    <div
      className={`flex gap-[10px] sm:gap-[0px] p-[4px] rounded-[6px]  ${
        isDark ? "sm:bg-[#13121B] bg-[#191926]" : "sm:bg-[#ffffff] bg-[#F2F5F9]"
      } `}
    >
      <div
        className={`flex items-center sm:gap-[24px]  ${
          isDark ? "sm:bg-[#13121B]" : "sm:bg-[#ffffff]"
        }  `}
      >
        <Link href="/">
          <div
            className={`flex items-center gap-[10px] p-[4px]  rounded-[6px] ${
              isMobile ? mobileHomeBackground : ""
            }`}
          >
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.5402 6.81969L14.7802 2.78969C13.2102 1.68969 10.8002 1.74969 9.29023 2.91969L4.28023 6.82969C3.28023 7.60969 2.49023 9.20969 2.49023 10.4697V17.3697C2.49023 19.9197 4.56023 21.9997 7.11023 21.9997H17.8902C20.4402 21.9997 22.5102 19.9297 22.5102 17.3797V10.5997C22.5102 9.24969 21.6402 7.58969 20.5402 6.81969ZM13.2502 17.9997C13.2502 18.4097 12.9102 18.7497 12.5002 18.7497C12.0902 18.7497 11.7502 18.4097 11.7502 17.9997V14.9997C11.7502 14.5897 12.0902 14.2497 12.5002 14.2497C12.9102 14.2497 13.2502 14.5897 13.2502 14.9997V17.9997Z"
                fill={homeColor.slice(6, homeColor.length - 1)}
              />
            </svg>
            <p
              className={`sm:w-500 w-[400] sm:text-[16px] text-[14px] sm:block m-0 ${
                isHome ? "hidden" : ""
              } ${isOtherPage} ${homeColor}`}
            >
              Home
            </p>
          </div>
        </Link>
        <Link href="/portfolio">
          <div
            className={`flex items-center gap-[10px] p-[4px] rounded-[6px] ${
              isMobile ? mobilePortfolioBackground : ""
            }`}
          >
            <svg
              width="21"
              height="22"
              viewBox="0 0 21 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.5 11L10.5 17L1.5 11M19.5 15L10.5 21L1.5 15M19.5 7L10.5 13L1.5 7L10.5 1L19.5 7Z"
                stroke={portfolioColor.slice(6, portfolioColor.length - 1)}
              />
            </svg>
            <p
              className={`sm:w-500 w-[400] sm:text-[16px] text-[14px] m-0 sm:block  ${
                isPortfolio ? "hidden" : ""
              }  ${isOtherPage} ${portfolioColor}`}
            >
              Portfolio
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePortifolio;
