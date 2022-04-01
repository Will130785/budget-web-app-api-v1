"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testController_1 = require("./testController");
const auth_1 = require("./auth");
exports.default = {
    testController: testController_1.testController,
    register: auth_1.register
};
