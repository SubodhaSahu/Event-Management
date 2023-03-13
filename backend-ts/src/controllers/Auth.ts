import express, {Request, Response} from 'express';
import jwt from "jsonwebtoken";
import wrapAsync from "../utils/AsynchErrorHandle";
import userService from "../services/User";
import { HttpCode, config } from "../config/config";

interface IGetLoginRequest extends Request {
    email: string // or any other type
    password: string
}

const login = wrapAsync(async (req: IGetLoginRequest, res: Response) => {
    const { email, password } = req.body;
    const userDetails = await userService.getUserByEmail(email);
    
    //user exist
    if (userDetails) {
        const match = await userService.validateCredential(email, password);
        if (match) {
            const role = userDetails.role == 1 ? 'Admin' : 'User';
           
            // Issue token
            const userId = userDetails.id;
            const secretKey = config.SECRET_KEY;
            const payload = { userId };
            const token = jwt.sign(payload, config.SECRET_KEY, {
                expiresIn: 60
            });
            const refreshToken = jwt.sign(payload, config.SECRET_KEY, {
                expiresIn: '1d'
            });

            res.status(HttpCode.OK).json({
                success: true,
                message: 'Login successful',
                userInfo: { name: userDetails.name, email, role },
                token: token,
                refreshToken: refreshToken
            });
        } else {
            res.status(HttpCode.UNAUTHORIZED).json({ success: false, message: 'Invalid Credential' });
        }
    } else {
        res.status(HttpCode.UNAUTHORIZED).json({ success: false, message: 'Invalid Credential' });
    }
});

interface JwtPayload {
    userId: string
}
  

const getRefreshToken = wrapAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    try {
        const decodedToken = jwt.verify(refreshToken, config.SECRET_KEY)  as JwtPayload;
        const userId = decodedToken.userId;
        
        const secretKey = config.SECRET_KEY;
        const payload = { userId };
        const token = jwt.sign(payload, config.SECRET_KEY, {
            expiresIn: '1h'
        });
        const newRefreshToken = jwt.sign(payload, config.SECRET_KEY, {
            expiresIn: '1d'
        });

        res.status(HttpCode.OK).json({
            token,
            refreshToken: newRefreshToken
        });
    } catch (error) {
        let errorMsg = (error as any)?.message || 'Unexpected Error';
        return res.status(HttpCode.UNAUTHORIZED).json({ message: errorMsg });
    }


})

export default { login, getRefreshToken };