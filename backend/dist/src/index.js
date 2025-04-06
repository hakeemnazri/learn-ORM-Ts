import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./socket/socket.js";
dotenv.config();
const dirname = path.resolve();
app.use(express.json()); // parse application/json
app.use(cookieParser()); // parse cookies 
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(dirname, "/frontend/dist")));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(dirname, 'frontend', 'dist', 'index.html'));
    });
}
server.listen(process.env.PORT, () => {
    console.log(`App is running on ${process.env.NODE_ENV} mode, port ${process.env.PORT}`);
});
