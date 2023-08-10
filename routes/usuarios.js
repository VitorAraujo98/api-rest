const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const usuarioController = require('../controllers/usuarios-controller');


router.post('/cadastro', usuarioController.cadastrarUsuario);
router.post('/login', usuarioController.Login);
module.exports = router;

