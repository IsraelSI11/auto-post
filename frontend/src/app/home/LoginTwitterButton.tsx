'use client'

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from 'next/navigation'

export default function LoginTwitterButton() {
  const router = useRouter()

  const handleLogin = () => {
    router.push('/api/auth/twitter')
  }

  return (
    <Button 
      onClick={handleLogin}
      className="flex items-center justify-center text-white font-semibold bg-yinmn-blue hover:bg-uranian-blue hover:text-black transition duration-300"
    >
      <Image src="/x-logo.png" alt="X/Twitter logo" width={42} height={42} />
      Vincular X
    </Button>
  )
}

