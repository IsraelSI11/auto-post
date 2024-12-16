import { getAccountInfo } from "@/lib/getAccountInfo";
import { LinkedAccountRow } from "./LinkedAccountRow";

export default async function LinkedAccounts() {
  const linkedAccount = await getAccountInfo();

  if (linkedAccount) {
    return <LinkedAccountRow account={linkedAccount} />;
  }else{
    return <div className="text-center py-4 text-muted-foreground">No hay cuentas vinculadas</div>;
  }
}
