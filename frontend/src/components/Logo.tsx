import Image from "next/image";

interface LogoProps {
    width?: number;
    height?: number;
}

export default function Logo({ width = 60, height = 60 }: LogoProps) {
  return (
    <Image
      src="/logo.svg"
      alt="App logo"
      width={width}
      height={height}
      aria-hidden="true"
    />
  );
}
