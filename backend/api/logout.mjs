import express from "express";

const router = express.Router()

router.post("/logout", async (req, res) => {
    try {

            res.clearCookie("refreshToken", {
                httpOnly: true,
                sameSite: "none",
                secure: false // Yerel geliştirme için `false` yapabilirsiniz
            });

        res.status(200).json({status: true, message: "Logged out successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({status: false, message: "Something went wrong"})

    }

})

export default router