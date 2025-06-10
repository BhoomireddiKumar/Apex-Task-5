// Product Data (should match your main products array)
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        image: "headphones.webp",
        description: "High-quality wireless headphones with noise cancellation. Perfect for music lovers and professionals who need focus.",
        details: "These premium wireless headphones feature 40mm drivers for rich sound, active noise cancellation, and up to 30 hours of battery life. With Bluetooth 5.0 and built-in microphone for calls.",
        specs: {
            "Color": "Black",
            "Battery Life": "30 hours",
            "Connectivity": "Bluetooth 5.0",
            "Weight": "250g",
            "Noise Cancellation": "Active",
            "Driver Size": "40mm",
            "Microphone": "Built-in",
            "Charging Time": "2 hours"
        },
        reviews: 124
    },
    {
        id: 2,
        name: "Smart Watch Pro",
        price: 199.99,
        image: "smartwatch.webp",
        description: "Track your fitness, receive notifications, and stay connected with this advanced smartwatch.",
        details: "The Smart Watch Pro features a 1.4\" AMOLED display, heart rate monitoring, sleep tracking, and water resistance up to 50m. Compatible with both iOS and Android.",
        specs: {
            "Display": "1.4\" AMOLED",
            "Battery Life": "7 days",
            "Compatibility": "iOS & Android",
            "Water Resistance": "50m",
            "Sensors": "Heart rate, SpO2, Accelerometer, Gyroscope",
            "Notifications": "Call, Text, App Alerts",
            "GPS": "Built-in",
            "Strap Material": "Silicone"
        },
        reviews: 89
    },
    {
        id: 3,
        name: "Ultra HD Laptop",
        price: 1299.99,
        image: "laptop.jpg",
        description: "Powerful laptop with ultra HD display, perfect for work and entertainment.",
        details: "This laptop features a 15.6\" 4K UHD display, Intel Core i7 processor, 16GB RAM, and 512GB SSD storage. With NVIDIA graphics and all-day battery life.",
        specs: {
            "Processor": "Intel Core i7-1165G7",
            "RAM": "16GB DDR4",
            "Storage": "512GB NVMe SSD",
            "Display": "15.6\" 4K UHD (3840 x 2160)",
            "Graphics": "NVIDIA GeForce MX450",
            "Battery Life": "Up to 10 hours",
            "Operating System": "Windows 11 Pro",
            "Ports": "2x USB-C, 2x USB-A, HDMI, SD card reader"
        },
        reviews: 56
    },
    {
        id: 4,
        name: "Professional Camera",
        price: 899.99,
        image: "camera.jpg",
        description: "Capture stunning photos with this professional-grade camera.",
        details: "24.2MP full-frame sensor, 4K video recording, and 5-axis image stabilization. Includes interchangeable lens system and advanced autofocus.",
        specs: {
            "Sensor": "24.2MP Full-frame CMOS",
            "Video": "4K UHD at 30fps",
            "Stabilization": "5-axis in-body",
            "Lens Mount": "Interchangeable",
            "ISO Range": "100-25600 (expandable to 50-102400)",
            "Autofocus": "425-point phase detection",
            "Continuous Shooting": "10 fps",
            "LCD Screen": "3.2\" tilting touchscreen"
        },
        reviews: 72
    },
    {
        id: 5,
        name: "Bluetooth Speaker",
        price: 79.99,
        image: "speaker.jpg",
        description: "Portable Bluetooth speaker with crystal clear sound.",
        details: "Delivers 20W of powerful sound with deep bass. IPX7 waterproof rating and 15-hour playtime. Compact design with built-in microphone for calls.",
        specs: {
            "Power Output": "20W",
            "Battery Life": "15 hours",
            "Waterproof": "IPX7 (fully waterproof)",
            "Weight": "600g",
            "Bluetooth Version": "5.0",
            "Range": "Up to 30 feet",
            "Microphone": "Built-in for hands-free calls",
            "Charging": "USB-C"
        },
        reviews: 215
    },
    {
        id: 6,
        name: "Fitness Tracker",
        price: 49.99,
        image: "tracker.jpg",
        description: "Monitor your daily activity and health metrics.",
        details: "Tracks steps, distance, calories burned, and sleep patterns. Features a color touchscreen, heart rate monitoring, and 7-day battery life.",
        specs: {
            "Display": "1.1\" color touchscreen",
            "Battery Life": "7 days",
            "Tracking": "Steps, distance, calories, sleep",
            "Water Resistance": "IP68 (swim-proof)",
            "Heart Rate Monitor": "24/7 tracking",
            "Notifications": "Call, text, app alerts",
            "Compatibility": "iOS & Android",
            "Strap": "Interchangeable"
        },
        reviews: 183
    },
    {
        id: 7,
        name: "Gaming Keyboard",
        price: 129.99,
        image: "keyboard.jpg",
        description: "Mechanical gaming keyboard with RGB lighting.",
        details: "Features Cherry MX switches for precise actuation, customizable RGB backlighting, and dedicated media controls. Built for performance and durability.",
        specs: {
            "Switch Type": "Cherry MX Red",
            "Backlighting": "RGB (16.8 million colors)",
            "Key Rollover": "N-key rollover",
            "Connectivity": "USB 2.0",
            "Media Controls": "Dedicated volume wheel and buttons",
            "Cable": "Braided, detachable",
            "Dimensions": "17.5 x 5.5 x 1.5 inches",
            "Weight": "2.2 lbs"
        },
        reviews: 67
    },
    {
        id: 8,
        name: "Wireless Earbuds",
        price: 149.99,
        image: "earbuds.webp",
        description: "True wireless earbuds with premium sound quality.",
        details: "Features active noise cancellation, 6-hour battery life (24h with case), and touch controls. IPX4 water resistance for workouts.",
        specs: {
            "Battery Life": "6 hours (24h with case)",
            "Noise Cancellation": "Active (ANC)",
            "Water Resistance": "IPX4",
            "Bluetooth": "5.0",
            "Driver Size": "8.6mm dynamic",
            "Charging": "Wireless charging case",
            "Controls": "Touch-sensitive",
            "Weight": "5g per earbud"
        },
        reviews: 142
    }
];

document.addEventListener('DOMContentLoaded', function() {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    // Find the product
    const product = products.find(p => p.id === productId);
    
    if (product) {
        // Update page title
        document.title = `EZY SHOP - ${product.name}`;
        
        // Display product info
        document.getElementById('productName').textContent = product.name;
        document.getElementById('productPrice').textContent = `$${product.price.toFixed(2)}`;
        document.getElementById('productImage').src = `images/${product.image}`;
        document.getElementById('productImage').alt = product.name;
        document.getElementById('productDescription').textContent = product.description;
        document.getElementById('reviewCount').textContent = product.reviews || 0;
        
        // Display specifications
        const specsList = document.getElementById('specsList');
        for (const [key, value] of Object.entries(product.specs)) {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${key}:</strong> ${value}`;
            specsList.appendChild(li);
        }
    } else {
        // Product not found - show error
        document.querySelector('.product-container').innerHTML = `
            <div class="error-message">
                <h2>Product Not Found</h2>
                <p>The requested product could not be found.</p>
                <a href="index.html">Return to Shop</a>
            </div>
        `;
    }
    
    // Checkout form handling (same as before)
    const buyNowBtn = document.getElementById('buyNowBtn');
    const checkoutForm = document.getElementById('checkoutForm');
    const cancelBtn = document.getElementById('cancelBtn');
    const orderForm = document.getElementById('orderForm');
    
    buyNowBtn.addEventListener('click', function() {
        checkoutForm.style.display = 'block';
        window.scrollTo({
            top: checkoutForm.offsetTop,
            behavior: 'smooth'
        });
    });
    
    cancelBtn.addEventListener('click', function() {
        checkoutForm.style.display = 'none';
    });
    
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
        
        if (paymentMethod === 'cod') {
            alert(`Thank you, ${name}! Your order has been confirmed.`);
        } 
        
        orderForm.reset();
        checkoutForm.style.display = 'none';
    });
});