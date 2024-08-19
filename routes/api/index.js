import { Router } from "express";
import userRouter from "./users/index.js"
import thoughtRouter from "./thoughts/index.js"

const router = Router()

router.use("/users", userRouter)
router.use("/thoughts", thoughtRouter)

export default router