
import dotenv from 'dotenv';
import express, { Application, Express, Request, Response } from 'express';
import { errorHandler, notFoundHandler } from './src/error-handling';

require('./src/db/mongodb')

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(notFoundHandler)
app.use(errorHandler);


app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});