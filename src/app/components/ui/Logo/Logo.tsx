import React from "react";
import Link from "next/link";
import Image from "next/image";
import darkLogo from "../../../assets/Logo.svg";
import lightLogo from "../../../assets/LightLogo.svg";

const Logo = ({ isDark }: { isDark: boolean }) => {
  return (
    <Link href="/">
      <Image src={isDark ? darkLogo : lightLogo} alt="logo" />
    </Link>
  );
};

export default Logo;
