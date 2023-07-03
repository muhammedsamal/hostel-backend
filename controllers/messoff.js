import mongoose from "mongoose";
import MessOff from "../models/Messoff.js";
import Student from "../models/Student.js";

export const requestMessOff = async (req, res) => {
  const { student, leaving_date, return_date } = req.body;
  const today = new Date();
  if(new Date(leaving_date) > new Date(return_date)) {
    return res.status(400).json({"message": "leaving date connot be greater than return date"})
  } else if (new Date(leaving_date) < today) {
    return res.status(400).json({ "message": "request cannot be made for past mess off" });
  }
  try {
    const messOff = new MessOff({
      student,
      leaving_date,
      return_date
    });
    await messOff.save();
    return res.status(200).json({"message": "mess off request sent successfully"});
  } catch (error) {
    console.log(error);
  }
}

export const countMessOff = async (req, res) => {
  const { student } = req.body;
  try {
    let date = new Date();
    const list = await MessOff.find({ student, leaving_date: {$gte: new Date(date.getFullYear(), date.getMonth(), 1), $lte: new Date(date.getFullYear(), date.getMonth() + 1, 0)} });
    let approved = await MessOff.find({
      student,
      status: "approved",
      leaving_date: {
        $gte: new Date(date.getFullYear(), date.getMonth(), 1),
        $lte: new Date(date.getFullYear(), date.getMonth() + 1, 0),
      },
    });
    let days = 0;
    for (let i = 0; i < approved.length; i++) {
      days +=
        (new Date(approved[i].return_date) -
          new Date(approved[i].leaving_date)) /
        (1000 * 60 * 60 * 24);
    }

    approved = days;
    return res.status(200).json({ list, approved });
  } catch (error) {
    console.log(error);
  }
}

export const listMessOff = async (req, res) => {
  try {
    const students = await Student.find().select("_id");

    const list = await MessOff.find({
      student: { $in: students },
      status: "pending",
    }).populate("student", ["name", "email"]);

    const currentDate = new Date();
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    const approvedCount = await MessOff.countDocuments({
      student: { $in: students },
      status: "approved",
      leaving_date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
    });

    const rejectedCount = await MessOff.countDocuments({
      student: { $in: students },
      status: "rejected",
      leaving_date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
    });

    return res
      .status(200)
      .json({ list, approved: approvedCount, rejected: rejectedCount });
  } catch (err) {
    console.log(err);
  }
};

export const updateMessOff = async (req, res) => {
  const { id, status } = req.body;
  try {
    const messOff = await MessOff.findByIdAndUpdate(id, { status });
    return res.status(200).json({ messOff });
  } catch (err) {
    console.error(err);
  }
};





// function getDaysBetweenDates(startDate, endDate) {
//   // Convert the date strings to Date objects
//   const start = new Date(startDate);
//   const end = new Date(endDate);

//   // Calculate the time difference in milliseconds
//   const timeDiff = end.getTime() - start.getTime();

//   // Calculate the number of days
//   const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

//   return days;
// }
