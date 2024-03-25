import { COOKIE_NAME } from "@/constants";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { DoctorDetails } from "../../../lib/models";

export async function GET() {
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get(COOKIE_NAME);

  if (!tokenCookie) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const token = tokenCookie.value;
  let doctorEmail;

  try {
    // Verify and decode the JWT
    const decoded = verify(token, process.env.JWT_SECRET || "");
    doctorEmail = decoded.email;
  } catch (error) {
    return new Response(JSON.stringify({ message: "Invalid token" }), {
      status: 403,
    });
  }

  try {
    // Find the doctor in the database
    const doctor = await DoctorDetails.findOne({ email: doctorEmail }).populate(
      "patients"
    );

    if (!doctor) {
      return new Response(JSON.stringify({ message: "Doctor not found" }), {
        status: 404,
      });
    }

    // Extract patient data from the doctor document
    const patients = doctor.patients.map((patient) => ({
      id: patient._id,
      name: patient.name,
      email: patient.email,
    }));

    // Return the list of patients
    return new Response(JSON.stringify({ patients }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
