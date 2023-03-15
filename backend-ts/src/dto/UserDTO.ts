import { IUsers } from "../models/Users";

class UserDTO {
    name: string;
    email: string | null;
    password: string;
    role?: number;

    constructor(data :IUsers) {
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
        this.role = data.role
    }
}

export default UserDTO