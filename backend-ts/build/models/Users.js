"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const UserSchema = new mongoose_1.Schema({
    id: { type: Number, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 5 },
    role: { type: Number, enum: [1, 2], default: 2 } //1 For Admin and 2 For User role type
}, {
    versionKey: false
});
//generate the auto generated Id before save
UserSchema.pre("save", function (next) {
    let docs = this;
    mongoose_1.default.model('User', UserSchema).countDocuments(function (error, counter) {
        if (error)
            return next(error);
        docs.id = counter + 1;
        next();
    });
});
//Get the minimum field while creating/fetching a user
UserSchema.method('getPublicFields', function getPublicFields() {
    var _a;
    return {
        id: (_a = this.id) !== null && _a !== void 0 ? _a : '',
        name: this.name,
        email: this.email,
        role: this.role == 2 ? 'User' : 'Admin'
    };
});
exports.default = (0, mongoose_1.model)('Users', UserSchema);
