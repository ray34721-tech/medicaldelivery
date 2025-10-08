// Sample medicine data with images
const medicines = [
    { id: 1, name: "Paracetamol", price: 510, category: "painkiller", description: "Pain relief medicine", image: "images/paracetamol.jpeg" },
    { id: 2, name: "Ibuprofen", price: 700, category: "painkiller", description: "Anti-inflammatory", image: "images/ibuprofen.jpeg" },
    { id: 3, name: "Amoxicillin", price: 125, category: "antibiotic", description: "Antibiotic medicine", image: "images/amoxicillin.jpeg" },
    { id: 4, name: "Vitamin D3", price: 150, category: "vitamin", description: "Vitamin supplement", image: "images/vitamin_d3.jpeg" },
    { id: 5, name: "Cetirizine", price: 80, category: "antihistamine", description: "Allergy medicine", image: "images/cetirizine.jpeg" },
    { id: 6, name: "Omeprazole", price: 110, category: "antacid", description: "Stomach acid reducer", image: "images/omeprazole.jpeg" }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElements.forEach(element => {
        if (element) element.textContent = totalItems;
    });
}

// Add to cart function
function addToCart(medicineId) {
    const medicine = medicines.find(med => med.id === medicineId);
    const existingItem = cart.find(item => item.id === medicineId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...medicine, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${medicine.name} added to cart!`);
}

// Remove from cart function
function removeFromCart(medicineId) {
    cart = cart.filter(item => item.id !== medicineId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems();
}

// Display medicines with images
function displayMedicines(medicinesToShow = medicines) {
    const medicineGrid = document.getElementById('medicine-grid');
    if (!medicineGrid) return;
    
    medicineGrid.innerHTML = '';
    
    medicinesToShow.forEach(medicine => {
        const medicineCard = document.createElement('div');
        medicineCard.className = 'medicine-card';
        medicineCard.innerHTML = `
            <img src="${medicine.image}" alt="${medicine.name}" class="medicine-image">
            <h3>${medicine.name}</h3>
            <p>${medicine.description}</p>
            <div class="price">$${medicine.price.toFixed(2)}</div>
            <button class="add-to-cart" onclick="addToCart(${medicine.id})">Add to Cart</button>
        `;
        medicineGrid.appendChild(medicineCard);
    });
}

// Display featured medicines on home page with images
function displayFeaturedMedicines() {
    const featuredGrid = document.getElementById('featured-grid');
    if (!featuredGrid) return;
    
    const featured = medicines.slice(0, 4);
    featuredGrid.innerHTML = '';
    
    featured.forEach(medicine => {
        const medicineCard = document.createElement('div');
        medicineCard.className = 'medicine-card';
        medicineCard.innerHTML = `
            <img src="${medicine.image}" alt="${medicine.name}" class="medicine-image">
            <h3>${medicine.name}</h3>
            <p>${medicine.description}</p>
            <div class="price">$${medicine.price.toFixed(2)}</div>
            <button class="add-to-cart" onclick="addToCart(${medicine.id})">Add to Cart</button>
        `;
        featuredGrid.appendChild(medicineCard);
    });
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterMedicines);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterMedicines);
    }
}

// Filter medicines
function filterMedicines() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const selectedCategory = document.getElementById('category-filter').value;
    
    let filtered = medicines.filter(medicine => {
        const matchesSearch = medicine.name.toLowerCase().includes(searchTerm) ||
                            medicine.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !selectedCategory || medicine.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });
    
    displayMedicines(filtered);
}

// Display cart items
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
        if (cartTotal) cartTotal.textContent = '0.00';
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; border-radius: 5px;">
                <div>
                    <h3>${item.name}</h3>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            </div>
            <button onclick="removeFromCart(${item.id})" style="background: #e53e3e; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });
    
    if (cartTotal) cartTotal.textContent = total.toFixed(2);
    
    // Update final total on checkout page
    const finalTotal = document.getElementById('final-total');
    if (finalTotal) finalTotal.textContent = total.toFixed(2);
}

// Form validations
function setupFormValidation() {
    // Registration form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            alert('Registration successful! Please login.');
            window.location.href = 'login.html';
        });
    }
    
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Login successful!');
            window.location.href = 'index.html';
        });
    }
    
    // Checkout form
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            
            alert('Order placed successfully! Your medicines will be delivered soon.');
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.href = 'index.html';
        });
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    displayMedicines();
    displayFeaturedMedicines();
    displayCartItems();
    setupSearch();
    setupFormValidation();
});
