//autorizacion
import jwt from "jsonwebtoken";
import { getUserById } from "../controllers/user.controller";
import { getRolesForIdUser } from "../controllers/role.controller";
import SECRET from "../SECRET";
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).json({ message: "token no provided" });
    }
    const decoded = jwt.verify(token,SECRET.SECRET);
    console.log("**IMPRIMIENDO DECODED****");
    console.log(decoded);
    req.userId = decoded.id;
    const user = await getUserById(req.userId);
    console.log(user);
    if (!user.id) {
      return res.status(404).json({ message: "user not found" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json(error);
  }
};

export const permissionsAdmin = async (req, res, next) => {
  const user = await getUserById(req.userId);

  const rolesUser = await getRolesForIdUser(user.id);
  if (rolesUser.x === 1 && rolesUser.r === 1 && rolesUser.w === 1) {
    console.log("tiene todos los permisos, es admin");
    next();
  }

  return res.status(403).json({ message: "does not have permissions" });
};

export const permissionsUser = async (req, res, next) => {
  const user = await getUserById(req.userId);
  const rolesUser = await getRolesForIdUser(user.id);
  if (rolesUser.x === 0 && rolesUser.r === 1 && rolesUser.w === 1) {
    next();
  }
  return res.status(403).json({ message: "does not have permissions" });
};
