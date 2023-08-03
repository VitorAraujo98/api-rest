const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const rotaFuncionarios = require('./routes/funcionarios');
const rotaPedidos = require('./routes/Pedidos');

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false})); // Apenas dados simples
app.use(bodyParser.json()); // json de entrada no body

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'   // CORS
        );

        if (req.method === 'OPTIONS') {
            res.header('Access-Controll-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).send({});
        }

        next();
})


app.use('/funcionarios', rotaFuncionarios);
app.use('/pedidos', rotaPedidos);


// Quando nao encontra rota, entra aqui:
app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        mensagem: 'Não foi possivel encontrar..'
    })
});


module.exports = app;