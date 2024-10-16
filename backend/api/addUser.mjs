import express from "express"
import prisma from "../lib/prisma.mjs"

const router = express.Router()

router.post("/addUser", async (req, res) => {
    const { name, email, age } = req.body;

    try {
        // Kullanıcıyı veritabanına ekle
        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                age: Number(age),
            },
        });


        // Başarılı olursa yeni kullanıcıyı dön
        res.status(201).json(newUser);
    } catch (error) {
        if (error.code === "P2002") {
            return res.status(400).json({ error: "This mail is unavailable" });
        }
        return res.status(500).json({ error: "Server error, please try again later." });
    }
});


export default router;