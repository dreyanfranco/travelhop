import { Request } from 'express';
import expressJwt, { RequestHandler } from 'express-jwt';

// Define your secret key
const secretKey = 'helloworld';

// Create a function to get the token from headers
function getTokenFromHeaders(req: Request) {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        const token = req.headers.authorization.split(' ')[1];
        return token;
    }
    return null;
}

// Define the options for expressJwt as a RequestHandler
const jwtOptions: RequestHandler = (req, res, next) => {
    return {
        secret: secretKey,
        algorithms: ['HS256'],
        requestProperty: 'payload',
        getToken: getTokenFromHeaders,
    };
};

// Create the isAuthenticated middleware
const isAuthenticated = expressJwt(jwtOptions);

export { isAuthenticated };
