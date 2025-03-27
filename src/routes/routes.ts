import { Router } from "express";
import UserRoute from "./users/usersRoute";

class Routers{

    public readonly router: Router;
    constructor(){
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes(){
        this.router.use("/user",UserRoute);
    }
}

export default new Routers().router;