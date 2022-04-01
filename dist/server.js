"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
const { NODE_ENV } = process.env;
console.log(NODE_ENV);
// Set env file to use
const envPath = NODE_ENV === 'production' ? '.env' : `.env.${NODE_ENV}`;
console.log(envPath);
dotenv_1.default.config({
    path: envPath
});
// Start app by passing express app object
const index_1 = __importDefault(require("./src/app/index"));
(0, index_1.default)(app);
