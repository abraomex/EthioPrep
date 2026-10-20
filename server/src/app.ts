import express, { type Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import apiRouter from './routes/api';
import { errorHandler } from './middleware/errorHandler';
import { authenticate } from './middleware/auth';

export function createApp(): Application {
  const app = express();

  // Security Middleware
  app.use(helmet());

  // CORS Configuration
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
  app.use(
    cors({
      origin: [clientUrl, 'http://localhost:5173', 'http://127.0.0.1:5173'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  // Body Parsing & Cookies
  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: true, limit: '2mb' }));
  app.use(cookieParser());

  // Global Session Authentication (populates req.user if session cookie or bearer token exists)
  app.use(authenticate);

  // Mount API v1
  app.use('/api/v1', apiRouter);

  // 404 Handler for unknown API routes
  app.use('/api/*', (_req, res) => {
    res.status(404).json({
      success: false,
      message: 'API endpoint not found',
    });
  });

  // Centralized Error Handling Middleware
  app.use(errorHandler);

  return app;
}

