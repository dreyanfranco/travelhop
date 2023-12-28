import bcrypt from 'bcryptjs';
import { Request, Response, Router } from 'express';
import User from "../models/User.model";
export const router = Router();
const salt = bcrypt.genSaltSync(10);


router.post("/auth/register", async (req: Request, res: Response) => {
    try {
        const user = req.body;

        const { username, email, password } = user;

        const isEmailAllReadyExist = await User.findOne({
            email: email,
        });

        if (isEmailAllReadyExist) {
            res.status(400).json({
                status: 400,
                message: "Email all ready in use",
            });
            return;
        }

        const newUser = await User.create({
            username,
            email,
            password: bcrypt.hashSync(password, salt),
        });

        res.status(200).json({
            status: 201,
            success: true,
            message: "User created Successfully",
            user: newUser,
        });
    } catch (error: any) {
        console.log(error);

        res.status(400).json({
            status: 400,
            message: error.message.toString(),
        });
    }
});

router.post("/auth/login", async (req: Request, res: Response) => {
    try {
        const user = req.body;

        const { email, password } = user;

        const isUserExist = await User.findOne({
            email: email,
        });

        if (!isUserExist) {
            res.status(404).json({
                status: 404,
                success: false,
                message: "User not found",
            });
            return;
        }

        const isPasswordMatched =
            isUserExist?.password === password;

        if (!isPasswordMatched) {
            res.status(400).json({
                status: 400,
                success: false,
                message: "wrong password",
            });
            return;
        }

        // ** if the email and password is valid create a token

        /*
        To create a token JsonWebToken (JWT) receive's 3 parameter
        1. Payload -  This contains the claims or data you want to include in the token.
        2. Secret Key - A secure key known only to the server used for signing the token.
        3. expiration -  Additional settings like token expiration or algorithm selection.
        */

        // !! Don't Provide the secret openly, keep it in the .env file. I am Keeping Open just for demonstration

        // ** This is our JWT Token
        // const token = jwt.sign(
        //     { _id: isUserExist?._id, email: isUserExist?.email },
        //     "YOUR_SECRET",
        //     {
        //         expiresIn: "1d",
        //     }
        // );

        res.status(200).json({
            status: 200,
            success: true,
            message: "login success",
            // token: token,
        });
    } catch (error: any) {
        res.status(400).json({
            status: 400,
            message: error.message.toString(),
        });
    }
});