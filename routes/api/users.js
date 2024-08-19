import { Router } from "express";
import User from "../../models/User.js";

const router = Router()

router.get("/", async function(req, res) {
    const users = await User.find()
    res.json(users)
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

router.get("/:userId", async function(req, res) {
    const user = await User.findOne({ _id: req.params.userId })
    if (!user) {
        res.sendStatus(404)
        return
    }

    res.json(user)
})

router.put("/:userId", async function(req, res) {
    const updateRes = await User.updateOne({ _id: req.params.userId }, req.body)
    if (!updateRes.modifiedCount) {
        res.sendStatus(404)
        return
    }

    console.log(updateRes)

    res.sendStatus(200)

})

router.delete("/:userId", async function(req, res) {
    const deleteRes = await User.deleteOne({ _id: req.params.userId })
    if (!deleteRes.deletedCount) {
        res.sendStatus(404)
        return
    }

    res.sendStatus(200)
})

export default router