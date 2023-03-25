import { Router } from "express";
import { singup } from "../controllers/auth";

const router = Router();

router.post("/signup", singup);

export default router;
