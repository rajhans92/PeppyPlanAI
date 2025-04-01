import { Request, Response, NextFunction } from "express";
import User from "../schema/userSchema";
import jwt from "../middlewares/jwt";
import { profile } from "console";

class UserController{

    private readonly GOOGLE_OAUTH_URL : string;
    private readonly GOOGLE_CLIENT_ID : string;
    private readonly GOOGLE_CALLBACK_URL : string;
    private readonly GOOGLE_CLIENT_SECRET : string;
    private readonly GOOGLE_OAUTH_SCOPES : string[];
    private readonly GOOGLE_ACCESS_TOKEN_URL: string;

    constructor(){
        
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

    public login(req: Request, res: Response, next: NextFunction){
        try{
            res.status(200).json({data: "User API call"});
        }catch(error: unknown){
            next(error);
        }
    }

    public loginAuth = (req: Request, res: Response, next: NextFunction) => {
        try{
            const state = "some_state";
            const scopes = this.GOOGLE_OAUTH_SCOPES.join(" ");
            const GOOGLE_OAUTH_CONSENT_SCREEN_URL = `${this.GOOGLE_OAUTH_URL}?client_id=${this.GOOGLE_CLIENT_ID}&redirect_uri=${this.GOOGLE_CALLBACK_URL}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`;

            res.redirect(GOOGLE_OAUTH_CONSENT_SCREEN_URL);
        }catch(error: unknown){
            return next(error);
        }
    }

    public loginAuthCallback = async (req: Request, res: Response, next: NextFunction) => {
        // console.log("req.query => ", req.query);
        try{
            const { code } = req.query;

            if(!code){
                return next({statusCode:401, message: "Invalid api call"})
            }

            const data = {
                code,

                client_id: this.GOOGLE_CLIENT_ID,

                client_secret: this.GOOGLE_CLIENT_SECRET,

                redirect_uri: this.GOOGLE_CALLBACK_URL,

                grant_type: "authorization_code",
            };

            // exchange authorization code for access token & id_token

            const response = await fetch(this.GOOGLE_ACCESS_TOKEN_URL, {
                method: "POST",
                body: JSON.stringify(data),
            });

            const access_token_data = await response.json();

            // console.log("access_token_data => ", access_token_data);

            const { id_token } = access_token_data;

            const token_info_response = await fetch(
                `${process.env.GOOGLE_TOKEN_INFO_URL}?id_token=${id_token}`
            );

            const {email, email_verified, name, picture, given_name, family_name} = await token_info_response.json();

            let userDetail = await User.findOne({ email });

            if (userDetail) {
                await User.updateOne({email:email},{lastLogin: new Date()});
            }else{
                userDetail = new User({
                    email,
                    firstName: given_name,
                    lastName: family_name,
                    profilePicture: picture,
                    isEmailVerified: true,
                    isOauth: true,
                    lastLogin: new Date()
                });
        
                await userDetail.save();
        
            }

            const userId: string| any  = userDetail._id || '';
            

            const token = jwt.generateToken(userId,userDetail.email);
            // res.status(201).json({ token });
            
            res.status(200).json({profile: {email, name, picture, given_name, family_name}, token});

        }catch(error: unknown){
           return next(error);
        }
    }

    public userProfile = async (req: Request, res: Response, next: NextFunction) => {
        try {
            
            let userObj: any = req;
            if(!userObj.user){
                return next({status:401,message:"Invalid User Profile"});
            }

            let userDetail = await User.findOne({ _id: userObj.user.userId },'_id email firstName lastName profilePicture lastLogin createdAt updatedAt');

            res.status(200).json(userDetail);

        } catch (error: unknown) {
            return next(error);
        }
    }
}

export default UserController;