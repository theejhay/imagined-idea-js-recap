import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
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
        // verify token 
        const SECRET = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        
        next();

    } catch (error){
        next(new Error("Invalid or Expired Token"))
    }
}

export default authMiddleware;