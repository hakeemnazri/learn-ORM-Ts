import express from "express"

const router = express.Router()

router.get("/conversations", (req, res) => {
    res.send("Conversation Route")
})

export default router