"use server";

import { cookies } from "next/headers";

export async function deleteLinkedAccountAction() {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value ?? "";
  const response = await fetch(`${process.env.API_URL}/link/`, {
    method: "DELETE",
    headers: {
      Authorization: `${jwt}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Link account delete failed");
  }
  console.log(response)
  const data = await response.json();
  return data;
}
