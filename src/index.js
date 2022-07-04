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

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(
    chalk.bold.yellow(`Servidor rodando na porta ${PORT}`)
));