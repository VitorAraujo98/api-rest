const express = require('express');
const router = express.Router();

// RETORNA TODOS OS PEDIDOS..
router.get('/',(req, res, next) => {
  res.status(200).send({
    mensagem: 'Pedidos retornados com sucesso.'
  })
});


router.get('/:id_pedido',(req, res, next) => {
    const id = req.params.id_funcionario
    if (id === 'especial') {
        res.status(200).send({
            mensagem: 'Voce achou o pedido especial'
        })
    } else {
        res.status(200).send({
            mensagem: 'Voce nao conseguiu localizar o pedido especial',
            id: id
        })
    }
});


// INSERE UM PEDIDO NA EMPRESA..
router.post('/',(req, res, next) => {
  const pedido = {
    id_funcionario: req.body.id_funcionario,
    quantidade: req.body.quantidade,
    nota: req.body.nota
  }
    res.status(201).send({
      mensagem: 'Pedido inserido com sucesso.',
      pedidoCriado: pedido
    })
  });


 // REMOVE UM PEDIDO
  router.delete('/',(req, res, next) => {
    res.status(200).send({
      mensagem: 'Pedido removido..'
    })
  });
  


module.exports = router;