import express from "express"
/* import { createRoles } from "./libs/initialSetup"
import morgan from "morgan"
import pkg from "../package.json"
import productsRouter from "./routes/products.routes"
import authRouter from "./routes/auth.routes"
import userRoter from "./routes/user.routes" */
import cors from "cors";
import morgan from "morgan"
import productRouter from "./routes/products.routes"
import userRouter from "./routes/user.routes"
import authRouter from "./routes/auth.routes"
/* import googleRouter from "./routes/google.routes" */
import cookieSession from "cookie-session"
import passportStrategy from "./passport"
import passport from 'passport';
import { Server as webSocketServer } from "socket.io";
import http from "http"

const app = express();
app.use(express.json());
app.use(morgan("dev"));
/* app.use(cors()); */


const httpServer = http.createServer(app)

const io= new webSocketServer(httpServer)


app.listen(3000);

app.use(
	cookieSession({
		name: "session",
		keys: ["developer"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: "http://localhost:5173",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);


app.use("/bazar/products",productRouter)
app.use("/bazar/users",userRouter)
app.use("/bazar/auth",authRouter)
/* app.use("/bazar/google",googleRouter); */
/* app.use("/api/auth",authRouter)
app.use("/api/users",userRoter) */