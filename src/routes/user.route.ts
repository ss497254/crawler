import { userController } from "../controllers";
import express from "express";
import validate from "../middlewares/validate";
import { userValidation } from "../validations";
import { userRegisterSecret } from "../middlewares/user-register-secret";
import { auth } from "../middlewares/auth";

const router = express.Router();

router.route("/logged-in").get(auth, userController.userLoggedIn);

router
    .route("/login")
    .post(
        validate(userValidation.userLoginAndRegister),
        userController.userLogin
    );

router
    .route("/register/:secret")
    .post(
        userRegisterSecret,
        validate(userValidation.userLoginAndRegister),
        userController.userRegister
    );

export default router;
