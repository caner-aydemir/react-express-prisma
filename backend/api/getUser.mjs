import express from "express";
import prisma from "../lib/prisma.mjs"

const router = express.Router();

router.get("/users", async (req, res) => {
    const allUser = await prisma.user.findMany({
        orderBy: { id: "desc" }
    })
    res.json(allUser);
});

export default router; 