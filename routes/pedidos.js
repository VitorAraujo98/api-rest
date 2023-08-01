const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

// RETORNA TODOS OS PEDIDOS..
router.get('/',(req, res, next) => {
  mysql.getConnection((error, conn) => {
    if(error) {return res.status(500).send({ error: error})}
    conn.query(
      'SELECT * FROM pedidos;',
      (error, results, field) => {
        if(error) {return res.status(500).send({ error: error})}
        const response = {
          quantidade: results.length,
          pedidos: results.map(pedido => {
            return {
              id_pedido: pedido.id_pedido,
              quantidade: pedido.quantidade,
              id_funcionario: pedido.id_funcionario,
              nota: pedido.nota,
              request: {
              tipo: 'GET',
              descricao: 'Retorna os detalhes de um pedido específico',
              url: 'http://localhost:3000/pedidos/' + pedido.id_pedido
              }
            }
          })
        }
        return res.status(200).send({response})
      }
      )
    });
});


router.get('/:id_pedido',(req, res, next) => {
  mysql.getConnection((error, conn) => {
    if(error) {return res.status(500).send({ error: error})}
    conn.query(
      'SELECT * FROM pedidos WHERE id_pedido = ?;',
      [req.params.id_pedido],
      (error, results, field) => {
        if(error) {return res.status(500).send({ error: error})}
        
        if (results.length == 0) {
          return res.status(404).send({
            mensagem: 'Não foi encontrado o pedido'
          })
        }
        const response = {
            pedido: {
            id_pedido: results[0].id_pedido,
            quantidade: results[0].quantidade,
            id_funcionario: results[0].id_funcionario,
            nota: results[0].nota,
            request: {
              tipo: 'GET',
              descricao: 'Retorna todos os pedidos',
              url: 'http://localhost:3000/pedidos'
            }
          }
        }

        return res.status(200).send({response})
      }
      )
    });
});


// INSERE UM PEDIDO NA EMPRESA..
router.post('/',(req, res, next) => {
  mysql.getConnection((error, conn) => {
      if(error) {return res.status(500).send({ error: error})}
  conn.query('SELECT * FROM funcionarios WHERE id_funcionario = ?', 
  [req.body.id_funcionario],
  (error, results, field) => { 
      if(error) {return res.status(500).send({ error: error})} 

      if (results.length == 0) {
        return res.status(404).send({
          mensagem: 'Produto nao encontrado'
        })
      }
      conn.query(
        'INSERT INTO pedidos (id_pedido, quantidade, id_funcionario, nota) VALUES(?,?,?,?)',
        [req.body.id_pedido, req.body.quantidade, req.body.id_funcionario, req.body.nota],
        (error, results, field) => {
          conn.release();
          if(error) {return res.status(500).send({ error: error})}
         const response = {
          mensagem: 'Pedido inserido com sucesso',
         pedidoCriado: {
             id_pedido: results.id_pedido,
             quantidade: req.body.quantidade,
             id_funcionario: req.body.id_funcionario,
             nota: req.body.nota,
             request: {
             tipo: 'GET',
             descricao: 'Retorna todos os pedidos ',
             url: 'http://localhost:3000/pedidos'
            }
          }
         }
          return res.status(201).send(response);
           }
         ) 
      });
      

    });
  });



 // REMOVE UM PEDIDO
  router.delete('/',(req, res, next) => {
    mysql.getConnection((error, conn) => {
      if(error) {return res.status(500).send({ error: error})}
      conn.query(
        `DELETE FROM pedidos WHERE id_pedido = ?`, [req.body.id_pedido],
        (error, results, field) => {
          conn.release();
          if(error) {return res.status(500).send({ error: error})}

           const response = {
             mensagem: 'Pedido removido com sucesso',
             request: {
              tipo: 'POST',
              descricao: 'Insere um Pedido',
              url: 'http://localhost:3000/pedidos',
             }
           }
          return res.status(202).send(response);
     
           }
         ) 
      });
  });
  


module.exports = router;