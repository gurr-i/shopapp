import { Router } from "express";
import { AuthController } from "./auth/auth.controller";

const router = Router();


router.get("/user", AuthController.fetchUser);
router.post("/user/signup", AuthController.signUp);
router.post("/user/login", AuthController.login);

//router.delete("/delete", AuthController.deleteUser)
// router.put("/update", AuthController.updateUser);

export { router };