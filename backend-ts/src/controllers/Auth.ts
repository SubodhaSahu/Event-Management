import express, {NextFunction, Request, Response} from 'express';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import wrapAsync from "../utils/AsynchErrorHandle";
import userService from "../services/User";
import { HttpCode, config } from "../config/config";

const hashPassword = async (pw : string):Promise<string> => {
    const saltRounds = 10; //The cost of processing the data
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = await bcrypt.hash(pw, salt);
    return hash;
};

const signup = wrapAsync(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const hasPassword = await hashPassword(password);
   
    const userObj = { name: name, email: email, password: hasPassword }
    const user = await userService.createUser(userObj);
    res.status(HttpCode.CREATED).json(user);
});

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
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
                    expiresIn: '1h'
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
    } catch (err) {
        next(err);
    }
};

interface JwtPayload {
    userId: string
}
  

const getRefreshToken = wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
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
        //next(error);
        let errorMsg = (error as any)?.message || 'Unexpected Error';
        return res.status(HttpCode.UNAUTHORIZED).json({ message: errorMsg });
    }


})

export default { login, signup, getRefreshToken };