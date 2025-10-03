import { Router } from "express";
import { home } from "../Controllers/homecontroller.js";

const router = Router();

router.get("/", home);

export default router;
