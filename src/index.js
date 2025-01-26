// Establecer la conexión con el servidor
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Import routes
import { connectDB } from './lib/db.js';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.routes.js';
import { app, server } from './lib/socket.io.js';


// Config
dotenv.config();

// Middleware
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


// Server
server.listen(PORT, () => {
  console.log('server is running on PORT:' + PORT);
  connectDB();
});


