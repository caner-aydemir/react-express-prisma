import express from "express"
import prisma from "../lib/prisma.mjs"

const router = express.Router()

router.delete("/deleteUser", async (req, res) => {
    const { name, email, age } = req.body;


    try {
        // Kullanıcıyı veritabanına ekle
        await prisma.user.delete({
            where: {
                email
            }
        });

        res.status(201).json({ status: true, message: "User silindi" });
    } catch (error) {
        return res.status(400).json({ error: "Silinemedi" });
    }
});


export default router;