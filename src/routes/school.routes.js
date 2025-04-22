import { Router } from "express";
import { createSchool,listSchools } from "../controllers/school.controller.js";
const router = Router();

// creation of a new school
router.post("/addSchool",createSchool)

// list all schools
router.get("/listSchools",listSchools)

export default router;  