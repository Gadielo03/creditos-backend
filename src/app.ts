import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';

import express from "express";
import path from "path";
import routes from './routes/index';

process.on('uncaughtException', (error) => {
    console.error('⚠️ Uncaught exception', error.message);
    console.error(error.stack)
})

const app = express();
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(express.json());
app.use(cors());
app.use("/api", routes);

const PORT =  process.env.PORT || 3000;

const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error: any) {
        console.error("Failed to start server", error);
        process.exit(1);
    }
};

startServer()


export default app;
