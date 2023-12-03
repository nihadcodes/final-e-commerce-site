const Product = require('../models/product');

exports.getProducts = async (req, res) => {
  
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId).exec();

    if (!product) {
      res.status(404).send('Product not found');
    } else {
      res.json(product);
    }
  } catch (err) {
    console.error('Error fetching product by ID:', err);
    res.status(500).send(err);
  }
};

exports.addProduct = async (req, res) => {
  try {
    const {
      name,
      shotCode,
      price,
      quantity,
      description,
      isBestAchieved,
      createdDate,
      origin,
      category,
    } = req.body;

    const product = new Product({
      name,
      shotCode,
      price,
      quantity,
      description,
      image: req.file ? req.file.path : null, 
      isBestAchieved,
      createdDate,
      origin,
      category,
    });

    const savedProduct = await product.save();
    res.json(savedProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  const productId = req.params.id;
  const updatedProductData = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getProductQuantity = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId).select('quantity').exec();

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product.quantity);
  } catch (err) {
    console.error('Error fetching product quantity:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateProductQuantity = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, { quantity }, { new: true });

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


