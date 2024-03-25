import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      min: 2,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isDoctor: {
      type: Boolean,
      default: false,
    },
    isPatient: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const UserDetails =
  mongoose.models.UserDetails || mongoose.model("UserDetails", userSchema);

// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       unique: true,
//       minlength: 2,
//       maxlength: 20,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     role: {
//       type: String,
//       enum: ['admin', 'doctor', 'patient'],
//       required: true,
//     },
//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//     patients: [{
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User'
//     }]
//   },
//   { timestamps: true }
// );

// // Ensure that the patients array is only used if the user is a doctor
// userSchema.pre('save', function(next) {
//   if (this.role !== 'doctor') {
//     this.patients = []; // Clear the array if not a doctor
//   }
//   next();
// });

// export const User = mongoose.models.User || mongoose.model("User", userSchema);
