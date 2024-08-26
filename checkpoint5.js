document.addEventListener('DOMContentLoaded', () => {
        const cartItemsContainer = document.getElementById('cart-items');
        const totalPriceElement = document.getElementById('total-price');
    
        let cart = [];
    
        function updateCart() {
            cartItemsContainer.innerHTML = '';
            let total = 0;
    
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <span>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</span>
                    <div>
                        <button class="increase-quantity">+</button>
                        <button class="decrease-quantity">-</button>
                        <button class="remove-item">Remove</button>
                    </div>
                `;
    
                cartItemsContainer.appendChild(cartItem);
    
                total += item.price * item.quantity;
    
                cartItem.querySelector('.increase-quantity').addEventListener('click', () => {
                    item.quantity++;
                    updateCart();
                });
    
                cartItem.querySelector('.decrease-quantity').addEventListener('click', () => {
                    if (item.quantity > 1) {
                        item.quantity--;
                    } else {
                        cart = cart.filter(cartItem => cartItem.id !== item.id);
                    }
                    updateCart();
                });
    
                cartItem.querySelector('.remove-item').addEventListener('click', () => {
                    cart = cart.filter(cartItem => cartItem.id !== item.id);
                    updateCart();
                });
            });
    
            totalPriceElement.textContent = total.toFixed(2);
        }
    
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const productElement = e.target.closest('.product');
                const productId = productElement.getAttribute('data-id');
                const productName = productElement.getAttribute('data-name');
                const productPrice = parseFloat(productElement.getAttribute('data-price'));
                const productImage = productElement.getAttribute('data-image');
    
                const existingProduct = cart.find(item => item.id === productId);
    
                if (existingProduct) {
                    existingProduct.quantity++;
                } else {
                    cart.push({ id: productId, name: productName, price: productPrice, image: productImage, quantity: 1 });
                }
    
                updateCart();
            });
        });
    
        updateCart();
    });