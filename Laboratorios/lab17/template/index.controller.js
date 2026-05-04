const log = console.log;
const productModel = require('./product.model.js');

module.exports.products = async (req, res) => {
    return res.status(200).json({ products: productModel.getProducts() });
};

module.exports.add_product = async (req, res) => {
    log(req.body);

    if (!req.body.id) {
        return res.status(422).json({ code: 422, msg: 'Id is missing' });
    }
    if (!req.body.name) {
        return res.status(422).json({ code: 422, msg: 'Name is missing' });
    }
    if (!req.body.price) {
        return res.status(422).json({ code: 422, msg: 'Price is missing' });
    }

    const newProduct = {
        id: Number(req.body.id),
        name: req.body.name,
        price: Number(req.body.price)
    };

    productModel.addProduct(newProduct);
    log('New product created:', newProduct);

    return res.status(201).json({
        code: 201,
        msg: 'Product created successfully!',
        product: newProduct
    });
};

module.exports.prepare_million_products = async (req, res) => {
    productModel.prepareMillionProducts();
    return res.status(200).json({ msg: 'Products prepared' });
};
