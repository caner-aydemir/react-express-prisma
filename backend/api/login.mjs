import express from "express";
import prisma from "../lib/prisma.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router()

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"});
}

function generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "7d"})
}


router.post("/login", async (req, res) => {

    const {email , password} = req.body

    const findUser = await prisma.auth.findUnique({
        where:{
            email:email
        }
    })
    if(!findUser)
    {
        return res.status(404).json({message : "Kullanıcı bulunamadı"})
    }
    const isCorrectPassword = await bcrypt.compare(password,findUser.password)
    if(!isCorrectPassword)
    {
        return res.status(401).json({message:"Yanlış şifre"})
    }

    const accessToken = generateAccessToken({id: findUser.id, email: findUser.email})
    const refreshToken = generateRefreshToken({id: findUser.id, email: findUser.email})
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: false,
        maxAge: 7 * 24 * 60 * 60 //7 gün
    })
    res.cookie("test", "testtttttt", {
        httpOnly: true,
        secure:false,
        maxAge: 7 * 24 * 60 * 60 //7 gün
    })

    res.status(200).json({user:findUser,token:accessToken,message:"Login Succesfull"})

})
export default router