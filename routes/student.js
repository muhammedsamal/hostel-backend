import express from "express";

import { signin, signup, updateUser } from '../controllers/student.js';

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/:id", updateUser);

export default router;
