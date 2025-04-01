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
Object.defineProperty(exports, "__esModule", { value: true });
class UserController {
    constructor() {
        this.loginAuth = (req, res) => {
            const state = "some_state";
            const scopes = this.GOOGLE_OAUTH_SCOPES.join(" ");
            const GOOGLE_OAUTH_CONSENT_SCREEN_URL = `${this.GOOGLE_OAUTH_URL}?client_id=${this.GOOGLE_CLIENT_ID}&redirect_uri=${this.GOOGLE_CALLBACK_URL}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`;
            res.redirect(GOOGLE_OAUTH_CONSENT_SCREEN_URL);
        };
        this.loginAuthCallback = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("req.query => ", req.query);
            const { code } = req.query;
            const data = {
                code,
                client_id: this.GOOGLE_CLIENT_ID,
                client_secret: this.GOOGLE_CLIENT_SECRET,
                redirect_uri: this.GOOGLE_CALLBACK_URL,
                grant_type: "authorization_code",
            };
            // exchange authorization code for access token & id_token
            const response = yield fetch(this.GOOGLE_ACCESS_TOKEN_URL, {
                method: "POST",
                body: JSON.stringify(data),
            });
            const access_token_data = yield response.json();
            console.log("access_token_data => ", access_token_data);
            const { id_token } = access_token_data;
            const token_info_response = yield fetch(`${process.env.GOOGLE_TOKEN_INFO_URL}?id_token=${id_token}`);
            const { email, email_verified, name, picture, given_name, family_name } = yield token_info_response.json();
            res.status(200).json({ token_info_response: { email, email_verified, name, picture, given_name, family_name } });
        });
        this.GOOGLE_OAUTH_URL = process.env.GOOGLE_OAUTH_URL || '';
        this.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
        this.GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || '';
        this.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
        this.GOOGLE_ACCESS_TOKEN_URL = process.env.GOOGLE_ACCESS_TOKEN_URL || '';
        this.GOOGLE_OAUTH_SCOPES = [
            "https%3A//www.googleapis.com/auth/userinfo.email",
            "https%3A//www.googleapis.com/auth/userinfo.profile"
        ];
    }
    login(req, res) {
        res.status(200).json({ data: "User API call" });
    }
}
exports.default = UserController;
