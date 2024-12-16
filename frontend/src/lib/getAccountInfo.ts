import { cookies } from "next/headers";

export async function getAccountInfo() {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value ?? "";

  const response = await fetch(`${process.env.API_URL}/link/`, {
    method: "GET",
    headers: {
      Authorization: `${jwt}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch linked accounts");
  }

  const data = await response.json();
  return data;
}
