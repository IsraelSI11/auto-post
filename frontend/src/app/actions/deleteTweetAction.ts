"use server";

import { cookies } from "next/headers";

export async function deleteTweetAction(job_id : string) {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value ?? "";
  const response = await fetch(`${process.env.API_URL}/post/${job_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `${jwt}`,
      "Content-Type": "application/json",
    },
  });
  console.log(response)
  if (!response.ok) {
    throw new Error("Delete failed");
  }

  const data = await response.json();
  return data;
}
