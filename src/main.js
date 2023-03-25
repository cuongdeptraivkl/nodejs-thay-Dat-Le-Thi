import express from "express";
import productRouter from "./routers/product";
import authRouter from "./routers/auth";
import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();
const app = express();

// đăng ký middleware" giải mã dữ liệu json
app.use(express.json());

// router
app.use("/api", productRouter);
app.use("/api", authRouter);

mongoose.connect("mongodb://127.0.0.1:27017/web17302_thay_Dat");



app.listen(process.env.PORT,()=>{
    console.log(`đã chạy ở ${process.env.PORT}`);
});
export const viteNodeApp = app;