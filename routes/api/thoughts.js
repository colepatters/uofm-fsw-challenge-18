import { Router } from "express";
import Thought from "../../models/Thought.js";

const router = Router()

router.get("/", async function(req, res) {
    const thoughts = await Thought.find().populate("user", ["_id", "username"])

    res.json(thoughts)
})

router.post("/", async function(req, res) {
    console.log(req.body)
    const thought = Thought.create(req.body)

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