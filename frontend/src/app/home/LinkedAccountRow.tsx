'use client'

import { Twitter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SocialAccount } from '../types/socialAccount'

interface SocialAccountRowProps {
  account: SocialAccount
}

export function LinkedAccountRow({ account }: SocialAccountRowProps) {
  return (
    <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <Twitter className="h-5 w-5" />
        <span className="text-sm font-medium">{account.accountName}</span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 8.667a.667.667 0 1 0 0-1.334.667.667 0 0 0 0 1.334zm-4 0a.667.667 0 1 0 0-1.334.667.667 0 0 0 0 1.334zm8 0a.667.667 0 1 0 0-1.334.667.667 0 0 0 0 1.334z"
                fill="currentColor"
              />
            </svg>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            Eliminar cuenta
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

