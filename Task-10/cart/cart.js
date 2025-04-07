let cart = JSON.parse(localStorage.getItem("cart")) || [];
localStorage.setItem("cart", JSON.stringify(cart));

const calculateDiscount = (total) => {
  if (total >= 20000) return 15;
  if (total >= 10000) return 10;
  if (total >= 5000) return 5;
  return 0;
};

const handleViewCart = () => {
  const cartContainer = document.querySelector(".cart-container");
  const cartPriceContainer = document.querySelector(".cart-price");
  const cartSection = document.querySelector(".cart-grid");
  const totalAmount = document.querySelector(".total-amount");

  cartSection.innerHTML = "";
  cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

  if (cart.length === 0) {
    totalAmount.innerHTML = `<p>Total Amount: ₹0</p>`;
    cartSection.innerHTML = `<h2>Your cart is empty!</h2>`;
    cartPriceContainer.innerHTML = ``;
    return;
  }

  cart.forEach((product, index) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-card");

    cartItem.innerHTML = `
      <div class="cart-details">
        <img src="${product.image}" alt="${product.title}" />
      </div>
      <div class="cart-details">
        <p class="product-description">${product.description}</p>
        <h4>${product.title}</h4>
        <p>Price: ₹${product.price}</p>
        <div class="quantity-control">
          <button class="qty-btn" onclick="decreaseQuantity(${index})" ${product.quantity <= 1 ? 'disabled' : ''}>-</button>
          <span class="qty">${product.quantity}</span>
          <button class="qty-btn" onclick="increaseQuantity(${index})">+</button>
        </div>
        <button class="remove-btn" onclick="handleRemoveFromCart(${index})">Remove</button>
      </div>
    `;
    cartSection.appendChild(cartItem);
  });

  const totalItems = cart.reduce((sum, product) => sum + product.quantity, 0);
  const totalPrice = cart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const discountPercentage = calculateDiscount(totalPrice);
  const discount = Math.floor(totalPrice * discountPercentage)/100;
  const deliveryCharge = totalPrice > 500 ? 0 : 50;
  const finalAmount = totalPrice - discount + deliveryCharge;

  cartPriceContainer.innerHTML = `
    <p class="price">Price (${totalItems} ${totalItems > 1 ? "Items" : "Item"}): ₹${totalPrice}</p>
    <p class="discount">Discount (${discountPercentage}%): ₹${discount}</p>
    <p class="delivery-charges">
      Delivery Charges: 
      ${deliveryCharge === 0 
        ? '<span style="text-decoration: line-through;">₹50</span> <span style="color: green;">Free</span>' 
        : `₹${deliveryCharge}`}
    </p>
    <p class="total-price"><strong>Total Amount: ₹${finalAmount}</strong></p>
    <button class="checkout-btn" onclick="handleCheckout()">Checkout</button>`;

    totalAmount.innerHTML = `<p>Total Amount: ₹${totalPrice}</p?`
};

const increaseQuantity = (index) => {
  cart[index].quantity += 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  handleViewCart();
};

const decreaseQuantity = (index) => {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  handleViewCart();
};

const handleRemoveFromCart = (index) => {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  handleViewCart();
  alert("Product removed from cart!");
};

const handleCheckout = () => {
  cart.splice(0, cart.length);
  localStorage.setItem("cart", JSON.stringify(cart));
  handleViewCart();
  alert("Thank you for your purchase! Your order has been placed successfully.");
}

handleViewCart();

