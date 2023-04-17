import {Router} from "express"
import * as productsCtrl from "../controllers/products.controller";
import { authjwt } from "../middlewares";
import { create,upload } from "../controllers/file.controller";
const router =Router();

router.get("/",productsCtrl.getProducts);

router.post("/",upload,create);

router.get("/:userId",productsCtrl.getProductsByIdUser);

router.delete("/:productId",[authjwt.verifyToken,authjwt.permissionsAdmin],productsCtrl.deleteProduct);

router.put("/:productId",[authjwt.verifyToken,authjwt.permissionsAdmin],productsCtrl.updateProduct);

export default router;

