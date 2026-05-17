import "dotenv/config";
import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
    console.log(req.cookies);
    console.log(req.headers.cookie);
    try {

        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "No token found"
            });
        }

        const verifyToken = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if (!verifyToken) {
            return res.status(401).json({
                message: "Invalid token"
            });
        }

        req.userId = verifyToken.userId;

        next();

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Authentication error"
        });
    }
};

export default isAuth;