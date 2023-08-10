const express = require('express');
const router = express.Router();

const PedidosController = require('../controllers/pedidos-controller');

router.get('/', PedidosController.getPedidos);
router.get('/:id_pedido', PedidosController.getUmPedido);
router.post('/', PedidosController.postPedidos);
router.delete('/', PedidosController.deletePedidos);
  


module.exports = router;