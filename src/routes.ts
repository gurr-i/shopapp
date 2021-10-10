import { Router } from "express";
import { AuthController } from "./auth/auth.controller";

const router = Router();


//Default route
router.get("/", function(req, res){
    res.send({
        message: "API WORKING!"
    });
});

// router.get('/', function(req, res){
//     res.redirect('/todo');
//  });

router.get("/user", AuthController.fetchUser);
router.post("/user/signup", AuthController.signUp);
router.post("/user/login", AuthController.login);

//router.delete("/delete", AuthController.deleteUser)
// router.put("/update", AuthController.updateUser);

export { router };