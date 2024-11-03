import jwt from "jsonwebtoken";
import cookieParser, {JSONCookie, JSONCookies} from "cookie-parser";

function checkRefreshToken(req, res, next) {
    const refreshToken = req.cookies.token
    console.log(req.cookies)

    if (!refreshToken) {
        console.log("No refresh token found, redirecting to login...");
        return res.redirect("/login");
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log("Invalid token, redirecting to login...");
            return res.redirect("/login");
        }

        console.log("Token is valid");
        req.user = user;
        next();
    });
}

export default checkRefreshToken;
