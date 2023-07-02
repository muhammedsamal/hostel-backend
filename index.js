import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

import studentRoute from './routes/student.js';
import adminRoute from './routes/admin.js';
import messRoute from './routes/messoff.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.get("/", (req, res) => {
  res.send("Helo");
});

app.use("/api/auth/student", studentRoute);
app.use("/api/auth/admin", adminRoute);
app.use("/api/mess", messRoute);


const CONNECTION_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(error.message));