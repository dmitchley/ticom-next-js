import { COOKIE_NAME } from "@/constants";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { DoctorDetails, UserDetails } from "../../../lib/models";
import { connectToDb } from "../../../lib/utils";

const MAX_AGE = 60 * 60 * 24 * 30;

export async function POST(request) {
  try {
    await connectToDb();
    const body = await request.json();
    const { email, password } = body;

    const user = await DoctorDetails.findOne({ email, password });

    if (!user) {
      const user = await DoctorDetails.findOne({ email, password });
    }

    if (!user) {
      const user = await UserDetails.findOne({ email, password });
    }

    const secret = process.env.JWT_SECRET || "your_default_secret_here";
    const token = sign({ email: user.email }, secret, { expiresIn: MAX_AGE });

    const serialized = serialize(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: MAX_AGE,
      path: "/",
    });

    return new Response(JSON.stringify({ message: "Authenticated!" }), {
      status: 200,
      headers: { "Set-Cookie": serialized },
    });
  } catch (err) {
    console.error(err); // Log the error
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
