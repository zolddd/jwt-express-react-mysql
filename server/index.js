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


const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.listen(3000);


app.use("/bazar/products",productRouter)
app.use("/bazar/users",userRouter)
app.use("/bazar/auth",authRouter)
/* app.use("/api/auth",authRouter)
app.use("/api/users",userRoter) */