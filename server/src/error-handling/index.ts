import { Request, Response } from 'express';

export const notFoundHandler = (
    req: Request,
    res: Response
) => {
    res.status(404).json({ message: 'This route does not exist' })
}

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
) => {
    console.error('ERROR', req.method, req.path, err);

    if (!res.headersSent) {
        res.status(500).json({
            message: 'Internal server error. Check the server console',
        });
    }
};