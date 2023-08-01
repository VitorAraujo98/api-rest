const express = require('express');
const router = express.Router();

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
    res.status(201).send({
      mensagem: 'Funcionários inserido na empresa..'
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