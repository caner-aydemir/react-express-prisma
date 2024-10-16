import express from "express"
import cors from 'cors';
import getUserRoutes from './api/getUser.mjs';
import addUserRoutes from "./api/addUser.mjs"
import deleteUserRoutes from "./api/deleteUser.mjs"
import updateUserRoutes from "./api/updateUser.mjs"
import { PrismaClient } from "@prisma/client"

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json()); // JSON body'leri işlemek için middleware ekleyin


app.get("/", (req, res) => {
    res.json("Homepage")
})

app.use("/api", addUserRoutes)
app.use("/api", getUserRoutes)
app.use("/api", deleteUserRoutes)
app.use("/api", updateUserRoutes)

app.listen(PORT, () => {
    console.log("5000 portu dinleniyor")
})