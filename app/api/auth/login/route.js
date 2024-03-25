// import { COOKIE_NAME } from "@/constants";
// import { serialize } from "cookie";
// import { sign } from "jsonwebtoken";
// import { NextResponse } from "next/server";

// const MAX_AGE = 60 * 60 * 24 * 30;

// export async function POST(request) {
//   const body = await request.json();

//   const { email, password } = body;

//   if (email !== "admin@admin.com" || password !== "admin") {
//     return NextResponse.json(
//       {
//         message: "Unauthorized",
//       },
//       {
//         status: 401,
//       }
//     );
//   }

//   const secret = process.env.JWT_SECRET || "";

//   const token = sign(
//     {
//       email,
//     },
//     secret,
//     {
//       expiresIn: MAX_AGE,
//     }
//   );

//   const seralized = serialize(COOKIE_NAME, token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//     maxAge: MAX_AGE,
//     path: "/",
//   });

//   const response = {
//     message: "Authenticated!",
//   };

//   return new Response(JSON.stringify(response), {
//     status: 200,
//     headers: { "Set-Cookie": seralized },
//   });
// }

import { COOKIE_NAME } from "@/constants";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { fetchUsers } from "../../../lib/data"; // Import the fetchUsers function

const MAX_AGE = 60 * 60 * 24 * 30;

export async function POST(request) {
  const body = await request.json();

  const { email, password } = body;

  // Authenticate the user
  const users = await fetchUsers();
  const user = users.find(
    (user) => user.email === email && user.password === password
  ); // This should ideally use hashed passwords

  if (!user) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const secret = process.env.JWT_SECRET || "";

  const token = sign(
    {
      email: user.email,
    },
    secret,
    {
      expiresIn: MAX_AGE,
    }
  );

  const serialized = serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: MAX_AGE,
    path: "/",
  });

  const response = {
    message: "Authenticated!",
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Set-Cookie": serialized },
  });
}
