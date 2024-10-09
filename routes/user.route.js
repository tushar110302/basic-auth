import { Router } from "express";
import { adminRoute, login, register, studentRoute, testRoute } from "../controller/user.controller.js";
import { isAdmin, isStudent, verifyJwt } from "../middlewares/auth.js";
const router = Router();

router.route("/login").post(login)
router.route("/register").post(register);

router.route("/test").get(verifyJwt, testRoute);
router.route("/student").get(verifyJwt, isStudent, studentRoute);
router.route("/admin").get(verifyJwt, isAdmin, adminRoute);


export default router