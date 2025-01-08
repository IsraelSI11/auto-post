"use client";

import Link from "next/link";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { redirect, usePathname } from "next/navigation";
import { logoutAction } from "@/app/actions/logoutAction";


const links = [
    { href: '/home', text: 'Vincular' },
    { href: '/create', text: 'Publicar' },
  ]
  
  export default function LoggedInNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const pathname = usePathname()
  
    const handleLogout = async () => {
      await logoutAction();
      redirect('/');
    }
  
    return (
      <header className="bg-white shadow-sm">
        <nav className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center">
              <Link href="/home" className="flex-shrink-0">
                <Logo className="size-12 w-auto" />
                <span className="sr-only">Enlace a cuentas vinculadas</span>
              </Link>
            </div>
  
            <div className="hidden md:flex items-center justify-center flex-1 space-x-4">
              {links.map((link) => (
                <Button
                  key={link.text}
                  variant="ghost"
                  asChild
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === link.href
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  <Link href={link.href}>{link.text}</Link>
                </Button>
              ))}
            </div>
  
            {/* Desktop logout button */}
            <div className="hidden md:block">
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="text-white hover:bg-destructive/90"
              >
                <span className="mr-2">Cerrar sesión</span>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
  
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
  
          {/* Mobile navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {links.map((link) => (
                  <Button
                    key={link.text}
                    variant="ghost"
                    asChild
                    className={`block w-full text-left ${
                      pathname === link.href
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link href={link.href}>{link.text}</Link>
                  </Button>
                ))}
                <Button
                  variant="destructive"
                  onClick={handleLogout}
                  className="w-full text-white hover:bg-destructive/90"
                >
                  <span className="mr-2">Cerrar sesión</span>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </nav>
      </header>
    )
  }
  
  