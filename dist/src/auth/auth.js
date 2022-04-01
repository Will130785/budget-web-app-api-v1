"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHashedPassword = exports.hashPassword = exports.generateClientJWTToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateClientJWTToken = (id, secret) => {
    return jsonwebtoken_1.default.sign({
        id,
        iat: new Date().getTime(),
        exp: new Date().setHours(new Date().getHours() + 1)
    }, secret);
};
exports.generateClientJWTToken = generateClientJWTToken;
const hashPassword = (password) => {
    return bcrypt_1.default.hash(password, 10);
};
exports.hashPassword = hashPassword;
const compareHashedPassword = (password, hashedPassword) => {
    return bcrypt_1.default.compare(password, hashedPassword);
};
exports.compareHashedPassword = compareHashedPassword;
