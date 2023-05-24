import {Router} from "express"
import { signIn,signUp } from "../controllers/auth.controller";
import { checkDuplicateUsernameOrEmail } from "../middlewares";
import passport from "passport"
const router =Router();
router.post("/signin",signIn) //login
router.post("/signup",[checkDuplicateUsernameOrEmail],signUp)  //registro


router.get("/login/success", (req, res) => {
	if (req.user) {
		console.log("req user: "+req.user)
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: "http://localhost:5173/home",
		failureRedirect: "/login/failed",
	})
);

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("http://localhost:5173/");
});

export default router;