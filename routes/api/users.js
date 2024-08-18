import { Router } from "express";

const router = Router()

router.get("/", async function(req, res) {
    res.json({ message: "Hello World!" })
})

export default router