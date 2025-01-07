import { Suspense } from "react";
import LoginTwitterButton from "./LoginTwitterButton";
import LinkedAccounts from "./LinkedAccounts";
import { Loading } from "@/components/Loading";

export default function HomePage() {

  return (
    <div className="bg-[#F8F9FA] min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center flex-wrap md:flex-nowrap justify-center text-center md:text-left space-y-3 md:space-y-0 md:justify-between mb-6">
          <h1 className="text-5xl font-bold">Vincular cuenta</h1>
          <LoginTwitterButton />
        </div>

        <Suspense fallback={<Loading text="Cargando cuenta vinculada..." />}>
          <LinkedAccounts />
        </Suspense>
      </div>
    </div>
  );
}
