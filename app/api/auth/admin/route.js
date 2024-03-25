// import { COOKIE_NAME } from "@/constants";
// import { verify } from "jsonwebtoken";
// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";
// import { DoctorDetails } from "../../../lib/models";

// // This is the main function for handling GET requests
// export async function GET(request) {
//   // Extracting the cookie
//   const cookieStore = cookies(request);
//   const tokenCookie = cookieStore.get(COOKIE_NAME);

//   if (!tokenCookie) {
//     return new Response(JSON.stringify({ message: "Unauthorized" }), {
//       status: 401,
//     });
//   }

//   const token = tokenCookie.value;
//   let userEmail;
//   try {
//     // Verify and decode the JWT
//     const decoded = verify(token, process.env.JWT_SECRET || "");
//     userEmail = decoded.email;
//   } catch (error) {
//     return new Response(JSON.stringify({ message: "Invalid token" }), {
//       status: 403,
//     });
//   }

//   try {
//     // Look up the user in the database using their email
//     const user = await DoctorDetails.findOne({ email: userEmail });

//     console.log(JSON.stringify(user));

//     // Check if the user exists and if they are an admin
//     if (!user || !user.isDoctor) {
//       return new Response(JSON.stringify({ message: "Access denied" }), {
//         status: 403,
//       });
//     }

//     // Admin specific actions here, this is just a placeholder response
//     return new Response(JSON.stringify({ message: "Admin access granted" }), {
//       status: 200,
//     });
//   } catch (err) {
//     console.error(err); // Log the error
//     return new Response(JSON.stringify({ message: "Internal server error" }), {
//       status: 500,
//     });
//   }
// }

// // import { COOKIE_NAME } from "@/constants";
// // import { verify } from "jsonwebtoken";
// // import { cookies } from "next/headers";
// // //import { NextResponse } from "next/server";

// // export async function GET() {
// //   const cookieStore = cookies();

// //   const token = cookieStore.get(COOKIE_NAME);

// //   console.log(token);

// //   if (!tokenCookie) {
// //     return new Response(JSON.stringify({ message: "No Cookie" }), {
// //       status: 401,
// //     });
// //   }
// // }

import { COOKIE_NAME } from "@/constants";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { DoctorDetails } from "../../../lib/models";

// This is the main function for handling GET requests
export async function GET(request) {
  // Extracting the cookie
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get(COOKIE_NAME);

  if (!tokenCookie) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const token = tokenCookie.value;
  let userEmail;

  try {
    // Verify and decode the JWT
    const decoded = verify(token, process.env.JWT_SECRET || "");
    userEmail = decoded.email;
  } catch (error) {
    return new Response(JSON.stringify({ message: "Invalid token" }), {
      status: 403,
    });
  }

  try {
    // Look up the user in the database using their email
    const user = await DoctorDetails.findOne({ email: userEmail });
    console.log(JSON.stringify(user.isDoctor)); // Log the user object

    // Check if the user exists and if they are an admin
    if (!user || !user.isDoctor) {
      return new Response(JSON.stringify({ message: "Access denied" }), {
        status: 403,
      });
    }

    // Admin specific actions here, this is just a placeholder response
    return new Response(JSON.stringify({ message: "Admin access granted" }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    // Log the error
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
