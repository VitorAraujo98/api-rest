const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const multer = require('multer');

const storage = multer.diskStorage({
destination: function(req, file, cb) {
  cb(null, './uploads/');
},
 filename: function(req, file, cb) {
    cb(null, new Date().toDateString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'  || file.mimetype === 'image/jpg') {
    cb(null, true); 
  } else {
    cb(null, false);
  }
}
 
const upload = multer({
   storage: storage,
   limits: {
    fileSize: 1024 * 1024 * 5
   },
   fileFilter: fileFilter
  
  });




// RETORNA TODOS OS FUNCIONARIOS..
router.get('/',(req, res, next) => {
  mysql.getConnection((error, conn) => {
  if(error) {return res.status(500).send({ error: error})}
  conn.query(
    'SELECT * FROM funcionarios;',
    (error, results, field) => {
      if(error) {return res.status(500).send({ error: error})}
      const response = {
        quantidade: results.length,
        funcionario: results.map(func => {
          return {
            id_funcionario: func.id_funcionario,
            nome: func.nome,
            idade: func.idade,
            preco: func.preco,
            trabalho: func.trabalho,
            endereco: func.endereco,
            imagem_funcionario: func.imagem_funcionario,
            request: {
            tipo: 'GET',
            descricao: 'Retorna os detalhes de um funcionário específico',
            url: 'http://localhost:3000/funcionarios/' + func.id_funcionario
            }
          }
        })
      }
      return res.status(200).send({response})
    }
    )
  });
  
  });


router.get('/:id_funcionario',(req, res, next) => {
  mysql.getConnection((error, conn) => {
    if(error) {return res.status(500).send({ error: error})}
    conn.query(
      'SELECT * FROM funcionarios WHERE id_funcionario = ?;',
      [req.params.id_funcionario],
      (error, results, field) => {
        if(error) {return res.status(500).send({ error: error})}

        if (results.length == 0) {
          return res.status(404).send({
            mensagem: 'Não foi encontrado o funcionário'
          })
        }
        const response = {
            funcionario: {
            id_funcionario: results[0].id_funcionario,
            nome: results[0].nome,
            idade: results[0].idade,
            preco: results[0].preco,
            trabalho: results[0].trabalho,
            endereco: results[0].endereco,
            imagem_funcionario: results[0].imagem_funcionario,
            request: {
              tipo: 'GET',
              descricao: 'Retorna todos os funcionários',
              url: 'http://localhost:3000/funcionarios'
            }
          }
        }

        return res.status(200).send({response: results})
      }
      )
    });
});


// INSERE UM FUNCIONÁRIO NA EMPRESA..
router.post('/', upload.single('funcionario_imagem'), (req, res, next) => {
  console.log(req.file);
  mysql.getConnection((error, conn) => {
    if(error) {return res.status(500).send({ error: error})}
    conn.query(
      'INSERT INTO funcionarios (nome, idade, preco, trabalho, endereco, imagem_funcionario) VALUES(?,?,?,?,?,?)',
      [req.body.nome, req.body.idade, req.body.preco, req.body.trabalho, req.body.endereco, req.file.path],
      (error, results, field) => {
        conn.release();
        if(error) {return res.status(500).send({ error: error})}
       const response = {
        mensagem: 'Funcionário inserido com sucesso',
        funcionarioCriado: {
          id_funcionario: results.id_funcionario,
          nome: req.body.nome,
          idade: req.body.idade,
          preco: req.body.preco,
          trabalho: req.body.trabalho,
          endereco: req.body.endereco,
          imagem_funcionario: req.file.path,
          request: {
          tipo: 'GET',
          descricao: 'Retorna todos os funcionários ',
          url: 'http://localhost:3000/funcionarios'
          }
        }
       }
        return res.status(201).send(response);
   
         }
       ) 
    });
  });



// ALTERA UM FUNCIONÁRIO NA 
  router.patch('/',(req, res, next) => {
    mysql.getConnection((error, conn) => {
      if(error) {return res.status(500).send({ error: error})}
      conn.query(
        `UPDATE funcionarios 
          SET    nome        = ?,
                 idade       = ?,
                 preco       = ?,
                 trabalho    = ?,
                 endereco    = ?
        WHERE id_funcionario = ?`,
        [req.body.nome, req.body.idade, req.body.preco, req.body.trabalho, req.body.endereco,
         req.body.id_funcionario],
        (error, results, field) => {
          conn.release();
          if(error) {return res.status(500).send({ error: error})}

          const response = {
            mensagem: 'Funcionário atualizado com sucesso',
            funcionario: {
              id_funcionario: req.body.id_funcionario,
              nome: req.body.nome,
              idade: req.body.idade,
              preco: req.body.preco,
              trabalho: req.body.trabalho,
              endereco: req.body.endereco,
              request: {
                tipo: 'GET',
                descricao: 'Retorna os detalhes da atualização do funcionário',
                url: 'http://localhost:3000/funcionarios/' + req.body.id_funcionario
                }
            }
           }
            return res.status(202).send(response);
           }
         ) 
      });
  });




 // REMOVE UM FUNCIONARIO
  router.delete('/',(req, res, next) => {
    mysql.getConnection((error, conn) => {
      if(error) {return res.status(500).send({ error: error})}
      conn.query(
        `DELETE FROM funcionarios WHERE id_funcionario = ?`, [req.body.id_funcionario],
        (error, results, field) => {
          conn.release();
          if(error) {return res.status(500).send({ error: error})}

           const response = {
             mensagem: 'Funcionário removido com sucesso',
             request: {
              tipo: 'POST',
              descricao: 'Insere um funcionário',
              url: 'http://localhost:3000/funcionarios',
             }
           }
          return res.status(202).send(response);
     
           }
         ) 
      });
  });
  


module.exports = router;





