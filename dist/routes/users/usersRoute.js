"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = __importDefault(require("../../controllers/usersController"));
class UserRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.userController = new usersController_1.default;
        this.initRoutes();
    }
    initRoutes() {
        this.router.get("/login", this.userController.login);
    }
}
exports.default = new UserRoute().router;
