import { Suspense } from "react";
import LoginTwitterButton from "./LoginTwitterButton";
import LinkedAccounts from "./LinkedAccounts";

export default function HomePage() {
  //const [accounts, setAccounts] = useState<SocialAccount[]>([]);

  return (
    <div className="bg-[#F8F9FA] min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center flex-wrap md:flex-nowrap justify-center text-center md:text-left space-y-3 md:space-y-0 md:justify-between mb-6">
          <h1 className="text-5xl font-bold">Redes sociales</h1>
          <LoginTwitterButton />
        </div>

        <Suspense fallback={<div>Cargando...</div>}>
          <LinkedAccounts />
        </Suspense>
      </div>
    </div>
  );
}
