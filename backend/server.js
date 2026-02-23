import express from 'express';
import cors from 'cors';
import chatRoutes from './routes/chatRoutes.js';



const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:3000', 'http://localhost:5173', 'https://https://miyamoto-musashi-chatbot.vercel.app'],
  credentials: true
}));

app.use(express.json());
app.options('/api/chat', cors());

app.get('/', (req, res) => {
  res.json({
    message: 'Musashi API is running',
    endpoints: {
      test: 'GET /api/test',
      chat: 'POST /api/chat'
    }
  });
});

app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Musashi backend is working!',
    status: 'active',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/chat', chatRoutes);

app.listen(PORT, () => {
  console.log(`⚔️ Servidor Musashi rodando em http://localhost:${PORT}`);
  console.log(`📡 Frontend: http://localhost:8080`);
});