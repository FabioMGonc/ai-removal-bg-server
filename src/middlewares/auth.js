import { verifyToken } from "@clerk/express";

const authUser = async (req, res, next) => {

    try {
        const { token } = req.headers;
        if (!token) {
            return res.status(401).json({ success: false, message: "Não Autorizado!" });
        }
        const token_decoded = await verifyToken(token, {
            secretKey: process.env.CLERK_SECRET_KEY,
        });
        
        req.clerkId = token_decoded.sub;
        next();
        
    } catch (error) {
        console.error(error.message);
        res.status(400).json({
            sucess: false,
            message: error.message,
        });
    }
    
}

export default authUser;
