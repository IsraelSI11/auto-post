"use server";

import { LoginParams } from "../types/loginParams";

export async function registerAction({ email, password }: LoginParams) {
  const response = await fetch(`${process.env.API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Register failed");
  }

  const data = await response.json();
  return data;
}
