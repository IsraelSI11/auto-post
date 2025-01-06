"use server";

import { cookies } from "next/headers";

export async function editTweetAction(job_id : string, text: string) {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value ?? "";
  const response = await fetch(`${process.env.API_URL}/post/${job_id}`, {
    method: "PUT",
    headers: {
      Authorization: `${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: text }),
  });
  if (!response.ok) {
    throw new Error("Update failed");
  }

  const data = await response.json();
  return data;
}
