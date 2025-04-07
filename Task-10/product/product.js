let products = [];

fetch("products.json")
  .then(response => response.json())
  .then(data => {
    products = data;
    fetchProducts(); 
  })
  .catch(error => console.error("Error loading products:", error));

let cart = JSON.parse(localStorage.getItem("cart")) || [];
localStorage.setItem("cart", JSON.stringify(cart));


const handleSearchAndFilter = () => {
  const searchInput = document.getElementById("search").value.toLowerCase().trim();
  const categorySelect = document.getElementById("category").value;
  
  let filteredProducts = products;

  if (searchInput !== "") {
    filteredProducts = filteredProducts.filter(product =>
      product.title.toLowerCase().includes(searchInput) ||
      product.description.toLowerCase().includes(searchInput)
    );
  }

  if (categorySelect !== "all") {
    filteredProducts = filteredProducts.filter(product =>
      product.category.toLowerCase() === categorySelect.toLowerCase()
    );
  }

  fetchProducts(filteredProducts);
};


const fetchProducts = (filteredProducts = products) => {
  const productContainer = document.querySelector("#products");
  productContainer.innerHTML = ""; // Clear previous products
  filteredProducts.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3 class="product-title">${product.title}</h3>
      <p class="product-description">${product.description}</p>
      <p class="product-price">Price: ₹${product.price}</p>
      <button class="add-to-cart" onclick="handleAddToCart(this)" data-id="${product.id}">Add to Cart</button>
    `;
    productContainer.appendChild(productCard);
  })
}


const handleAddToCart = (button) => {
  const productId = parseInt(button.getAttribute("data-id"));
  const existingProduct = cart.find(item => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    const product = products.find(p => p.id === productId);
    if (product) {
      cart.push({ ...product, quantity: 1 });
    }
  }

  alert("Product added to your cart!");
  localStorage.setItem("cart", JSON.stringify(cart));
  button.innerText = "Added to Cart";
};


document.getElementById("search").addEventListener("input", handleSearchAndFilter);
document.getElementById("category").addEventListener("change", handleSearchAndFilter);