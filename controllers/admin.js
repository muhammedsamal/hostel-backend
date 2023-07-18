import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Admin from "../models/Admin.js";
import Student from "../models/Student.js";

const key = process.env.TOKEN_KEY || "FISH";

// login
export const signin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await Admin.findOne({ username });
    if (!existingUser)
      return res.status(404).json({ message: "user doesn't exists" });

    const isPasswordCorrect = await bycrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "invalid credentials" });

    const token = jwt.sign(
      { username: existingUser.username, id: existingUser._id },
      key,
      { expiresIn: "1hr" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// create a new user
export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await Admin.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "user already exists!!!" });

    const hashedPassword = await bycrypt.hash(password, 10);

    const result = await Admin.create({
      email,
      password: hashedPassword,
      username,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, key, {
      expiresIn: "1hr",
    });

    res.status(200).json({ result, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong!!!" });
  }
};

// update user
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { username, email, password } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No user with id: ${id}`);

  const updatedUser = { username, email, password };

  await Admin.findByIdAndUpdate(id, updatedUser, { new: true });

  res.json(updatedUser);
};

// add new student
export const addNewStudent = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingStudent = await Student.findOne({ username });
    if (existingStudent)
      return res.status(400).json({ message: "student already exists" });

    const hashedPassword = await bycrypt.hash(password, 10);

    const result = await Student.create({
      username,
      password: hashedPassword,
    });

    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
  }
};

// list all students
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ students });
  } catch (error) {
    console.log(error);
  }
};
