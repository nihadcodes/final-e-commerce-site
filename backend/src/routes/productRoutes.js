// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get('/get/:id', productController.getProductById);
router.get('/get', productController.getProducts);
router.post('/add', upload.single('image'), productController.addProduct);
router.post('/update/:id', productController.updateProduct);
router.get('/getQuantity/:id', productController.getProductQuantity);
router.put('/updateProductQuantity/:id', productController.updateProductQuantity);
router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;

