import Image from "next/image";

interface LogoProps {
  className?: string
}

export default function Logo({ className }: LogoProps) {
  return (
    <Image
      src="/logo.svg"
      alt="Logo"
      width={32}
      height={32}
      className={className}
    />
  )
}
