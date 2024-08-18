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
    const thought = Thought.find({ _id: req.params.thoughtId })
    if (!thought) {
        res.sendStatus(404)
        return
    }

    res.json(thought)
})

router.post("/:thoughtId/reactions", async function(req, res) {
    console.log(req.body)

})

export default router