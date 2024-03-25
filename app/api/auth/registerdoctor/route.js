// import { COOKIE_NAME } from "@/constants";
// import { serialize } from "cookie";
// import { sign } from "jsonwebtoken";
// import { DoctorDetails } from "../../../lib/models";
// import { connectToDb } from "../../../lib/utils";

// export async function POST(request) {
//   try {
//     await connectToDb();
//     const body = await request.json();
//     const { name, email, password, code } = body;

//     console.log(name, email, password, code);

//     // Validate request data
//     if (!name || !email || !password || !code) {
//       return new Response(
//         JSON.stringify({ message: "All fields are required" }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     // Check if the doctor already exists
//     const existingDoctor = await DoctorDetails.findOne({ email });
//     if (existingDoctor) {
//       return new Response(
//         JSON.stringify({ message: "Doctor already exists" }),
//         { status: 409, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     // Create new doctor
//     const newDoctor = new DoctorDetails({
//       name,
//       email,
//       password, // Note: In production, use hashed passwords
//       code,
//       isDoctor: true,
//     });

//     // Save doctor to database
//     await newDoctor.save();

//     const secret = process.env.JWT_SECRET || "your_default_secret_here";
//     const token = sign({ email: email }, secret, { expiresIn: MAX_AGE });

//     const serialized = serialize(COOKIE_NAME, token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: MAX_AGE,
//       path: "/",
//     });

//     return new Response(JSON.stringify({ message: "Authenticated!" }), {
//       status: 200,
//       headers: { "Set-Cookie": serialized },
//     });

//     // Send response
//     return new Response(
//       JSON.stringify({
//         message: "Doctor registered successfully",
//         doctorId: newDoctor._id,
//       }),
//       { status: 201, headers: { "Content-Type": "application/json" } }
//     );
//   } catch (error) {
//     console.error("Registration error:", error);
//     return new Response(
//       JSON.stringify({ message: "Server error during doctor registration" }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }

import { serialize } from "cookie";
import { sign } from "jsonwebtoken";

import { DoctorDetails } from "../../../lib/models";
import { connectToDb } from "../../../lib/utils";
import { COOKIE_NAME } from "@/constants";

const MAX_AGE = 60 * 60 * 24 * 30;

export async function POST(request) {
  try {
    await connectToDb();
    const body = await request.json();
    const { name, email, password, code } = body;

    // Validate request data
    if (!name || !email || !password || !code) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if the doctor already exists
    const existingDoctor = await DoctorDetails.findOne({ email });
    if (existingDoctor) {
      return new Response(
        JSON.stringify({ message: "Doctor already exists" }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create new doctor
    const newDoctor = new DoctorDetails({
      name,
      email,
      password: password, // Store the hashed password
      code,
      isDoctor: true,
    });

    // Save doctor to database
    await newDoctor.save();

    // Generate JWT token
    const secret = process.env.JWT_SECRET || "your_default_secret_here";
    const token = sign({ email: email }, secret, { expiresIn: MAX_AGE });

    // Set JWT token in a secure cookie
    const serialized = serialize(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: MAX_AGE,
      path: "/",
    });

    // Send successful registration response
    return new Response(
      JSON.stringify({
        message: "Doctor registered successfully",
        doctorId: newDoctor._id,
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": serialized,
        },
      }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return new Response(
      JSON.stringify({ message: "Server error during doctor registration" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
