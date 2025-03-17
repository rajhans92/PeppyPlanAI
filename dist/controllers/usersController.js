"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserController {
    constructor() {
    }
    login(req, res) {
        res.status(200).json({ data: "User API call" });
    }
}
exports.default = UserController;
