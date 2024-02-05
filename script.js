document.addEventListener('DOMContentLoaded', function () {
    const myOrdersButton = document.getElementById('myOrdersButton');
    const categoriesElement = document.getElementById('categories');
    const productsElement = document.getElementById('products');
    const productInfoElement = document.getElementById('productInfo');
    const buyButton = document.getElementById('buyButton');

    const productsData = {
        electronics: [
            {id: 1, name: 'Смартфон', price: 500},
            {id: 2, name: 'Ноутбук', price: 1000},
        ],
        clothing: [
            {id: 3, name: 'Футболка', price: 20},
            {id: 4, name: 'Джинси', price: 50},
        ],
    };

    let orders = JSON.parse(localStorage.getItem('orders')) || [];

    function showCategories() {
        categoriesElement.innerHTML = '';
        for (const category in productsData) {
            const categoryElement = document.createElement('li');
            categoryElement.className = 'list-group-item';
            categoryElement.innerText = category;
            categoryElement.setAttribute('data-category', category);
            categoriesElement.appendChild(categoryElement);
        }
    }

    function showCategory(event) {
        if (event.target.tagName === 'LI') {
            const category = event.target.getAttribute('data-category');
            displayProducts(productsData[category]);
        }
    }

    function displayProducts(products) {
        productsElement.innerHTML = '';

        if (products) {
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.innerHTML = `<p>${product.name} - ${product.price}$</p>`;
                productElement.onclick = () => showProductInfo(product);
                productsElement.appendChild(productElement);
            });
        }
    }

    function showProductInfo(product) {
        productInfoElement.innerHTML = `<p>ID: ${product.id}</p><p>Назва: ${product.name}</p><p>Ціна: ${product.price}$</p>`;
    }

    function buyProduct() {
        const productInfoHtml = productInfoElement.innerHTML;

        if (productInfoHtml) {
            const tempElement = document.createElement('div');
            tempElement.innerHTML = productInfoHtml;

            const selectedProduct = {
                id: tempElement.querySelector('p:nth-child(1)').innerText.split(': ')[1],
                name: tempElement.querySelector('p:nth-child(2)').innerText.split(': ')[1],
                price: tempElement.querySelector('p:nth-child(3)').innerText.split(': ')[1],
            };

            const order = {...selectedProduct, date: new Date().toLocaleString()};
            orders.push(order);
            localStorage.setItem('orders', JSON.stringify(orders));
            alert('Товар куплений!');
            productInfoElement.innerHTML = '';
        } else {
            alert('Виберіть товар перед покупкою.');
        }
    }


    function showMyOrders() {
        categoriesElement.innerHTML = '<p>Мої замовлення</p>';
        productsElement.innerHTML = '';

        orders.forEach(order => {
            const orderElement = document.createElement('div');
            orderElement.innerHTML = `<p>${order.date} - ${order.price}$</p>`;
            orderElement.onclick = () => showOrderDetails(order);
            productsElement.appendChild(orderElement);
        });

        const backButton = document.createElement('button');
        backButton.innerText = 'Назад до категорій';
        backButton.classList.add('btn', 'btn-primary', 'mt-3');
        backButton.onclick = () => showCategories();
        productsElement.appendChild(backButton);
    }


    function showOrderDetails(order) {
        productInfoElement.innerHTML = `<p>ID: ${order.id}</p><p>Назва: ${order.name}</p><p>Ціна: ${order.price}$</p>`;
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Видалити замовлення';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.onclick = () => deleteOrder(order);
        productInfoElement.appendChild(deleteButton);
    }


    function deleteOrder(order) {
        orders = orders.filter(o => o !== order);
        localStorage.setItem('orders', JSON.stringify(orders));
        showMyOrders();
        productInfoElement.innerHTML = '';
    }

    showCategories();
    categoriesElement.addEventListener('click', showCategory);
    myOrdersButton.addEventListener('click', showMyOrders);
    buyButton.addEventListener('click', buyProduct);
});
