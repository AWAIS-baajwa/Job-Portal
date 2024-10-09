import express from "express";
const router = express.Router();
import { upload } from "../MIDDLEWARES/multer.js";
import {
  registerUser,
  loginUser,
  logout,
  createJob,
  deleteJob,
} from "../CONTROLLERS/userController.js";
import { authentication } from "../MIDDLEWARES/authentication.js";

router.route("/register").post(upload.single("coverImage"), registerUser);
router.route("/login").post(loginUser);
// protected route
router.route("/logout").get(authentication, logout);
router.route("/createJob").post(authentication, createJob);
router.route("/deleteJob").get(authentication, deleteJob);

export default router;
