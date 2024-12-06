import oauth from 'oauth';
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';

const consumer = new oauth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  process.env.API_KEY!,
  process.env.API_SECRET!,
  '1.0A',
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/twitter/callback`,
  'HMAC-SHA1'
);

export async function GET() {
  return new Promise((resolve) => {
    consumer.getOAuthRequestToken(async (error, oauthToken, oauthTokenSecret) => {
      console.log(error)
      if (error) {
        resolve(NextResponse.json({ message: "Error" }, { status: 500 }));
      } else {
        // Guarda el token secret en un almacenamiento seguro (en este caso simulación en memoria).
        const cookieStore = await cookies();
        cookieStore.set("oauthTokenSecret", oauthTokenSecret);
        // Redirige al usuario a la URL de autorización de Twitter.
        resolve(NextResponse.redirect(`https://api.twitter.com/oauth/authorize?oauth_token=${oauthToken}`));
      }
    });
  });
}
