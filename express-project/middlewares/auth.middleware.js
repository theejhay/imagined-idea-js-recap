import jwt from "jsonwebtoken";
import * as blacklistService from "../services/blacklist.service.js";

const authMiddleware = async (req, res, next) => {
    // check if header exists
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return next(new Error("Authorization header missing"));
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // validate token exist 
    if(!token){
        return next(new Error("Token missing"));
    }

    // validate token 

    try {

        // cleanup old blacklist tokens
        await blacklistService.cleanupExpiredToken();

        // check blacklist
        const blackListToken = await blacklistService.isBlacklisted(token);
        if(blackListToken){
            return res.status(401).json({
                success: false,
                message: "Token has been invalidated"
            })
        }
        // verify token 
        const SECRET = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        
        next();

    } catch (_error){
        next(new Error("Invalid or Expired Token"))
    }
}

export default authMiddleware;