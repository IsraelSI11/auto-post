import { LinkAccountParams } from "../app/types/linkAccountParams";

export async function linkAccount({
  jwt,
  access_token,
}: LinkAccountParams) {
  const response = await fetch(`${process.env.API_URL}/link/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${jwt}`,
    },
    body: JSON.stringify({access_token:access_token }),
  });

  if (!response.ok) {
    throw new Error("Link account failed");
  }

  const data = await response.json();
  return data;
}
