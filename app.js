const express = require('express');
const app = express();


const rotaFuncionarios = require('./routes/funcionarios');
app.use('/funcionarios', rotaFuncionarios);







module.exports = app;