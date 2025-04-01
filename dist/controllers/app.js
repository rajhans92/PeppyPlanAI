"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dbConnection_1 = __importDefault(require("../config/dbConnection"));
const routes_1 = __importDefault(require("../routes/routes"));
const errorHandler_1 = __importDefault(require("../middlewares/errorHandler"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
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
        console.log("Setup Config....");
        new dbConnection_1.default();
    }
    initMiddlewares() {
        console.log("Setup Middlewares....");
        this.app.use((0, cors_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    initRoutes() {
        console.log("Setup Routes....");
        this.app.use(`/api/${process.env.apiVersion}`, routes_1.default);
    }
    initErrorHandling() {
        console.log("Setup Handlers....");
        this.app.use(errorHandler_1.default.notFound);
        this.app.use(errorHandler_1.default.serverError);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on ${this.host}:${this.port}`);
        });
    }
}
exports.default = App;
