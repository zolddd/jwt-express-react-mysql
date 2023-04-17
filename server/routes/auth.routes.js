import {Router} from "express"
import { signIn,signUp } from "../controllers/auth.controller";
import { checkDuplicateUsernameOrEmail } from "../middlewares";
const router =Router();
router.post("/signin",signIn) //login
router.post("/signup",[checkDuplicateUsernameOrEmail],signUp)  //registro
export default router;