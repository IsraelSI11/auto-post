/* eslint-disable @typescript-eslint/no-explicit-any */
import oauth from "oauth";
import { cookies } from "next/headers";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

const consumer = new oauth.OAuth(
  "https://api.twitter.com/oauth/request_token",
  "https://api.twitter.com/oauth/access_token",
  process.env.API_KEY!,
  process.env.API_SECRET!,
  "1.0A",
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/twitter/callback`,
  "HMAC-SHA1",
);

export async function GET(req: NextRequest, res: NextApiResponse) {
  const { searchParams } = new URL(req.url)
  const oauth_token = searchParams.get("oauth_token");
  const oauth_verifier = searchParams.get("oauth_verifier");

  if (!oauth_token || !oauth_verifier) {
    return res
      .status(400)
      .json({ error: "Missing oauth_token or oauth_verifier" });
  }

  const cookieStore = await cookies();
  const oauthTokenSecret = cookieStore.get("oauthTokenSecret")?.value;

  if (!oauthTokenSecret) {
    return res.status(400).json({ error: "Invalid or expired oauth_token" });
  }

  return new Promise((resolve) => {
    consumer.getOAuthAccessToken(
      oauth_token,
      oauthTokenSecret,
      oauth_verifier,
      (error, oauthAccessToken, oauthAccessTokenSecret, results) => {
        if (error) {
          resolve(NextResponse.json({ message: "Error" }, { status: 500 }));
        } else {
          console.log("results", results);
          console.log("oauthAccessTokenSecret", oauthAccessTokenSecret);
          // Aquí puedes almacenar los tokens del usuario en tu base de datos.
          // Por ejemplo:
          // saveUserTokens(userId, oauthAccessToken, oauthAccessTokenSecret);

          // Devuelve los datos necesarios o redirige al usuario.
          resolve(NextResponse.redirect(`http://localhost:3000/home?token=${oauthAccessToken}`));
        }
      },
    );
  });
}
