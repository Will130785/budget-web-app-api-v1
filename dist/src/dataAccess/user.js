"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByUsername = void 0;
const User_1 = __importDefault(require("../models/User"));
const getByUsername = (username) => {
    return User_1.default.findOne({ username });
};
exports.getByUsername = getByUsername;
