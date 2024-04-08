// Function to update cart totals
function updateCartTotals() {
    const cartItems = document.querySelectorAll('.cart__card');
    const totalItemsDisplay = document.querySelector('.cart__prices-item');
    const totalPriceDisplay = document.querySelector('.cart__prices-total');
    let totalItems = 0;
    let totalPrice = 0;

    cartItems.forEach(cartItem => {
        const quantity = parseInt(cartItem.querySelector('.cart__amount-number').textContent);
        const price = parseFloat(cartItem.querySelector('.cart__price').textContent.replace('BAM', ''));
        
        totalItems += quantity;
        totalPrice += quantity * price;
    });

    totalItemsDisplay.textContent = `${totalItems} Items`;
    totalPriceDisplay.textContent = `${totalPrice.toFixed(2)} BAM`;

    const redDot = document.querySelector('.red-dot');
    if (totalItems > 0) {
        redDot.style.display = 'block';
    } else {
        redDot.style.display = 'none';
    }
}


// Function to add item to the cart
function addToCart(name, price, imageSrc) {
    let quantity = 1;

    // Check if the item already exists in the cart
    const existingCartItem = document.querySelector(`.cart__title[data-name="${name}"]`);
    if (existingCartItem) {
        // If the item exists, increase its quantity
        const quantityDisplay = existingCartItem.nextElementSibling.querySelector('.cart__amount-number');
        quantity = parseInt(quantityDisplay.textContent) + 1;
        quantityDisplay.textContent = quantity;
    } else {
        // If the item doesn't exist, create a new cart item element
        const cartItem = document.createElement('article');
        cartItem.classList.add('cart__card');
        cartItem.innerHTML = `
            <div class="cart__box">
                <img src="${imageSrc}" alt="" class="cart__img">
            </div>
            <div class="cart__details">
                <h3 class="cart__title" data-name="${name}">${name}</h3>
                <span class="cart__price">${price}BAM</span>
                <div class="cart__amount">
                    <div class="cart__amount-content">
                        <span class="cart__amount-box decrease-quantity">
                            <i class='bx bx-minus'></i>
                        </span>
                        <span class="cart__amount-number">${quantity}</span>
                        <span class="cart__amount-box increase-quantity">
                            <i class='bx bx-plus'></i>
                        </span>
                    </div>
                    <i class='bx bx-trash-alt cart__amount-trash'></i>
                </div>
            </div>
        `;
        
        // Append the new cart item to the cart container
        const cartContainer = document.querySelector('.cart__container');
        cartContainer.appendChild(cartItem);

        // Add event listeners to the cart item buttons
        const decreaseBtn = cartItem.querySelector('.decrease-quantity');
        const increaseBtn = cartItem.querySelector('.increase-quantity');
        const trashBtn = cartItem.querySelector('.cart__amount-trash');
        const quantityDisplay = cartItem.querySelector('.cart__amount-number');
        
        // Decrease quantity
        decreaseBtn.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                quantityDisplay.textContent = quantity;
            } else {
                // Remove the item from the cart if the quantity is 1
                cartContainer.removeChild(cartItem);
            }
            updateCartTotals(); // Update cart totals after changing quantity
        });

        // Increase quantity
        increaseBtn.addEventListener('click', () => {
            quantity++;
            quantityDisplay.textContent = quantity;
            updateCartTotals(); // Update cart totals after changing quantity
        });

        // Remove item from the cart
        trashBtn.addEventListener('click', () => {
            cartContainer.removeChild(cartItem);
            updateCartTotals(); // Update cart totals after removing item
            
        });
    }

    updateCartTotals(); // Update cart totals after adding item
}

// Select all add-to-cart buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

// Add click event listener to each button
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Get product details from the button's data attributes
        const productName = button.dataset.name;
        const productPriceBAM = button.dataset.priceBam;
        let productImageSrc;

        // Check the section where the button is located
        const section = button.closest('section');

        // Fetch product image source based on the section
        if (section.classList.contains('products')) {
            // For products section
            productImageSrc = button.closest('.products__card').querySelector('.products__img').src;
        } else if (section.classList.contains('home')) {
            // For home section
            productImageSrc = section.querySelector('.home__img').src;
        } else if (section.classList.contains('new')) {
            // For new section
            productImageSrc = button.closest('.new__card').querySelector('.new__img').src;
        } else if (section.classList.contains('featured')) {
            // For featured section
            productImageSrc = button.closest('.featured__card').querySelector('.featured__img').src;
        }

        // Call a function to add item to the cart
        addToCart(productName, productPriceBAM, productImageSrc);
    });
});