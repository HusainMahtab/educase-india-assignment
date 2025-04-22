import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/db/connection.js";
dotenv.config("./");
const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

// db conection method callng
connectDB();

// importing route
import schoolRoutes from "./src/routes/school.routes.js";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/schools", schoolRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})



