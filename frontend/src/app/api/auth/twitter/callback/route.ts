/* eslint-disable @typescript-eslint/no-explicit-any */
import oauth from "oauth";
import { cookies } from "next/headers";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { linkAccount } from "@/lib/linkAccount";

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
      async (error, oauthAccessTokenSecret, results) => {
        if (error) {
          console.error("OAuth Access Token Error:", error);
          return resolve(NextResponse.json({ message: "Error" }, { status: 500 }));
        }

        try {
          console.log("results", results);
          console.log("oauthAccessTokenSecret", oauthAccessTokenSecret);

          const jwt = cookieStore.get("jwt")?.value ?? "";
          if (!jwt) {
            return resolve(NextResponse.json({ message: "JWT not found" }, { status: 400 }));
          }

          await linkAccount({ jwt, oauth_secret: oauthAccessTokenSecret });

          return resolve(NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/home`));
        } catch (err) {
          console.error("Link Account Error:", err);
          return resolve(NextResponse.json({ message: "Internal Server Error" }, { status: 500 }));
        }
      },
    );
  });
}
