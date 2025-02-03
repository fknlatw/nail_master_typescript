import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import "dotenv/config.js";
import userRoutes from "./routes/userRoutes";
import tokenRoutes from "./routes/tokenRoutes";
import entrieRoutes from "./routes/entrieRoutes";

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ 
    origin: 'http://localhost:5173', 
    credentials: true 
}));

app.use("/api", userRoutes);
app.use("/api", tokenRoutes);
app.use("/api", entrieRoutes);

app.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`);
});