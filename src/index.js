// Establecer la conexión con el servidor
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// Import routes
import { connectDB } from './lib/db.js';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.routes.js';


// Config
dotenv.config();
// App
const app = express();

// Middleware
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);


// Server
app.listen(PORT, () => {
  console.log('server is running on PORT:' + PORT);
  connectDB();
});


