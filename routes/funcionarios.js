const express = require('express');
const router = express.Router();
const multer = require('multer');
const login = require('../middleware/login');



const FuncionariosController = require('../controllers/funcionarios-controller');



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



router.get('/', FuncionariosController.getFuncionario);
router.get('/:id_funcionario', FuncionariosController.getUmFuncionario);
router.post('/',  login, upload.single('funcionario_imagem'), FuncionariosController.postFuncionario);
 router.patch('/', FuncionariosController.patchFuncionario);
router.delete('/', FuncionariosController.deleteFuncionario);
  


module.exports = router;





