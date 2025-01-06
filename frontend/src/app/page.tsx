import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-gradient-to-br from-yinmn-blue to-air-superiority-blue text-white">
      <header className="p-6 flex justify-between items-center">
        <Image src="/logo.svg" alt="Logo de la aplicación" width={60} height={60} />
        <nav>
          <ul className="flex gap-6">
            <li><Link href="#features" className="hover:underline">Características</Link></li>
            <li><Link href="#testimonials" className="hover:underline">Testimonios</Link></li>
            <li><Link href="/login" className="hover:underline">Iniciar sesión</Link></li>
          </ul>
        </nav>
      </header>

      <main className="flex flex-col gap-16 items-center px-8 py-12 sm:px-20">
        {/* Sección de Héroe */}
        <section className="text-center max-w-4xl">
          <h1 className="text-5xl font-bold mb-6">Programa publicaciones en X con precisión impulsada por IA</h1>
          <p className="text-xl mb-8">Automatiza tu presencia en X con programación inteligente y tweets generados por IA. Mantente a la vanguardia sin complicaciones.</p>
          <Button asChild size="lg" className="bg-white text-yinmn-blue hover:bg-blue-50">
            <Link href="/register">Comienza gratis</Link>
          </Button>
        </section>

        {/* Sección de Características */}
        <section id="features" className="grid sm:grid-cols-2 gap-8 w-full max-w-4xl">
          <div className="bg-white/10 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Generación de Tweets por IA</h2>
            <p>Deja que nuestra avanzada IA cree tweets atractivos adaptados a la voz de tu marca y las preferencias de tu audiencia.</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Programación Inteligente</h2>
            <p>Optimiza tus tiempos de publicación con nuestro algoritmo inteligente que analiza la actividad máxima de tu audiencia.</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Panel de Análisis</h2>
            <p>Rastrea tu rendimiento con análisis e información completos para refinar tu estrategia en X.</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Soporte para Múltiples Cuentas</h2>
            <p>Gestiona múltiples cuentas de X desde un solo panel, simplificando tu flujo de trabajo en redes sociales.</p>
          </div>
        </section>

        {/* Sección de Testimonios */}
        <section id="testimonials" className="text-center max-w-2xl">
          <h2 className="text-3xl font-semibold mb-6">Lo que dicen nuestros usuarios</h2>
          <blockquote className="text-xl italic">
            &quot;Esta aplicación ha revolucionado la forma en que gestiono mi presencia en X. ¡Los tweets generados por IA son perfectos y la función de programación me ahorra horas cada semana!&quot;
          </blockquote>
          <p className="mt-4 font-semibold">- Sarah J., Gerente de Redes Sociales</p>
        </section>
      </main>

      <footer className="p-6 flex gap-6 flex-wrap items-center justify-center border-t border-white/20">
        <p>&copy; 2025 Programador de Publicaciones en X. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
