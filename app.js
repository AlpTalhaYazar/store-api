import 'dotenv/config';
import express from 'express';
import { notFoundMiddleware } from './middleware/not-found.js';
import { errorHandlerMiddleware } from './middleware/error-handler.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products</a>');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
    try {
        app.listen(process.env.PORT, () =>
            console.log(`Server is listening on port ${process.env.PORT}...`)
        );
    } catch (error) {
        console.error(error);
    }
};

await start();