"use server";

import { LinkAccountParams } from "../app/types/linkAccountParams";

export async function linkAccount({
  jwt,
  oauth_secret,
}: LinkAccountParams) {
  const response = await fetch(`${process.env.API_URL}/link`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${jwt}`,
    },
    body: JSON.stringify({ oauth_secret }),
  });

  if (!response.ok) {
    throw new Error("Link account failed");
  }

  const data = await response.json();
  return data;
}
