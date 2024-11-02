import express from "express";
import { getUserDetails } from "../controllers/userController";

const router = express.Router();

router.get(":userId", getUserDetails);
export default router;

// router.get("/users", login); -- analytics

// router.patch(":userId", updateUserDetails);
// router.delete(":userId", deleteAccount); - appStrore
