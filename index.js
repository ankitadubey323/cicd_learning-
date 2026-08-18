import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import todoRoutes from './routes/todos.js';

dotenv.config();

mongoose.set('bufferCommands', false);

const app = express();
app.use(cors());
app.use(express.json());

const DEFAULT_PORT = Number(process.env.PORT) || 4001;

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => res.send({ ok: true }));

async function start(){
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/todo-app';

  try{
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(`MongoDB connection failed: ${err.message}. Update MONGO_URI in backend/.env to a valid MongoDB connection string and make sure MongoDB is running.`);
    process.exit(1);
  }

  const startServer = (port) => {
    const server = app.listen(port, () => console.log(`Server running on port ${port}`));

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        const nextPort = port + 1;
        console.warn(`Port ${port} is busy. Trying ${nextPort} instead.`);
        startServer(nextPort);
        return;
      }

      console.error('Server failed to start', err);
      process.exit(1);
    });
  };

  startServer(DEFAULT_PORT);
}

start();
