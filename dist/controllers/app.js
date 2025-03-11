"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.host = process.env.host || "http://localhost";
        this.port = parseInt(process.env.PORT || "3000");
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on ${this.host}:${this.port}`);
        });
    }
}
exports.default = App;
