const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const cors = require('cors');

const app = express();

const config = require('../config.json');

const PORT = config.Port || 3001;
const SECRET_KEY = config.Key || '1234567890';
const useremail = config.UserEmail || "admin@admin.com"
const userpass = config.Password || "admin@admin.com"
const username = config.UserName || "Administrator"

const rateLimit = require('express-rate-limit');

// Defina o limite de solicitações para cada IP a cada 15 minutos
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // limite cada IP para 100 solicitações por janela
});

app.use(cors());
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000'
}));


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

app.use((req, res, next) => {
    console.log('Requisição recebida:', req.method, req.url, req.body);
    next();
});



function verificaToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) {
        return res.status(403).send({ mensagem: 'Token de autenticação não fornecido.' });
    }

    const token = bearerHeader.split(' ')[1];

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log('Erro completo ao verificar o token:', err);
            return res.status(500).send({ mensagem: 'Falha ao autenticar o token.' });
        }
    
        console.log('Token decodificado:', decoded);
        req.userId = decoded.email;
        next();
    });
}



app.post('/api/login', (req, res) => {
    const { email, senha } = req.body;

    if (email === useremail && senha === userpass) {
        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token, username });
    } else {
        res.status(401).json({ mensagem: 'Credenciais inválidas' });
    }
});


app.get('/api/coindesk', limiter, verificaToken, async (req, res) => {
    try {
        const { data: responseData } = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');

        res.json(responseData);

    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao buscar dados da CoinDesk' });
    }
});

app.get('/api/health', (req, res) => {
    res.json({ status: true }).status(200)
});