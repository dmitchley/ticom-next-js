import { serialize } from "cookie";
import { NextResponse } from "next/server";
import { COOKIE_NAME } from "@/constants";

export async function POST() {
  const serialized = serialize(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: -1,
    path: "/",
  });

  return new Response(JSON.stringify({ message: "Logged out" }), {
    status: 200,
    headers: { "Set-Cookie": serialized },
  });
}
