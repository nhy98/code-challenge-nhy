import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import resourceRoutes from './routes/resourceRoutes';
import { connectToDatabase } from './database/index';
import { config } from './config';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(errorHandler);

// Database connection
connectToDatabase();

// Routes
app.use('/api/resources', resourceRoutes);

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});