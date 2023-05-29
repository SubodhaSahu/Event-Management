"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDTO {
    constructor(data) {
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
        this.role = data.role;
    }
}
exports.default = UserDTO;
