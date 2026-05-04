const log = console.log;
let gridTable = null;

class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

window.addEventListener('load', () => {
    log('Window loaded');

    const myForm = document.getElementById('myForm');
    const submitButton = document.getElementById('submitButton');
    const updateProductsButton = document.getElementById('updateProducts');

    submitButton.addEventListener('click', async () => {
        const result = generateProduct(myForm);

        if (result.product == null) {
            showMessage(result.msg);
            return;
        }

        await addProduct(result.product);
        myForm.reset();
        await loadProducts();
    });

    updateProductsButton.addEventListener('click', async () => {
        await loadProducts();
    });

    createGrid();
    loadProducts();
});

function generateProduct(myForm) {
    const id = myForm.elements['id'].value;
    const name = myForm.elements['name'].value;
    const price = myForm.elements['price'].value;

    let newProduct = null;
    let msg = 'Created product';

    if (!id) {
        msg = 'Id is empty';
    }
    if (!name) {
        msg = 'Name is empty';
    }
    if (!price) {
        msg = 'Price is empty';
    }

    if (msg == 'Created product') {
        newProduct = new Product(id, name, price);
    }

    return { product: newProduct, msg: msg };
}

async function addProduct(product) {
    const response = await fetch('/add_product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });

    const data = await response.json();

    if (response.ok) {
        showMessage(data.msg);
        log('Product added successfully:', data);
    } else {
        showMessage(data.msg);
    }
}

async function loadProducts() {
    const response = await fetch('/products');

    if (response.ok) {
        const data = await response.json();
        const codeResult = document.getElementById('codeResult');
        codeResult.innerHTML = 'Total de productos: ' + data.products.length;
        refreshGrid();
    } else {
        alert('HTTP-Error: ' + response.status);
    }
}

function createGrid() {
    const wrapper = document.getElementById('wrapper');

    gridTable = new gridjs.Grid({
        columns: ['Id', 'Name', 'Price'],
        pagination: true,
        search: true,
        sort: true,
        server: {
            url: '/products',
            then: data => data.products.map(product => [
                product.id,
                product.name,
                product.price
            ])
        }
    }).render(wrapper);
}

function refreshGrid() {
    if (gridTable != null) {
        gridTable.forceRender();
    }
}

function showMessage(msg) {
    const message = document.getElementById('message');
    message.innerHTML = msg;
}
