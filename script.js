// Product Data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        image: "headphones.webp",
        description: "High-quality wireless headphones with noise cancellation. Perfect for music lovers and professionals who need focus."
    },
    {
        id: 2,
        name: "Smart Watch Pro",
        price: 199.99,
        image: "smartwatch.webp",
        description: "Track your fitness, receive notifications, and stay connected with this advanced smartwatch."
    },
    {
        id: 3,
        name: "Ultra HD Laptop",
        price: 1299.99,
        image: "laptop.jpg",
        description: "Powerful laptop with ultra HD display, perfect for work and entertainment."
    },
    {
        id: 4,
        name: "Professional Camera",
        price: 899.99,
        image: "camera.jpg",
        description: "Capture stunning photos with this professional-grade camera."
    },
    {
        id: 5,
        name: "Bluetooth Speaker",
        price: 79.99,
        image: "speaker.jpg",
        description: "Portable Bluetooth speaker with crystal clear sound."
    },
    {
        id: 6,
        name: "Fitness Tracker",
        price: 49.99,
        image: "tracker.jpg",
        description: "Monitor your daily activity and health metrics."
    },
    {
        id: 7,
        name: "Gaming Keyboard",
        price: 129.99,
        image: "keyboard.jpg",
        description: "Mechanical gaming keyboard with RGB lighting."
    },
    {
        id: 8,
        name: "Wireless Earbuds",
        price: 149.99,
        image: "earbuds.webp",
        description: "Mechanical gaming keyboard with RGB lighting."
    }
];

// DOM Elements
const productContainer = document.getElementById('productContainer');
const cartCount = document.querySelector('.cart-count');
const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const sortSelect = document.getElementById('sortSelect');
const hamburger = document.getElementById('hamburger');
const navContainer = document.querySelector('.nav-container');
const overlay = document.createElement('div');
overlay.className = 'overlay';
document.body.appendChild(overlay);

// Cart State
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartCount();
    setupEventListeners();
});

// Render Products with clickable areas
function renderProducts() {
    // Sort products based on selection
    const sortedProducts = sortProducts([...products]);
    
    productContainer.innerHTML = sortedProducts.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-clickable-area" data-id="${product.id}">
                <img src="images/${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <p class="product-description">${product.description}</p>
                </div>
            </div>
            <button class="add-to-cart">Add to Cart</button>
        </div>
    `).join('');
    
    // Add event listeners to all add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
    
    // Add click handlers for product redirection (UPDATED FOR ALL PRODUCTS)
    document.querySelectorAll('.product-clickable-area').forEach(area => {
        area.addEventListener('click', function(e) {
            // Don't redirect if clicking on a link or button
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;
            
            const productId = parseInt(this.dataset.id);
            window.location.href = `product.html?id=${productId}`; // Redirect with product ID
        });
    });
}

// Sort Products
function sortProducts(productsToSort) {
    const sortValue = sortSelect.value;
    
    switch(sortValue) {
        case 'price-asc':
            return productsToSort.sort((a, b) => a.price - b.price);
        case 'price-desc':
            return productsToSort.sort((a, b) => b.price - a.price);
        case 'name-asc':
            return productsToSort.sort((a, b) => a.name.localeCompare(b.name));
        default:
            return productsToSort;
    }
}

// Add to Cart
function addToCart(e) {
    e.stopPropagation(); // Prevent event bubbling to the clickable area
    const productId = parseInt(e.target.closest('.product-card').dataset.id);
    const product = products.find(p => p.id === productId);
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showCartNotification(product.name);
}

// Update Cart
function updateCart() {
    updateCartCount();
    renderCartItems();
    saveCartToLocalStorage();
}

// Update Cart Count
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Render Cart Items
function renderCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotal.textContent = '$0.00';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <img src="images/${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</p>
                <button class="cart-item-remove">Remove</button>
            </div>
        </div>
    `).join('');
    
    // Calculate total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

// Remove from Cart
function removeFromCart(e) {
    const productId = parseInt(e.target.closest('.cart-item').dataset.id);
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Save Cart to LocalStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Show Cart Notification
function showCartNotification(productName) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <p>${productName} added to cart!</p>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Setup Event Listeners
function setupEventListeners() {
    // Cart toggle
    cartIcon.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    overlay.addEventListener('click', toggleCart);
    
    // Sort products
    sortSelect.addEventListener('change', renderProducts);
    
    // Mobile menu toggle
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Checkout button
    checkoutBtn.addEventListener('click', proceedToCheckout);
}

// Toggle Cart
function toggleCart() {
    cartSidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
}

// Toggle Mobile Menu
function toggleMobileMenu() {
    navContainer.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    if (navContainer.classList.contains('active')) {
        overlay.classList.add('active');
        document.body.classList.add('no-scroll');
    } else {
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
}

// Proceed to Checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty. Please add some products before checkout.');
        return;
    }
    
    // In a real app, you would redirect to a checkout page
    alert('Proceeding to checkout!');
    // window.location.href = 'checkout.html';
}

// Contact Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Here you would typically send the data to a server
            // For demonstration, we'll just log it and show a success message
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            alert('Thank you for your message!');
            
            // Reset the form
            contactForm.reset();
        });
    }
});