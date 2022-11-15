const Product = require("../models/product");
const User = require("../models/user");

const createProduct = async (name, price, stock, userOwner) => {
  let result;
  try {
    const userFound = await User.findById(userOwner);
    if (!userFound) {
      return;
    }
    const newProduct = new Product({ name, price, stock, userOwner });
    await newProduct.save();
    userFound.products.push(newProduct._id);
    await userFound.save();
  } catch (error) {
    throw error;
  }

  return result;
};

module.exports = {
  createProduct,
};
