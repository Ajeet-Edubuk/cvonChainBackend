import { Router } from "express";
import { createCv, getCv,verifyDoc } from "../controllers/cv.controller";

const router = Router();

router.post("/create", createCv);
router.get("/getCv/:id", getCv);
router.get("/verifyDoc/:pinataHash",verifyDoc)
export default router;
