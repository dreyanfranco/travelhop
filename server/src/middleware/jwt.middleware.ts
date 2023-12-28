// import { Request } from 'express';
// import expressJwt, { RequestHandler } from 'express-jwt';

// // Define your secret key
// const secretKey = 'helloworld';

// // Create a function to get the token from headers
// function getTokenFromHeaders(req: Request) {
//     if (
//         req.headers.authorization &&
//         req.headers.authorization.split(' ')[0] === 'Bearer'
//     ) {
//         const token = req.headers.authorization.split(' ')[1];
//         return token;
//     }
//     return null;
// }

// // Define the options for expressJwt as a RequestHandler
// const jwtOptions: RequestHandler = () => {
//     return {
//         secret: secretKey,
//         algorithms: ['HS256'],
//         requestProperty: 'payload',
//         getToken: getTokenFromHeaders,
//     };
// };

// // Create the isAuthenticated middleware
// const isAuthenticated = expressJwt(jwtOptions);

// export { isAuthenticated };


import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction): any => {
    if (!req.headers.authorization) {
        return res.status(401).send("No token!");
    }

    let secretKey = process.env.JWT_SECRET_KEY || "secret";
    const token: string = req.headers.authorization.split(" ")[1];

    try {
        const credential: string | object = jwt.verify(token, secretKey);
        if (credential) {
            req.app.locals.credential = credential;
            return next();
        }
        return res.send("token invalid");
    } catch (err) {
        return res.send(err);
    }
};
