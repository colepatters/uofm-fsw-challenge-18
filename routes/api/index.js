import { Router } from "express";
import userRouter from "./users.js"
import thoughtRouter from "./thoughts.js"

const router = Router()

router.use("/users", userRouter)
router.use("/thoughts", thoughtRouter)

export default router