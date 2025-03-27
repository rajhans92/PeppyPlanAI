import { Router } from "express";
import UserController from "../../controllers/usersController";

class UserRoute{

    public readonly router: Router;
    private readonly userController: UserController;

    constructor() {
      this.router = Router();
      this.userController = new UserController;
      this.initRoutes();
    }

    private initRoutes(){
        this.router.get("/login", this.userController.login);
    }

}

export default new UserRoute().router;