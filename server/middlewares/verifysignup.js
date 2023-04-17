// ver si esta enviando un correo nuevo, o si existe le usaurio, o si el rol existe

import { getUserByEmail } from "../controllers/user.controller";
export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  const userFind = await getUserByEmail(req.body.email);
  if (userFind != undefined) {
    let email = JSON.stringify(userFind.email);
    console.log("imprimiendo email: ");
    console.log(email);

    if (email) {
      return res.status(400).json({ message: "email already in use" });
    }
  }
  next();
};
