"use server";

import { cookies } from "next/headers";

export async function getPostsOfUser() {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value ?? "";
  const response = await fetch(`${process.env.API_URL}/post/`, {
    method: "GET",
    headers: {
      Authorization: `${jwt}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Error al obtener los posts");
  }

  const data = await response.json();
  return data;
}
