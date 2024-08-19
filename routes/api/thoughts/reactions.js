import { Router } from "express";
import Thought from "../../../models/Thought.js";

const router = Router()

router.post("/:thoughtId/reactions", async function(req, res) {
    const thought = await Thought.findOne({ _id: req.params.thoughtId })
    
    if (!thought) {
        res.sendStatus(404)
        return
    }

    thought.reactions.push(req.body)
    await thought.save()

    res.sendStatus(200)
})

router.delete("/:thoughtId/reactions/:reactionId", async function(req, res) {
    const thought = await Thought.findOne({ _id: req.params.thoughtId })
    
    if (!thought || !thought.reactions.some(el => el._id.toString() === req.params.reactionId)) {
        res.sendStatus(404)
        return
    }

    thought.reactions = thought.reactions.filter(el => el._id.toString() !== req.params.reactionId)
    await thought.save()

    res.sendStatus(200)
})

export default router