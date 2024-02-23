const Products = require("../Models/ProductsModel");


exports.productsStore = async (req, res) => {

  try {
    const product = new Products({
      title: req.body.title,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      discount: req.body.discount,
      offer: req.body.offer,
      gender: req.body.gender,
      stock: req.body.stock,
    })

    const products = await product.save();

    if (products) res.status(200).json({ products });

    else if (!products) res.status(404).json({ msg: 'no products yet' });

  }
  catch (err) {
    res.status(500).json({ 'error': err });
  }
}

exports.productsAvailable = async (req, res) => {

  try {

    if (req.body.gender == 'All') {
      const product = await Products.find();
      res.status(200).json({ product });
    }
    else if (req.body.gender === 'Male' || req.body.gender === 'Female') {
      const product = await Products.find({ gender: req.body.gender });
      res.status(200).json({ product });
    }
    else {
      res.status(404).json({ msg: 'no items releted to query' });
    }
  }
  catch (err) {
    res.status(500).json({ 'error': err });
  }
}

exports.getSingleProduct = async (req, res) => {

  try {

    const singleProduct = await Products.findById(req.params.id);

    if (singleProduct) res.status(200).json({ singleProduct });

    else if (!singleProduct) res.status(404).json({ msg: 'no product found to show' });

  } catch (err) {
    res.status(500).json({ 'error': err });
  }
}


exports.searchProduct = async (req, res, next) => {

  try {
    let product = req.body.title;

    const matchProduct = await Products.find({ title: product })

    res.status(200).json({ matchProduct });

  } catch (err) {
    res.status(500).json({ 'error': err });
  }
};
