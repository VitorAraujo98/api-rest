const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

// RETORNA TODOS OS FUNCIONARIOS..
router.get('/',(req, res, next) => {
  res.status(200).send({
    mensagem: 'Funcionários retornados na empresa..'
  })
});


router.get('/:id_funcionario',(req, res, next) => {
    const id = req.params.id_funcionario
    if (id === 'especial') {
        res.status(200).send({
            mensagem: 'Voce achou o funcionario especial'
        })
    } else {
        res.status(200).send({
            mensagem: 'Voce nao conseguiu localizar o funcionario especial',
            id: id
        })
    }
});


// INSERE UM FUNCIONÁRIO NA EMPRESA..
router.post('/',(req, res, next) => {
  const funcionario = {
    nome: req.body.nome,
    idade: req.body.idade,
    preco: req.body.preco,
    trabalho: req.body.trabalho,
    endereco: req.body.endereco
  }

    res.status(201).send({
      mensagem: 'Funcionários inserido na empresa..',
      funcionarioCriado: funcionario
    })
  });



// ALTERA UM FUNCIONÁRIO NA 
  router.patch('/',(req, res, next) => {
    res.status(200).send({
      mensagem: 'Funcionários alterado na empresa..'
    })
  });




 // REMOVE UM FUNCIONARIO
  router.delete('/',(req, res, next) => {
    res.status(200).send({
      mensagem: 'Funcionários retornados na empresa..'
    })
  });
  


module.exports = router;