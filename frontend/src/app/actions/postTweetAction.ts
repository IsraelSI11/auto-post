"use server";

import { cookies } from "next/headers";
import { PostParams } from "../types/postParams";

export async function postTweetAction({ text, date }: PostParams) {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value ?? "";
  const response = await fetch(`${process.env.API_URL}/post/`, {
    method: "POST",
    headers: {
      Authorization: `${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text:text, date:date }),
  });
  console.log(response)
  if (!response.ok) {
    throw new Error("Post failed");
  }

  const data = await response.json();
  console.log(data)
  return data;
}
