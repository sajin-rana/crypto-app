"use client";
import Head from "next/head";
import dynamic from "next/dynamic";
const PortfolioPage = dynamic(
  () => import("../components/ui/PortfolioPage/PortfolioPage"),
  { ssr: false }
);

function Portfolio() {
  return (
    <div className="mt-[40px] min-h-[80vh]">
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
