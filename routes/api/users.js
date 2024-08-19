import { Router } from "express";
import User from "../../models/User.js";

const router = Router()

router.get("/", async function(req, res) {
    const users = await User.find()
    res.json(users)
})

router.get("/:userId", async function(req, res) {
    const user = await User.findOne({ _id: req.params.userId })
    if (!user) {
        res.sendStatus(404)
        return
    }

    await user.populate("thoughts", )
    await user.populate("friends")

    res.json(user)
})

router.post("/", async function(req, res) {
    try {
        const user = await User.create(req.body)
        res.json(user)
        return
    } catch (error) {
        if (error.name === "ValidationError") {
            res.sendStatus(400)
            return
        }

        if (error.code === 11000) {
            res.status(400).send("User already exists")
            return
        }

        res.status(500).json(error)
    }   
})

export default router