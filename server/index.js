import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();

const app = express();
//middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));

//adding postRoutes to send prompt and retrieve the image
app.use('/api/v1/post', postRoutes);
//adding dalleRoutes to generate the data from the api
app.use('/api/v1/dalle', dalleRoutes);

//verify if server is working
app.get('/', async (req, res) => {
    res.send("Hello from DALL-E");
});

//starting server and connecting to mongoDB
const startServer = async () => {

    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => { console.log("Server has started on port http://localhost:8080") });
    }
    catch (error) {
        console.log(error);
    }
}

startServer();