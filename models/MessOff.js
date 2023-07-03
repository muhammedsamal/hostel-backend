import mongoose from "mongoose";
const Schema = mongoose.Schema;

const messOffSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
  },
  leaving_date: {
    type: Date,
    required: true,
  },
  return_date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  request_date: {
    type: Date,
    default: Date.now,
  },
});

const MessOff = mongoose.model("MessOff", messOffSchema);

export default MessOff;

