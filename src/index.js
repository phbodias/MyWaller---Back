import chalk from 'chalk';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { loginUser, createUser } from './controllers/authController.js';

dotenv.config();

const app = express();
app.use(express.json(), cors());

// Rotas para fazer cadastro/login do usuário
app.post('/login', loginUser);
app.post('/cadastrar', createUser);

/* // Rota para exibir as entradas/saídas do usuário
app.get('/historico', exibeHistorico)

// Rotas para cadastrar novas saídas/entradas do usuário
app.post('/saida', postSaida);
app.post('/entrada', postEntrada);

// Rota para logout
app.get('/logout', logout); */

const server = app.listen(process.env.PORT || 5000, () => {
    const port = server.address().port;
    console.log(`Express is working on port ${port}`);
});