"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appConfig_1 = __importDefault(require("./appConfig"));
const appStart_1 = __importDefault(require("./appStart"));
const dbConnect_1 = __importDefault(require("./dbConnect"));
exports.default = (app) => {
    (0, dbConnect_1.default)();
    (0, appConfig_1.default)(app);
    (0, appStart_1.default)(app);
};
