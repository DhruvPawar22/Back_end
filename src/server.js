import dotenv from 'dotenv'; // Importing dotenv for environment variable management
dotenv.config(); // Loading environment variables from .env file
import express from 'express'; // Importing express framework for building web applications
import path,{dirname} from 'path'; // Importing path module for handling file paths
import {fileURLToPath} from 'url'; // Importing fileURLToPath for converting URL to file path
import cors from 'cors'; // Importing cors for enabling Cross-Origin Resource Sharing
const app = express();
const port =    process.env.PORT ||3000; // Setting the port to the environment variable PORT or defaulting to 3000
import authRoutes from './routes/authRoutes.js'; // Importing authentication routes
import toDoRoutes from './routes/toDoRoutes.js'; // Importing todo routes
import db from './db.js'; // Importing database instance
import authmiddleware from './middleware/authMiddleware.js';


app.use(express.json()); // Middleware to parse JSON request bodies
const __filename = fileURLToPath(import.meta.url); // Getting the current file path
const __dirname = dirname(__filename); // Getting the directory name of the current file

app.use(express.static(path.join(__dirname, '../public'))); // Serving static files from the 'public' directory

app.use(cors()); // Enable CORS for all routes


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html')); // Corrected path
});

//routes
app.use('/auth', authRoutes); // Using authentication routes

app.use('/todos',authmiddleware ,toDoRoutes); // Using todo routes

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});