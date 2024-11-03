import express from "express";
import prisma from "../lib/prisma.mjs";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const router = express.Router()

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"});
}

function generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "7d"})
}


router.post("/register", async (req, res) => {
    const {name, email, age, password} = req.body
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await prisma.auth.create({
            data: {
                name: name,
                email: email,
                age: age,
                password: hashedPassword,
                createdAt : new Date()
            }
        })
        const accessToken = generateAccessToken({id: newUser.id, email: newUser.email})
        const refreshToken = generateRefreshToken({id: newUser.id, email: newUser.email})
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "none",
            secure: false,
            maxAge: 7 * 24 * 60 * 60 //7 gün
        })
        res.status(201).json({user: newUser, token: accessToken})
    } catch (error) {
        if (error.code === "P2002") {
            return res.status(400).json({ error: "This mail is unavailable" });
        }
        return res.status(500).json({ error: "Server error, please try again later." });    }
})
export default router