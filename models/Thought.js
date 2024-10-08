import { model, Schema } from "mongoose";

const reactionSchema = new Schema(
    {
        reactionBody: {
            type: String,
            required: true,
            validate: {
                validator: (v) => v.length < 280
            }
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: (v) => v.toLocaleString()
        }
    }
)

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            validate: {
                validator: (v) => v.length > 0 && v.length < 280
            }
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: (v) => v.toLocaleString()
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    }
)

const Thought = model("Thought", thoughtSchema)

export default Thought