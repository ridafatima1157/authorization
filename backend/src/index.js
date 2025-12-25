import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./config/dbConnect.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
//dotenv.config() loads environment variables from your .env file into process.env.
dotenv.config();

const PORT = process.env.PORT || 7001;
const app = express();

//connect to database
dbConnect();

app.use(cors({
  origin: "http://localhost:5173",  // your React app URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

//middleware
//“If the incoming request has JSON in its body, automatically parse it into a JavaScript object and put it in req.body.”
app.use(express.json());

//route
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

//start the erver
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
