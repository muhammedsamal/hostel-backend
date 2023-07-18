import express from "express";

import {
  addNewStudent,
  getStudents,
  signin,
  signup,
  updateUser,
} from "../controllers/admin.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.put("/:id", updateUser);
router.post("/add/student", addNewStudent);
router.get("/get-all", getStudents);

export default router;
