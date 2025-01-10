import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      <header className="p-6 flex justify-between items-center">
        <Image
          src="/logo.svg"
          alt="Logo de la aplicación"
          width={60}
          height={60}
        />
        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <Link href="#features" className="hover:underline">
                Características
              </Link>
            </li>
            <li>
              <Link href="#interface" className="hover:underline">
                Interfaz
              </Link>
            </li>
            <li>
              <Button
                asChild
                size="lg"
                className="bg-air-superiority-blue text-white hover:bg-yinmn-blue p-2"
              >
                <Link href="/login" className="hover:underline">
                  Iniciar sesión
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex flex-col gap-16 items-center px-8 py-12 sm:px-20 bg-[#F8F9FA]">
        {/* Sección de Héroe */}
        <section className="text-center max-w-7xl w-full flex flex-col md:flex-row items-center gap-16 py-16">
          <div className="flex-1 space-y-8">
            <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
              Programa{" "}
              <span className="text-air-superiority-blue font-semibold">
                Tweets
              </span>{" "}
              en X<br />
              Impulsados con{" "}
              <span className="text-air-superiority-blue font-semibold">
                IA
              </span>
            </h1>
            <p className="text-2xl mb-12 max-w-2xl mx-auto">
              Automatiza tu presencia en X con programación inteligente y tweets
              generados por IA. Impulsa tu marca y{" "}
              <span className="text-air-superiority-blue font-semibold">
                conéctate
              </span>{" "}
              con tu audiencia sin complicaciones.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-air-superiority-blue text-white hover:bg-yinmn-blue text-xl py-6 px-10"
            >
              <Link href="/register">Comienza gratis</Link>
            </Button>
          </div>
          <div className="flex-1 relative">
            <Image
              src="/laptop.png"
              alt="Interfaz de calendario en laptop"
              width={700}
              height={467}
              className="w-full h-auto rounded-lg"
              priority
            />
          </div>
        </section>

        {/* Sección de Características */}
        <section
          id="features"
          className="grid sm:grid-cols-2 gap-8 w-full max-w-4xl"
        >
          <h2 className="col-span-2 text-4xl font-bold text-center mb-12">
            ¿Por qué utilizar Auto Post?
          </h2>

          <div className="bg-air-superiority-blue/10 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">
              Generación de Tweets por IA
            </h3>
            <p>
              Deja que nuestra avanzada IA cree tweets atractivos adaptados a la
              voz de tu marca y las preferencias de tu audiencia.
            </p>
          </div>

          <div className="bg-air-superiority-blue/10 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">
              Organiza tus publicaciones
            </h3>
            <p>
              Crea un calendario de publicaciones para mantener una presencia
              constante en X sin esfuerzo.
            </p>
          </div>
        </section>

        {/* Nueva Sección de Interfaz */}
        <section id="interface" className="w-full max-w-4xl">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Una interfaz poderosa y fácil de usar
          </h2>
          <div className="grid gap-12">
            <div className="bg-air-superiority-blue/10 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">
                Organiza tus publicaciones
              </h3>
              <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] w-full rounded-lg overflow-hidden">
                <Image
                  src="/calendar.png"
                  alt="Interfaz del calendario de programación"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="bg-air-superiority-blue/10 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">
                Generador de Tweets con IA
              </h3>
              <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] w-full rounded-lg overflow-hidden">
                <Image
                  src="/ai.png"
                  alt="Interfaz del generador de tweets"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="p-6 flex gap-6 flex-wrap items-center justify-center border-t border-white/20">
        <p>
          &copy; 2025 Programador de Publicaciones en X. Todos los derechos
          reservados.
        </p>
      </footer>
    </div>
  );
}
