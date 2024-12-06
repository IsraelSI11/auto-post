'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { SocialAccount } from '../types/socialAccount';
import { LinkedAccountRow } from './LinkedAccountRow';


export default function HomePage() {
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await fetch("/api/social-accounts");
      const data = await response.json();
      setAccounts(data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setAccounts(accounts.filter((account) => account.id !== id));
    // Add your delete API call here
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Redes sociales</h1>
          <Button className="bg-[#2C5784] hover:bg-[#234569] text-white">
            Vincular red
          </Button>
        </div>

        <div className="space-y-3">
          {isLoading ? (
            <div className="text-center py-4">Cargando...</div>
          ) : accounts.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No hay cuentas vinculadas
            </div>
          ) : (
            accounts.map((account) => (
              <LinkedAccountRow
                key={account.id}
                account={account}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
