import 'dotenv/config';
import express from 'express';
import { connectDB } from './db/connect.js';
import { notFoundMiddleware } from './middleware/not-found.js';
import { errorHandlerMiddleware } from './middleware/error-handler.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products</a>');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
            .then(() => console.log('Connected to the database'))
            .catch((error) => console.error(error));

        app.listen(port, console.log(`Server is running on port ${port}`));
    } catch (error) {
        console.error(error);
    }
}

start();