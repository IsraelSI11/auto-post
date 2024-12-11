import crypto from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const CLIENT_ID = process.env.CLIENT_ID; // Obtenido desde el portal de desarrolladores
//const CLIENT_SECRET = process.env.TWITTER_CLIENT_SECRET; // Obtenido desde el portal de desarrolladores
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/twitter/callback`; // Tu URI de redirección
const SCOPE = "tweet.read tweet.write users.read"; // Permisos necesarios

// Función para generar el code_challenge (PKCE)
function generatePKCE() {
  const codeVerifier = crypto.randomBytes(32).toString("hex"); // Genera el code_verifier
  const hash = crypto
    .createHash("sha256")
    .update(codeVerifier)
    .digest("base64url"); // Aplica SHA-256 y convierte a base64url
  return { codeVerifier, codeChallenge: hash };
}

export async function GET() {
  // Genera PKCE
  const { codeVerifier, codeChallenge } = generatePKCE();

  // Guarda el code_verifier en una cookie segura para usarlo luego en la verificación
  const cookieStore = await cookies();
  cookieStore.set("codeVerifier", codeVerifier, {
    httpOnly: true,
    secure: true,
  });

  // Construye la URL de autorización de Twitter OAuth 2.0
  const authUrl =
    `https://twitter.com/i/oauth2/authorize?` +
    `response_type=code&` +
    `client_id=${CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
    `scope=${encodeURIComponent(SCOPE)}&` +
    `state=${crypto.randomBytes(16).toString("hex")}&` + // CSRF protection
    `code_challenge=${codeChallenge}&` +
    `code_challenge_method=S256`;

  // Redirige al usuario a la página de autorización de Twitter
  return NextResponse.redirect(authUrl);
}
