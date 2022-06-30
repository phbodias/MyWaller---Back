import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// Rotas para fazer cadastro/login do usuário
app.post('/login', loginUser);
app.post('/cadastrar', createUser);

// Rota para exibir as entradas/saídas do usuário
app.get('/historico', exibeHistorico)

// Rotas para cadastrar novas saídas/entradas do usuário
app.post('/saida', postSaida);
app.post('/entrada', postEntrada);

// Rota para logout
app.get('/logout', logout);

const PORT = process.env.PORT || 5008;
app.listen(PORT, () => console.log('Servidor rodou deboas'));
