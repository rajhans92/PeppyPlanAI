import { Request, Response } from "express";

class UserController{
    constructor(){

    }

    public login(req: Request, res: Response){
        res.status(200).json({data: "User API call"});
    }
}

export default UserController;