const { productService } = require("../services");
const createProduct = async (req, res) => {
  const { name, price, stock, userOwner } = req.body;
  try {
    const result = await productService.createProduct(
      name,
      price,
      stock,
      userOwner
    );
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send("Se produjo un error");
  }
};

module.exports = {
  createProduct,
};
