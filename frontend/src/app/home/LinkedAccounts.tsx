import { getLinkedAccounts } from "@/lib/getLinkedAccounts";
import { SocialAccount } from "../types/socialAccount";
import { LinkedAccountRow } from "./LinkedAccountRow";

export default async function LinkedAccounts() {

    const linkedAccounts = await getLinkedAccounts();

    return (
        <>
            {linkedAccounts.length == 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                    No hay cuentas vinculadas
                </div>
            ) : (
                linkedAccounts.map((account: SocialAccount) => (
                    <LinkedAccountRow
                        key={account.id}
                        account={account}
                    />
                ))
            )}
        </>
    )
}
