import { Router } from "express";
import UserController from "../../controllers/usersController";
import jwt from "../../middlewares/jwt";

class UserRoute{

    public readonly router: Router;
    private readonly userController: UserController;

    constructor() {
      this.router = Router();
      this.userController = new UserController();
      this.initRoutes();
    }

    private initRoutes(){
        this.router.get("/login/auth/google", this.userController.loginAuth);
        this.router.get("/login/auth/google/callback", this.userController.loginAuthCallback);

        this.router.get("/profile", jwt.authenticateJWT,this.userController.userProfile);
    }

}

export default new UserRoute().router;