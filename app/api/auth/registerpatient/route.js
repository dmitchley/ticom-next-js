// import { DoctorDetails, UserDetails } from "../../../lib/models";
// import { connectToDb } from "../../../lib/utils";
// import { serialize } from "cookie";
// import { sign } from "jsonwebtoken";
// import { COOKIE_NAME } from "@/constants";
// const MAX_AGE = 60 * 60 * 24 * 30;

// export async function POST(request) {
//   try {
//     await connectToDb();
//     const body = await request.json();
//     const { name, email, password, doctorCode } = body;

//     console.log(name, email, password, doctorCode);

//     // Validate request data
//     if (!name || !email || !password || !doctorCode) {
//       return new Response(
//         JSON.stringify({ message: "All fields are required" }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     // Check if the patient already exists
//     const existingPatient = await UserDetails.findOne({ email });
//     if (existingPatient) {
//       return new Response(
//         JSON.stringify({ message: "Patient already exists" }),
//         { status: 409, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     // Find the doctor with the provided code
//     const doctor = await DoctorDetails.findOne({ code: doctorCode });
//     if (!doctor) {
//       return new Response(JSON.stringify({ message: "Invalid doctor code" }), {
//         status: 404,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     // Hash the password

//     // Create new patient
//     const newPatient = new UserDetails({
//       name,
//       email,
//       password: password,
//       isPatient: true,
//     });

//     // Save patient to database
//     await newPatient.save();

//     // Associate the patient with the doctor
//     doctor.patients.push(newPatient._id);
//     await doctor.save();

//     // Generate JWT token for the patient
//     const secret = process.env.JWT_SECRET || "your_default_secret_here";
//     const token = sign({ email: email, isPatient: true }, secret, {
//       expiresIn: MAX_AGE,
//     });

//     // Set JWT token in a secure cookie
//     const serialized = serialize(COOKIE_NAME, token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: MAX_AGE,
//       path: "/",
//     });

//     // Send successful registration response
//     return new Response(
//       JSON.stringify({
//         message: "Patient registered successfully",
//         patientId: newPatient._id,
//         doctorId: doctor._id,
//       }),
//       {
//         status: 201,
//         headers: {
//           "Content-Type": "application/json",
//           "Set-Cookie": serialized,
//         },
//       }
//     );
//   } catch (error) {
//     console.error("Registration error:", error);
//     return new Response(
//       JSON.stringify({ message: "Server error during patient registration" }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }

import { DoctorDetails, UserDetails } from "../../../lib/models";
import { connectToDb } from "../../../lib/utils";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { COOKIE_NAME } from "@/constants";
const MAX_AGE = 60 * 60 * 24 * 30;
export async function POST(request) {
  try {
    await connectToDb();
    const body = await request.json();
    const { name, email, password, doctorCode } = body;

    // Validate request data
    if (!name || !email || !password || !doctorCode) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if the patient already exists
    const existingPatient = await UserDetails.findOne({ email });
    if (existingPatient) {
      return new Response(
        JSON.stringify({ message: "Patient already exists" }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }

    // Find the doctor with the provided code
    const doctor = await DoctorDetails.findOne({ code: doctorCode });
    if (!doctor) {
      return new Response(JSON.stringify({ message: "Invalid doctor code" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Create new patient
    const newPatient = new UserDetails({
      name,
      email,
      password, // Note: In production, use hashed passwords
      isPatient: true,
    });

    // Save patient to database
    await newPatient.save();

    // Associate the patient with the doctor
    doctor.patients.push(newPatient._id);
    await doctor.save();

    // Generate JWT token for the patient
    const secret = process.env.JWT_SECRET || "your_default_secret_here";
    const token = sign({ email: email, isPatient: true }, secret, {
      expiresIn: MAX_AGE,
    });

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
        message: "Patient registered successfully",
        patientId: newPatient._id,
        doctorId: doctor._id,
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
      JSON.stringify({ message: "Server error during patient registration" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
