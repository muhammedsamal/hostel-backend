import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Student from "../models/Student.js";

const key = process.env.TOKEN_KEY || "FISH";

// login
export const signin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await Student.findOne({ username });
    if (!existingUser)
      return res.status(404).json({ message: "user doesn't exists" });

    const isPasswordCorrect = await bycrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "invalid credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      key,
      { expiresIn: "1hr" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// create a new user
// export const signup = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     const existingUser = await Student.findOne({ email });

//     if (existingUser)
//       return res.status(400).json({ message: "user already exists!!!" });

//     const hashedPassword = await bycrypt.hash(password, 10);

//     const result = await Student.create({
//       email,
//       password: hashedPassword,
//       name,
//     });

//     const token = jwt.sign({ email: result.email, id: result._id }, key, {
//       expiresIn: "1hr",
//     });

//     res.status(200).json({ result, token });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "something went wrong!!!" });
//   }
// };

// update user
export const updateStudent = async (req, res) => {
  const id = req.params.id;
  // const updatedStudent = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No user with id: ${id}`);

  const updatedStudent = req.body;

  await Student.findByIdAndUpdate(id, updatedStudent, { new: true });

  res.status(200).json({ updatedStudent });
};
