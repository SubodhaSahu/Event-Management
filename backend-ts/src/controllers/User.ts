import { Request, Response } from "express";

import userService from "../services/User";
import wrapAsync from "../utils/AsynchErrorHandle";
import { HttpCode, config } from "../config/config";


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

export default {readAll, getUserById, updateUserById, deleteUserById}
