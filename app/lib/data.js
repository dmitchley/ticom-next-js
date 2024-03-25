import { UserDetails } from "./models";
import { connectToDb } from "./utils";

export const fetchUsers = async () => {
  try {
    connectToDb();
    const users = await UserDetails.find();
    return users;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to Fetch users");
  }
};

// export const writeUser = async (userData) => {
//   try {
//     await connectToDb(); // Ensures the database connection is established

//     // Create a new user instance with the provided data
//     const newUser = new UserDetails({
//       name: userData.name,
//       email: userData.email,
//       password: userData.password,
//       isAdmin: userData.isAdmin,
//       isDoctor: userData.isDoctor,
//       isPatient: userData.isPatient,
//       isActive: userData.isActive,
//     });

//     // Save the new user to the database
//     const savedUser = await newUser.save();
//     return savedUser; // Return the newly created user document
//   } catch (err) {
//     console.error("Error creating user:", err); // Log any errors
//     throw new Error("Failed to create user"); // Propagate the error
//   }
// };
