import { Router } from "express";
import User from "../../../models/User.js";

const router = Router()

router.post("/:userId/friends/:friendId", async function(req, res) {
    console.log(req.params)

    const user = await User.findOne({ _id: req.params.userId })
    const friend = await User.findOne({ _id: req.params.friendId })

    if (!user || !friend) {
        res.sendStatus(404);
        return
    }

    console.log(user.friends)

    if (user.friends.find(el => el._id.toString() === friend._id.toString())) {
        res.sendStatus(400)
        return 
    }

    user.friends.push(friend._id)
    await user.save()

    res.sendStatus(200)
})

router.delete("/:userId/friends/:friendId", async function(req, res) {
    const user = await User.findOne({ _id: req.params.userId })

    if (!user) {
        res.sendStatus(404);
        return
    }

    user.friends = user.friends.filter((el) => el._id.toString() !== req.params.friendId)
    await user.save()

    res.sendStatus(200)    
})

export default router