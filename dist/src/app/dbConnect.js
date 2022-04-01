"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const env_config_1 = __importDefault(require("../../env.config"));
const DB_CONNECT = env_config_1.default.DB_CONNECT;
exports.default = () => {
    try {
        mongoose_1.default.connect(DB_CONNECT);
        // Check db connection
        const db = mongoose_1.default.connection;
        db.once('open', () => {
            console.log('Connected to mongo');
        });
        db.on('error', () => {
            console.log('Error connection to mongo');
        });
    }
    catch (err) {
        console.log('Error connecting to Mongo');
    }
};
