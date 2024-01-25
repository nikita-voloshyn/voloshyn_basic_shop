const productsData = {
  electronics: [
    { id: 1, name: 'Смартфон', price: 500 },
    { id: 2, name: 'Ноутбук', price: 1000 },
  ],
  clothing: [
    { id: 3, name: 'Футболка', price: 20 },
    { id: 4, name: 'Джинси', price: 50 },
  ],
};

function showCategory(event) {
  if (event.target.tagName === 'LI') {
    const category = event.target.getAttribute('data-category');
    displayProducts(productsData[category]);
  }
}

function displayProducts(products) {
  const productsDiv = document.getElementById('products');
  productsDiv.innerHTML = '';

  products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.innerHTML = `<p>${product.name} - ${product.price}$</p>`;
    productElement.className = 'card-text';
    productElement.onclick = () => showProductInfo(product);
    productsDiv.appendChild(productElement);
  });
}

function showProductInfo(product) {
  const productInfoDiv = document.getElementById('productInfo');
  productInfoDiv.innerHTML = `
    <p>ID: ${product.id}</p>
    <p>Назва: ${product.name}</p>
    <p>Ціна: ${product.price}$</p>
    <button class="btn btn-primary" onclick="buyProduct()">Купити</button>
  `;
}

function buyProduct() {
  alert('Товар куплений!');
  const productInfoDiv = document.getElementById('productInfo');
  productInfoDiv.innerHTML = '';
}
