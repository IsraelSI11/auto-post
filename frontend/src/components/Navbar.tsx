import Link from "next/link";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { User } from "lucide-react";

export default function Navbar() {
  const links = [
    {
      href: "/",
      text: "Home",
    },
    {
      href: "/about",
      text: "About",
    },
  ];

  return (
    <header>
      <nav className="border-b">
        <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
          <Link href="/" className="mr-6">
            <Logo />
            <span className="sr-only"> </span>
          </Link>
          <div className="flex items-center justify-center flex-1 space-x-4">
            {links.map((link) => (
              <Button key={link.text} variant="ghost" asChild>
                <Link href={link.href}>{link.text}</Link>
              </Button>
            ))}
          </div>
          <Button variant="ghost" size="icon" className="ml-auto">
            <User className="h-5 w-5" />
            <span className="sr-only">User account</span>
          </Button>
        </div>
      </nav>
    </header>
  );
}
