// src/utils/jwt.ts
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import {CustomRequest} from "../interface/requestInterface";


class JWT{

    private readonly JWT_SECRET: string;
    private readonly JWT_LIFETIME: any;

    constructor(){
        this.JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
        this.JWT_LIFETIME = process.env.JWT_LIFETIME || "2d";
    }




    // Function to generate JWT token
    public generateToken = (userId: string, email: string) => {
        return jwt.sign({ userId, email }, this.JWT_SECRET, { expiresIn: this.JWT_LIFETIME });
    };

    // Middleware to verify JWT token
    public authenticateJWT = (req: Request, res: Response, next: NextFunction): any => {
        const token = req.headers["authorization"]?.split(" ")[1]; // Extract Bearer token

        if (!token) {
            return res.status(401).json({ message: "Access Denied: No token provided" });
        }

        jwt.verify(token, this.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Invalid token" });
            }
            
            (req as CustomRequest).user = decoded || '';
            
            next();
        });
    };
}

export default new JWT();