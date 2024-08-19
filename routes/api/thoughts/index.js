import { Router } from "express";
import Thought from "../../../models/Thought.js";
import User from "../../../models/User.js";

const router = Router()

router.get("/", async function(req, res) {
    const thoughts = await Thought.find()

    res.json(thoughts)
})

router.post("/", async function(req, res) {
    const user = await User.findOne({ username: req.body.username })

    if (!user) {
        res.sendStatus(404)
        return
    }

    const thought = await Thought.create(req.body)

    user.thoughts.push(thought._id)
    await user.save()

    res.sendStatus(200)
})

router.get("/:thoughtId", async function(req, res) {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId })
        if (!thought) {
            res.sendStatus(404)
            return
        }
        res.status(200).send(thought)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.delete("/:thoughtId", async function(req, res) {
    Thought.deleteOne({ _id: req.params.thoughtId }).then((result) => {
        if (result.deletedCount) {
            res.sendStatus(200)
        } else {
            res.sendStatus(404)
        }
    })
})

router.put("/:thoughtId", async function(req, res) {
    await Thought.updateOne({ _id: req.params.thoughtId }, req.body)
    res.sendStatus(200)
})

router.post("/:thoughtId/reactions", async function(req, res) {
    console.log(req.body)
    const thought = await Thought.findOne({ _id: req.params.thoughtId })
    if (!thought) {
        res.sendStatus(404)
        return
    }

    try {
        thought.reactions.push(req.body)
        await thought.save()
        res.sendStatus(200)
        return
    } catch (error) {
        res.status(500).send(error.message)
        return
    }
})

export default router