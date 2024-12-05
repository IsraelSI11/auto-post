import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-6xl h-[80vh] bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row h-full">
          {/* Left side - Login form */}
          <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
            <div className="w-full max-w-sm">
              <div className="text-left">
                <Image
                  src="/logo.svg"
                  alt="App logo"
                  width={60}
                  height={60}
                  aria-hidden="true"
                />
                <h1 className="text-4xl font-bold mt-5 mb-3">Comienza</h1>
                <p className="text-muted-foreground">
                  Bienvenido a la app para automatizar posts
                </p>
                <Separator className="mt-9 mb-7" />
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-muted-foreground font-medium" htmlFor="email">
                    Correo electrónico
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="example@hotmail.com"
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-muted-foreground font-medium" htmlFor="password">
                    Contraseña
                  </label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="********"
                    required 
                  />
                </div>

                <Button className="w-full bg-gradient-to-r from-yinmn-blue to-air-superiority-blue hover:bg-blue-700 text-white rounded-xl">
                  Iniciar sesión
                </Button>
              </div>

              <div className="text-center text-sm mt-7">
                ¿No tienes cuenta?{" "}
                <Link
                  href="/register"
                  className="font-bold text-yinmn-blue hover:underline"
                >
                  Regístrate
                </Link>
              </div>
            </div>
          </div>

          {/* Right side - Hero content */}
          <div className="hidden lg:flex bg-gradient-to-br from-yinmn-blue to-air-superiority-blue relative text-white">
            <div className="flex flex-col justify-between h-full">
              <div className="max-w-md p-12">
                <h2 className="text-5xl tracking-wide font-bold mb-6">
                  Publica Sin Límites
                </h2>
                <p className="text-blue-50 leading-7 text-xl">
                  Nuestra app te ayuda a programar y automatizar publicaciones
                  para que mantengas tu presencia en redes sociales sin
                  complicaciones.
                </p>
              </div>
              <div className="absolute right-0 bottom-0">
                <Image
                  src="/shuriken.svg"
                  alt="Decorative shape"
                  width={400}
                  height={400}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
