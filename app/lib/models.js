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

const doctorSchema = new mongoose.Schema(
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
    code: {
      // Unique code for the doctor that patients will use
      type: String,
      required: true,
      unique: true,
      length: 6,
    },
    isDoctor: {
      type: Boolean,
      default: true,
    },
    patients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserDetails",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const DoctorDetails =
  mongoose.models.DoctorDetails ||
  mongoose.model("DoctorDetails", doctorSchema);

const activitySchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserDetails",
      required: true,
    },
    activityType: {
      type: String,
    },
    details: String,
  },
  { timestamps: true }
);

export const ActivityDetails =
  mongoose.models.ActivityDetails ||
  mongoose.model("ActivityDetails", activitySchema);
