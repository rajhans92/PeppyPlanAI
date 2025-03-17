"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dbConnection_1 = __importDefault(require("../config/dbConnection"));
const routes_1 = __importDefault(require("../routes/routes"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        dotenv_1.default.config();
        this.host = process.env.host || "http://localhost";
        this.port = parseInt(process.env.PORT || "3000");
        this.init();
    }
    init() {
        this.initConfig();
        this.initMiddlewares();
        this.initRoutes();
        this.initErrorHandling();
    }
    initConfig() {
        new dbConnection_1.default();
    }
    initMiddlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    initRoutes() {
        this.app.use(`/api/${process.env.apiVersion}`, routes_1.default);
    }
    initErrorHandling() {
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on ${this.host}:${this.port}`);
        });
    }
}
exports.default = App;
