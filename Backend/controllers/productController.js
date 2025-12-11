import Product from "./models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    const product = await Product.create({
      name,
      price,
      description,
      image: req.file ? req.file.filename : null,
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
