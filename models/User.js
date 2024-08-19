import { model, Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    {
        virtuals: {
            friendCount: {
                get() {
                    return this.friends.length
                }
            }
        }
    }
)

userSchema.pre(/^find/, function() {
    this.populate("thoughts")
    this.populate("friends")
})

const User = model('User', userSchema)
export default User