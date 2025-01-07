"use server";

import { cookies } from "next/headers";

export async function logoutAction() {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt")?.value ?? "";
    const response = await fetch(`${process.env.API_URL}/logout/`, {
      method: "POST",
      headers: {
        Authorization: `${jwt}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error al cerrar sesión");
    }

    cookieStore.delete("jwt");
  
    const data = await response.json();
    return data;
}
