import mongoose from "mongoose";

const studentSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    yearOfStudy: {
      type: Number,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    adharNo: {
      type: String,
      default: "",
    },
    dob: {
      type: String,
      default: "",
    },
    income: {
      type: String,
      default: "",
    },
    caste: {
      type: String,
      default: "",
    },
    bloodGroup: {
      type: String,
      default: "",
    },
    distanceFromHome: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
