import express from "express";
import "dotenv/config"
import routes from "./routes/index.js"

import { db } from "./config/db.js";

const app = express()

app.use(express.json())
app.use(routes)

// wait for db connection
await db

const port = process.env.PORT ?? 3001
app.listen(port, () => {
    console.log("Server listening at http://127.0.0.1:" + port)
})