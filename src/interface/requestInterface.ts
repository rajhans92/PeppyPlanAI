import {Secret, JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export interface CustomRequest extends Request {
    user: string | JwtPayload;
}

export default CustomRequest;