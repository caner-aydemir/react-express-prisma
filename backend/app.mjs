import express from "express"
import cors from 'cors';
import cookieParser from 'cookie-parser'; // cookie-parser'ı import edin
import dotenv from 'dotenv';
import getUserRoutes from './api/getUser.mjs';
import addUserRoutes from "./api/addUser.mjs"
import deleteUserRoutes from "./api/deleteUser.mjs"
import updateUserRoutes from "./api/updateUser.mjs"
import registerUserRoutes from "./api/register.mjs"
import logoutRoutes from "./api/logout.mjs"
import loginRoutes from "./api/login.mjs"
import checkRefreshToken from "./middlewares/checkRefreshToken.mjs"; // Middleware dosyasının yolu

const app = express();

dotenv.config();

app.use(cors({
    origin: "http://localhost:3000", // İzin verilen origin
    credentials: true // Çerezlerin gönderilmesine izin verir
}));
app.use(express.json()); // JSON body'leri işlemek için middleware ekleyin
app.use(cookieParser()); // cookie-parser'ı kullanın

app.get("/", checkRefreshToken, (req, res) => {
    res.json(req.cookies);
})

app.use("/api", addUserRoutes)
app.use("/api", getUserRoutes)
app.use("/api", deleteUserRoutes)
app.use("/api", updateUserRoutes)
app.use("/api", registerUserRoutes)
app.use("/api", logoutRoutes)
app.use("/api", loginRoutes)

export default app; // Vercel'in kendi sunucusuyla çalışması için uygulamayı dışa aktarın
