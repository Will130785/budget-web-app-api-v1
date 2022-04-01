"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const index_1 = __importDefault(require("../controllers/index"));
const express_validation_1 = require("express-validation");
// Test route
router.get('/test', index_1.default.testController);
// Auth routes
router.post('/register', (0, express_validation_1.validate)({
    body: express_validation_1.Joi.object({
        username: express_validation_1.Joi.string().required(),
        password: express_validation_1.Joi.string().required(),
        confirmPassword: express_validation_1.Joi.any().valid(express_validation_1.Joi.ref('password')).required()
    }).options({ presence: 'required' })
}, {}, {}), index_1.default.register);
exports.default = router;
