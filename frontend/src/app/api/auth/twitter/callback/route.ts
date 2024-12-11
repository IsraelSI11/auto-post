import { linkAccount } from "@/lib/linkAccount";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { message: "No authorization code provided" },
      { status: 400 }
    );
  }

  const cookieStore = await cookies();
  const codeVerifier = cookieStore.get("codeVerifier")?.value || "";

  if (!codeVerifier) {
    return NextResponse.json(
      { message: "Missing code verifier" },
      { status: 400 }
    );
  }

  // Codifica client_id y client_secret en base64
  const clientId = process.env.CLIENT_ID!;
  const clientSecret = process.env.CLIENT_SECRET!;
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  // Realiza el intercambio del authorization_code por el access_token
  const response = await fetch("https://api.x.com/2/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Basic ${basicAuth}`,
    },
    body: new URLSearchParams({
      code,
      grant_type: "authorization_code",
      redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/twitter/callback`,
      code_verifier: codeVerifier,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Response Error:", response.status, errorData);

    return NextResponse.json(
      { message: "Authentication failed", error: errorData },
      { status: response.status }
    );
  }

  const data = await response.json();
  console.log("Response Data:", data);

  const { access_token } = data;

  linkAccount({ jwt: cookieStore.get("jwt")!.value, access_token:access_token });

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/home`);
}
