import dotenv from 'dotenv';
dotenv.config();

import { createApp } from './app';

const app = createApp();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

app.listen(PORT, () => {
  console.log(`🚀 EthioPrep Backend API running on http://localhost:${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/v1/health`);
  console.log(`📚 Public Subjects: http://localhost:${PORT}/api/v1/subjects`);
});

