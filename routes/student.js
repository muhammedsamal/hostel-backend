import express from "express";

import { signin, updateStudent } from "../controllers/student.js";

const router = express.Router();

router.post("/signin", signin);
router.put("/:id", updateStudent);

export default router;
