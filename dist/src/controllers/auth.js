"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const user_1 = require("../dataAccess/user");
const auth_1 = require("../auth/auth");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Get user data
    const userData = req.body;
    try {
        // Check if user exists
        const foundUser = yield (0, user_1.getByUsername)(userData.username);
        if (foundUser) {
            res.status(403).json({
                msg: 'Username taken'
            });
        }
        else {
            // If no user then go ahead and create the new one
            // Hash password
            const passwordHashed = yield (0, auth_1.hashPassword)(userData.password);
            // Update password on userData
            userData.password = passwordHashed;
            // Create new user
            User_1.default.create(userData, (err, newUser) => {
                if (!err) {
                    console.log(newUser);
                    res.status(201).json({
                        success: true,
                        user: newUser
                    });
                }
                else {
                    res.status(400).json({
                        success: false
                    });
                }
            });
        }
    }
    catch (err) {
        res.status(400).json({
            success: false
        });
    }
});
exports.register = register;
