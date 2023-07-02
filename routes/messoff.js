import express from 'express';

import { requestMessOff, countMessOff, listMessOff, updateMessOff } from '../controllers/messoff.js';

const router = express.Router();

router.post("/request-messoff", requestMessOff);
router.get("/count-messoff", countMessOff);
router.get("/list-messoff", listMessOff);
router.put("/update-messoff", updateMessOff);


export default router;