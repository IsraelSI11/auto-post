"use server";

import { cookies } from "next/headers";

export async function generateTweetAction(textToGenerate : string) {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value ?? "";
  const response = await fetch(`${process.env.API_URL}/generate/`, {
    method: "POST",
    headers: {
      Authorization: `${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: textToGenerate }),
  });

  if (!response.ok) {
    throw new Error("Generation failed");
  }
  console.log(response)
  const data = await response.json();
  console.log(data)
  return data;
}
