'use client'

import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SocialAccount } from '../../types/socialAccount'
import { deleteLinkedAccountAction } from "../../actions/deleteLinkedAccounts"

interface SocialAccountRowProps {
  account: SocialAccount
}

export function LinkedAccountRow({ account }: SocialAccountRowProps) {

  const onDeleteLinkedAccount = async () => {
    try {
      await deleteLinkedAccountAction()
      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <Image src="/x-logo.png" alt="X/Twitter logo" width={42} height={42} />
        <Image className="rounded-full" src={account.image_url} alt="Profile image" width={42} height={42} />
        <span className="ml-2 text-sm font-medium">{account.name}</span>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-10 p-0">
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
          <DropdownMenuItem onClick={onDeleteLinkedAccount}>
            Eliminar cuenta
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

