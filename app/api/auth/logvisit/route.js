// // app/api/auth/logVisit/route.js
// //import { connectToDb } from "../../../../lib/utils"; // Adjust the import path as necessary
// import { connectToDb } from "../../../lib/utils"; // Adjust based on your project structure
// import { ActivityDetails } from "../../../lib/models"; // Adjust based on your project structure
// import { COOKIE_NAME } from "../../../../constants"; // Adjust this path as necessary
// import jwt from "jsonwebtoken";

// export async function POST(req, res) {
//   //export async function POST(req, res) {
//   // Check if the request method is POST
//   if (req.method !== "POST") {
//     return res.status(405).end("Method not allowed");
//   }

//   // Establish database connection
//   await connectToDb();

//   // Try to get the token from cookies
//   const token = request.cookies[COOKIE_NAME];

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   // Try to verify the JWT token
//   let userId;
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log(decoded);
//     userId = decoded.id; // Adjust according to your JWT payload structure
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token" });
//   }

//   // Extract the page and timestamp from the request body
//   const { page, timestamp } = request.body;
//   if (!page || !timestamp) {
//     return res
//       .status(400)
//       .json({ message: "Missing page or timestamp in request body" });
//   }

//   try {
//     // Log the visit in the database
//     const activity = await ActivityDetails.create({
//       user: userId,
//       activityType: "Page Visit",
//       details: `Visited ${page} at ${timestamp}`,
//     });

//     return res
//       .status(200)
//       .json({ message: "Activity logged successfully", activity });
//   } catch (error) {
//     console.error("Error logging activity:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// }

// app/api/auth/logVisit/route.js
// import { connectToDb } from "../../../lib/utils"; // Adjust path as necessary
// import { ActivityDetails } from "../../../lib/models"; // Adjust path as necessary
// import { COOKIE_NAME } from "../../../../constants"; // Ensure this path is correct
// import jwt from "jsonwebtoken";

// export async function POST(req, res) {
//   const body = await req.json();
//   console.log("Received data:", req.body);
//   if (req.method !== "POST") {
//     return res.status(405).end("Method not allowed");
//   }

//   await connectToDb();

//   const token = req.cookies[COOKIE_NAME]; // Corrected from 'request' to 'req'
//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   let userId;
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     userId = decoded.id;
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token" });
//   }

//   const { page, timestamp } = req.body; // Corrected from 'request' to 'req'
//   if (!page || !timestamp) {
//     return res
//       .status(400)
//       .json({ message: "Missing page or timestamp in request body" });
//   }

//   console.log(page, timestamp);

//   try {
//     const activity = await ActivityDetails.create({
//       user: userId,
//       activityType: "Page Visit",
//       details: `Visited ${page} at ${timestamp}`,
//     });

//     return res
//       .status(200)
//       .json({ message: "Activity logged successfully", activity });
//   } catch (error) {
//     console.error("Error logging activity:", error);
//     return res
//       .status(500)
//       .json({ message: "Internal server error", error: error.message });
//   }
// }

// app/api/auth/logvisit.js (or the correct path according to your project structure)

// app/api/auth/logvisit/route.js

import { connectToDb } from "../../../lib/utils"; // Adjust the import path as necessary
import { ActivityDetails } from "../../../lib/models"; // Adjust the import path as necessary
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "../../../../constants"; // Adjust the import path as necessary

// Export the POST method as a named export
export async function POST(req, res) {
  const body = await req.json();
  console.log("Received data:", body);

  return new Response(body);
  // try {
  //   await connectToDb();

  //   // Extract the JWT token from cookies
  //   const token = req.cookies[COOKIE_NAME];
  //   if (!token) {
  //     throw new Error("Unauthorized");
  //   }

  //   // Verify the JWT token
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   if (!decoded || !decoded.id) {
  //     throw new Error("Invalid token");
  //   }

  //   // Extract the page and timestamp from the request body
  //   const { page, timestamp } = req.body;
  //   if (!page || !timestamp) {
  //     throw new Error("Missing page or timestamp in request body");
  //   }

  //   // Log the visit in the database
  //   const activity = await ActivityDetails.create({
  //     user: decoded.id,
  //     activityType: "Page Visit",
  //     details: `Visited ${page} at ${timestamp}`,
  //   });

  //   // Return a success response
  //   res.status(200).json({ message: "Activity logged successfully", activity });
  // } catch (error) {
  //   console.error("Error logging activity:", error.message);
  //   res.status(500).json({ message: error.message || "Internal server error" });
  // }
}
