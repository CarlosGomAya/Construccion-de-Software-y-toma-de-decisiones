let products = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
    { id: 3, name: 'Product 3', price: 300 }
];

module.exports.getProducts = () => {
    return products;
};

module.exports.addProduct = (product) => {
    products.push(product);
    return product;
};

module.exports.prepareMillionProducts = () => {
    for (let i = products.length + 1; i <= 1000000; i++) {
        products.push({
            id: i,
            name: 'Product ' + i,
            price: i * 100
        });
    }
};
