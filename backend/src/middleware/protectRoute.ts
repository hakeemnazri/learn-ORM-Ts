import jwt, { JwtPayload } from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";
import prisma from "../db/prisma.js"

interface DecodedToken extends JwtPayload {
    userId : string;
}

declare global {
    namespace Express {
        export interface Request{
            user: {
                id: string;
            }
        }
    }
}

const protectRoute = async( req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.cookies.jwt;

        if(!token){
            res.status(401).json({ error: "Unauthorized" })
            return
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

        if(!decoded){
            res.status(401).json({ error: "Unauthorized - Invalid Token"})
            return
        }

        const user = await prisma.user.findUnique({ where: {id: decoded.userId}, select:{
            id: true,
            fullName: true,
            username: true,
            profilePic: true
        }})

        if(!user){
            res.status(401).json({ error: "User not found"})
            return
        }

        req.user = user;

        next()
        
    } catch (error: any) {
        console.log("Error at protectRoute middleware", error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}

export default protectRoute