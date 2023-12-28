
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application, Express, Request, Response } from 'express';
import { errorHandler, notFoundHandler } from './src/error-handling';
import { router } from './src/routes/auth.routes';

require('./src/db/mongodb')
dotenv.config();

const app: Application = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
const port = process.env.PORT || 8000;

app.use('/travelhop', router);

app.use(notFoundHandler)
app.use(errorHandler);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});