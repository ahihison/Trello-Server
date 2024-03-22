import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: JwtPayload | undefined;
      
    }
  }
}
const verifyTokenMiddleware = {
    verifyToken : (req: Request, res: Response, next: NextFunction): void => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
   
        const token = req.header('token');
        if (token){
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_SECRET as string, (err, user) => {
                if (err) {
                    res.status(403).json("Token is not valid");
                } else if (user && typeof user !== 'string') {
                    req.user = user;
                    next();
                } else {
                    res.status(403).json("Invalid token payload");
                }
                
            });
        } else {
            res.status(401).json("You are not authenticated");
        }
    },
    verifyTokenAdmin:(req: Request, res: Response, next: NextFunction): void => {
        verifyTokenMiddleware.verifyToken(req, res, () => {

            if (req.user && req.user.admin)
            {
                next();
            } else {
                return res.status(StatusCodes.FORBIDDEN).json("You are not to do that!");
            }
        });
    }
};
 
export default verifyTokenMiddleware;