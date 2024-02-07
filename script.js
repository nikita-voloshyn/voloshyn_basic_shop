document.addEventListener('DOMContentLoaded', function () {
    const categoriesElement = document.getElementById('categories');
    const productsElement = document.getElementById('products');
    const cartElement = document.getElementById('cart');
    const cartItemsElement = document.getElementById('cartItems');
    const checkoutButton = document.getElementById('checkoutButton');
    const showOrdersButton = document.getElementById('showOrdersButton');
    const orderFormElement = document.getElementById('orderForm');
    const submitOrderButton = document.getElementById('submitOrderButton');
    const ordersElement = document.getElementById('orders');
    const orderListElement = document.getElementById('orderList');

    if (categoriesElement && productsElement && cartElement && cartItemsElement && checkoutButton && orderFormElement && submitOrderButton) {
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

        function displayCategories() {
            categoriesElement.innerHTML = '<h5>Категорії товарів:</h5>';
            const categoriesList = document.createElement('ul');
            categoriesList.classList.add('list-group');

            for (const category in productsData) {
                const categoryItem = document.createElement('li');
                categoryItem.classList.add('list-group-item');
                categoryItem.setAttribute('data-category', category);
                categoryItem.textContent = category.charAt(0).toUpperCase() + category.slice(1);
                categoriesList.appendChild(categoryItem);
            }

            categoriesElement.appendChild(categoriesList);
        }

        function displayProducts(category) {
            productsElement.innerHTML = '<h5>Товари:</h5>';

            productsData[category].forEach(product => {
                const productElement = document.createElement('div');
                productElement.innerHTML = `<p>${product.name} - ${product.price}$ <button class="btn btn-sm btn-primary add-to-cart" data-id="${product.id}">Додати до корзини</button></p>`;
                productsElement.appendChild(productElement);
            });
        }

        function addToCart(productId) {
            const product = getProductById(productId);

            const cartItemElement = document.createElement('li');
            cartItemElement.classList.add('list-group-item');
            cartItemElement.textContent = `${product.name} - ${product.price}$`;

            cartItemsElement.appendChild(cartItemElement);

            updateCartVisibility();
        }

        function getProductById(productId) {
            for (const category in productsData) {
                const product = productsData[category].find(p => p.id === productId);
                if (product) {
                    return product;
                }
            }
            return null;
        }

        function updateCartVisibility() {
            if (cartItemsElement.children.length > 0) {
                cartElement.style.display = 'block';
            } else {
                cartElement.style.display = 'none';
            }
        }

        function showOrderForm() {
            orderFormElement.style.display = 'block';
        }

        function submitOrder(event) {
            event.preventDefault();

            const fullName = document.getElementById('fullName').value;
            const city = document.getElementById('city').value;
            const postOffice = document.getElementById('postOffice').value;
            const paymentMethod = document.getElementById('paymentMethod').value;
            const quantity = document.getElementById('quantity').value;
            const comment = document.getElementById('comment').value;

            if (!fullName || !city || !postOffice || !paymentMethod || !quantity) {
                alert('Будь ласка, заповніть всі обов\'язкові поля форми.');
            } else {
                const orderInfo = `Інформація про замовлення:\n
                          ПІБ покупця: ${fullName}\n
                          Місто: ${city}\n
                          Склад Нової пошти: ${postOffice}\n
                          Спосіб оплати: ${paymentMethod}\n
                          Кількість: ${quantity}\n
                          Коментар: ${comment}`;

                alert(orderInfo);
                cartItemsElement.innerHTML = '';
                cartElement.style.display = 'none';
                orderFormElement.style.display = 'none';
            }
        }

        categoriesElement.addEventListener('click', function (event) {
            if (event.target.tagName === 'LI') {
                const category = event.target.getAttribute('data-category');
                displayProducts(category);
            }
        });

        productsElement.addEventListener('click', function (event) {
            if (event.target.classList.contains('add-to-cart')) {
                const productId = parseInt(event.target.getAttribute('data-id'));
                addToCart(productId);
            }
        });

        checkoutButton.addEventListener('click', showOrderForm);

        submitOrderButton.addEventListener('click', submitOrder);

        displayCategories();

    } else {
        console.error('Не вдалося знайти всі необхідні елементи на сторінці.');
    }
});
