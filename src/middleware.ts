// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const base64UrlEncode = (input: Uint8Array): string => {
  const str = String.fromCharCode.apply(null, input as unknown as number[]);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

const base64UrlDecode = (input: string): Uint8Array => {
  const str = input.replace(/-/g, "+").replace(/_/g, "/");
  const bytes = atob(str);
  const output = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) {
    output[i] = bytes.charCodeAt(i);
  }
  return output;
};

const verifyJwt = async (token: string, secret: string) => {
  const [header, payload, signature] = token.split(".");

  if (!header || !payload || !signature) {
    throw new Error("Invalid token structure");
  }

  const enc = new TextEncoder();
  const data = enc.encode(`${header}.${payload}`);
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"],
  );

  const valid = await crypto.subtle.verify(
    "HMAC",
    key,
    base64UrlDecode(signature),
    data,
  );

  if (!valid) {
    throw new Error("Invalid token signature");
  }

  const decodedPayload = JSON.parse(
    new TextDecoder().decode(base64UrlDecode(payload)),
  );

  return decodedPayload;
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    const url = new URL("/auth/signin", request.url);
    url.searchParams.set("error", "not_logged_in");
    return NextResponse.redirect(url);
  }

  try {
    const decoded = await verifyJwt(token, process.env.JWT_SECRET!);
    // Validate payload contains necessary fields
    if (!decoded.id || !decoded.name || !decoded.iat || !decoded.exp) {
      throw new Error("Invalid token payload");
    }

    // If token verification is successful, continue to the next middleware or route handler
    return NextResponse.next();
  } catch (error) {
    console.error("Error verifying token:", error);
    const url = new URL("/auth/signin", request.url);
    url.searchParams.set("error", "invalid_token");
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/product", "/product/:path*"],
};
