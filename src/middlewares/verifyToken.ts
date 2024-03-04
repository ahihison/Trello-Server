import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const token = req.header('token');
    if (token){
        const accessToken = token.split(" ")[1];
        jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
          
        });
    }
};