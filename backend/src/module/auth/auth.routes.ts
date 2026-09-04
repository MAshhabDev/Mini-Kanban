import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post("/register", authController.createUser);
router.post("/login", authController.logInUser);

router.post("/refresh-token", authController.refreshToken);
router.get("/me", authController.getMe);

export const authRoute = router;