import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userService from "../services/User";
import wrapAsync from "../utils/AsynchErrorHandle";
import { HttpCode, config } from "../config/config";

const hashPassword = async (pw : string):Promise<string> => {
    const saltRounds = 10; //The cost of processing the data
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = await bcrypt.hash(pw, salt);
    return hash;
};


const createUser = wrapAsync(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const hasPassword = await hashPassword(password);
   
    const userObj = { name: name, email: email, password: hasPassword }
    const user = await userService.createUser(userObj);
    res.status(HttpCode.CREATED).json(user);
});

const readAll = wrapAsync(async (req: Request, res: Response) => { 
    const users = await userService.getAll();
    return res.status(HttpCode.OK).json({ users });
})

const getUserById = wrapAsync(async (req: Request, res: Response) => { 
    const userId = req.params.userId;
    
    const user = await userService.getUserById(Number(userId));
    return res.status(HttpCode.OK).json({ user });
})

const updateUserById = wrapAsync(async (req: Request, res: Response) => { 
    const userId = req.params.userId;
    const { name, email } = req.body;
    const userObj = { name: name, email: email }

    const userExist = await userService.getUserById(Number(userId));
    
    if (userExist) {
        const user = await userService.updateUserById(Number(userId), userObj);
        return res.status(HttpCode.OK).json({ user });
    } else {
        return res.status(HttpCode.OK).json({ message: 'Wrong User Id' });
    }
    
})

const deleteUserById  = wrapAsync(async (req: Request, res: Response) => {
    const userId = req.params.userId;

    const userExist = await userService.getUserById(Number(userId));
    if (userExist) {
        const user = await userService.deleteUserById(Number(userId));
        return res.status(200).json({ user, message: 'User deleted' });
    } else {
        return res.status(HttpCode.OK).json({ message: 'Wrong User Id' });
    }
})

const login = wrapAsync(async (req: Request, res: Response) => {
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
            res.status(HttpCode.OK).json({
                success: true,
                message: 'Login successful',
                userInfo: { name: userDetails.name, email, role },
                token: token
            });
        } else {
             res.status(HttpCode.UNAUTHORIZED).json({success: false,message: 'Invalid Credential'});
        }      
    } else {
        res.status(HttpCode.UNAUTHORIZED).json({success: false,message: 'Invalid Credential'});
    }
})

export default {readAll, createUser, getUserById, updateUserById, deleteUserById, login}
