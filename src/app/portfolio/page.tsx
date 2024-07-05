"use client";
import Head from "next/head";
import dynamic from "next/dynamic";
const PortfolioPage = dynamic(
  () => import("../components/ui/PortfolioPage/PortfolioPage"),
  { ssr: false }
);

function Portfolio() {
  return (
    <div className="my-[20px] sm:my-[40px] min-h-[90vh] sm:min-h-[80vh]">
      <Head>
        <title>Crypto App</title>
        <meta name="description" content="Crypto App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PortfolioPage />
    </div>
  );
}
export default Portfolio;
