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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: '.env.test'
});
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const app_1 = __importDefault(require("../../src/app"));
(0, app_1.default)(app);
describe('Integration test for test route', () => {
    test('Recieve 200 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get('/test');
        expect(res.statusCode).toEqual(200);
    }));
});
describe('Integration tests for auth routes', () => {
    test('Recieve 400 status code when no data sent', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post('/register');
        expect(res.statusCode).toEqual(400);
    }));
    test('Recieve 400 status code when passwords dont match', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post('/register')
            .send({
            username: 'Will130785',
            password: 'test',
            confirmPassword: 'test123'
        });
        expect(res.statusCode).toEqual(400);
    }));
    test('Recieve 201 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post('/register')
            .send({
            username: 'Will130785',
            password: 'test',
            confirmPassword: 'test'
        });
        expect(res.statusCode).toEqual(201);
    }));
    test('Recieve 403 status code when trying to add existing username', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post('/register')
            .send({
            username: 'Will130785',
            password: 'test',
            confirmPassword: 'test'
        });
        expect(res.statusCode).toEqual(403);
        expect(res.body.msg).toEqual('Username taken');
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.disconnect();
}));
