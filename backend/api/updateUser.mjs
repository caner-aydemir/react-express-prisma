import express from "express";
import prisma from "../lib/prisma.mjs";

const router = express.Router()

router.put("/updateUser", async (req, res) => {
    const {name, age, email, id} = req.body;

    try {
        await prisma.user.updateMany({
            where: {id: id},
            data: {
                name: name,
                age: age
            }
        })
        res.status(201).json({status: true, message: "User Güncellendi"});
    } catch (error) {
        res.status(400).json({status: false, error: error});
    }
})

export default router