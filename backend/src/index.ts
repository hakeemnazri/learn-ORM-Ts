import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"

const app = express();
dotenv.config();

app.use(express.json()); // parse application/json
app.use(cookieParser()); // parse cookies

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes)


app.get("/", (req, res) => {
    res.send("meow");
})

app.listen(process.env.PORT, () => {
    console.log(`App is running on port ${process.env.PORT}`)
    console.log(`App is running on ${process.env.NODE_ENV} mode`)
})