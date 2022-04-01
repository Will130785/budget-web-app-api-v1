"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testController = void 0;
const testController = (req, res, next) => {
    console.log('You hit the test route');
    res.status(200).json({
        success: true
    });
};
exports.testController = testController;
