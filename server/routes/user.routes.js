/*import { Router } from "express";
import * as userctrl from "../controllers/user.controller";
import { authjwt, checkRolesExisted } from "../middlewares";
const routes = Router();

routes.post(
  "/",
  [authjwt.verifyToken, authjwt.isAdmin, checkRolesExisted],
  userctrl.createUser
);*/


import {Router} from "express"
import * as userCtrl from "../controllers/user.controller";
/* import { authjwt } from "../middlewares"; */

const router =Router();

router.get("/",userCtrl.getUsers);

router.post("/",userCtrl.createUser); 

router.delete("/:userId",userCtrl.deleteUser);

router.put("/:userId",userCtrl.updateUser);

export default router;
