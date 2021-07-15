import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

class AuthMiddleware {
    public isValidUser = (req: Request, res: Response, next: NextFunction) => {
        let token = req.header('Authorization');
        try {
            if (!token) {
                return res.status(401).send("Unauthorized!");
            }
            const tokenSecret = String(process.env.TOKEN_SECRET);
            const isVerified = jwt.verify(token, tokenSecret);
            if (!isVerified) {
                return res.status(401).send("Unauthorized!");
            }
            next();
        }
        catch (err) {
            res.status(400).send("Invalid Token");
        }
    }
}
export const authMiddleware = new AuthMiddleware();
