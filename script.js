const allFoods = [
  { id: 1, name: "Paneer Tikka", category: "Starters", type: "Veg", price: 180, image: "panner.jpg" },
  { id: 2, name: "Vegetable Samosa", category: "Starters", type: "Veg", price: 60, image: "samosa.jpg" },
  { id: 3, name: "Mushroom Chili", category: "Starters", type: "Veg", price: 150, image: "mushroom.jpg" },
  { id: 4, name: "Chicken Tikka", category: "Starters", type: "Non-Veg", price: 220, image: "chicken-tikka.jpg" },
  { id: 5, name: "Fish Pakora", category: "Starters", type: "Non-Veg", price: 240, image: "fish-pakora.jpg" },

  { id: 6, name: "Dal Makhani", category: "Main Course", type: "Veg", price: 210, image: "dalmalini.jpg" },
  { id: 7, name: "Veg Meals", category: "Main Course", type: "Veg", price: 120, image: "meals.jpg" },
  { id: 8, name: "Paneer Butter Masala", category: "Main Course", type: "Veg", price: 230, image: "Paneer-Butter-Masala.jpg" },
  { id: 9, name: "Butter Chicken", category: "Main Course", type: "Non-Veg", price: 250, image: "butter chicken.jpg" },
  { id: 10, name: "Tandoori Roti", category: "Main Course", type: "Non-Veg", price: 40, image: "tanoori-roti.webp" },
  { id: 11, name: "Fish Curry", category: "Main Course", type: "Non-Veg", price: 280, image: "fish-curry.jpg" },

  { id: 12, name: "Chicken Biryani", category: "Biryanis", type: "Non-Veg", price: 250, image: "chicken-biryani.jpg" },
  { id: 13, name: "Veg Biryani", category: "Biryanis", type: "Veg", price: 200, image: "veg-biryani.jpg" },
  { id: 14, name: "Mutton Biryani", category: "Biryanis", type: "Non-Veg", price: 280, image: "mutton-biryani.jpg" },

  { id: 15, name: "Gulab Jamun", category: "Desserts", type: "Veg", price: 90, image: "gulab-jamnun.jpg" },
  { id: 16, name: "Ras Malai", category: "Desserts", type: "Veg", price: 95, image: "rasmalai.jpg" },
  { id: 17, name: "Kheer", category: "Desserts", type: "Non-Veg", price: 80, image: "kheer.jpg" },

  { id: 18, name: "Mango Lassi", category: "Soft Drinks", type: "Veg", price: 70, image: "mango lassi.jpg" },
  { id: 19, name: "Caramel Milkshake", category: "Soft Drinks", type: "Non-Veg", price: 50, image: "caramil milkshake.jpg" },
  { id: 20, name: "Nimbu Pani", category: "Soft Drinks", type: "Veg", price: 40, image: "nimbu-pani.jpg" },

  { id: 21, name: "Blackcurrant Ice Cream", category: "Ice Creams", type: "Veg", price: 100, image: "blackcurrent.jpg" },
  { id: 22, name: "Mango Ice Cream", category: "Ice Creams", type: "Veg", price: 120, image: "mango-ice-cream.jpg" },
  { id: 23, name: "Chocolate Ice Cream", category: "Ice Creams", type: "Veg", price: 130, image: "chocolate.jpg" },

  // Further items can be added up to 70+ by following this pattern
];

let filteredFoods = [...allFoods];
let cart = [];

const menuPage = document.getElementById('menuPage');
const cartPage = document.getElementById('cartPage');
const billingPage = document.getElementById('billingPage');
const cartCount = document.getElementById('cartCount');

const cartTableBody = document.querySelector('#cartTable tbody');
const totalDisplay = document.getElementById('total');
const clearCartBtn = document.getElementById('clearCart');
const proceedToBillingBtn = document.getElementById('proceedToBilling');

const billingTableBody = document.querySelector('#billingTable tbody');
const billingTotalDisplay = document.getElementById('billingTotal');
const payNowBtn = document.getElementById('payNow');
const backToCartBtn = document.getElementById('backToCart');

const viewAllBtn = document.getElementById('viewAllBtn');
const viewVegBtn = document.getElementById('viewVegBtn');
const viewNonVegBtn = document.getElementById('viewNonVegBtn');
const viewCartBtn = document.getElementById('viewCartBtn');

const categoryMenuDiv = document.getElementById('categoryMenu');
const categoryButtons = categoryMenuDiv.querySelectorAll('button.category-btn');

let currentCategory = 'All';
let currentFoodType = 'All'; // 'All', 'Veg', or 'Non-Veg'

function showSection(section) {
  menuPage.style.display = 'none';
  cartPage.style.display = 'none';
  billingPage.style.display = 'none';

  section.style.display = 'block';
}

function filterMenu(type) {
  currentFoodType = type;
  currentCategory = 'All';
  updateCategoryButtons();
  if(type === 'All') filteredFoods = [...allFoods];
  else filteredFoods = allFoods.filter(food => food.type === type);
  renderMenu();
}

function filterByCategory(category) {
  currentCategory = category;
  updateCategoryButtons();
  if(category === 'All') {
    filterMenu(currentFoodType);
  } else {
    filteredFoods = allFoods.filter(food => 
      (currentFoodType === 'All' || food.type === currentFoodType) &&
      (food.category === category)
    );
    renderMenu();
  }
}

function updateCategoryButtons() {
  categoryButtons.forEach(btn => {
    if(btn.getAttribute('data-category') === currentCategory) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function renderMenu() {
  menuPage.innerHTML = '';
  const categories = [...new Set(filteredFoods.map(food => food.category))];
  categories.forEach(category => {
    const categorySection = document.createElement('section');
    categorySection.className = 'category';
    const title = document.createElement('h2');
    title.textContent = category;
    categorySection.appendChild(title);

    const itemsGrid = document.createElement('div');
    itemsGrid.className = 'menu-items';

    filteredFoods.filter(f => f.category === category).forEach(item => {
      const foodDiv = document.createElement('div');
      foodDiv.className = 'food-item';
      foodDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <h3>${item.name}</h3>
        <p class="price">₹${item.price.toFixed(2)}</p>
        <button class="add-btn" onclick="addToCart(${item.id})">Add to Cart</button>
      `;
      itemsGrid.appendChild(foodDiv);
    });

    categorySection.appendChild(itemsGrid);
    menuPage.appendChild(categorySection);
  });
}

function addToCart(foodId) {
  const food = allFoods.find(f => f.id === foodId);
  const cartItem = cart.find(item => item.id === foodId);

  if(cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ ...food, quantity: 1 });
  }
  updateCartCount();
  alert(`${food.name} added to cart!`);
}

function removeFromCart(foodId) {
  cart = cart.filter(item => item.id !== foodId);
  updateCartCount();
  renderCart();
}

function changeQuantity(foodId, quantity) {
  if(quantity < 1) return;
  const cartItem = cart.find(item => item.id === foodId);
  if(cartItem) {
    cartItem.quantity = quantity;
    updateCartCount();
    renderCart();
  }
}

function clearCart() {
  cart = [];
  updateCartCount();
  renderCart();
}

function renderCart() {
  cartTableBody.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>₹${item.price.toFixed(2)}</td>
      <td><input type="number" class="qty" value="${item.quantity}" min="1" onchange="changeQuantity(${item.id}, parseInt(this.value))"></td>
      <td>₹${itemTotal.toFixed(2)}</td>
      <td><button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button></td>
    `;
    cartTableBody.appendChild(row);
  });
  totalDisplay.textContent = 'Total: ₹' + total.toFixed(2);
}

function renderBilling() {
  billingTableBody.innerHTML = '';
  let billingTotal = 0;
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    billingTotal += itemTotal;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>₹${item.price.toFixed(2)}</td>
      <td>${item.quantity}</td>
      <td>₹${itemTotal.toFixed(2)}</td>
    `;
    billingTableBody.appendChild(row);
  });
  billingTotalDisplay.textContent = `Total Amount: ₹${billingTotal.toFixed(2)}`;
}

viewAllBtn.addEventListener('click', () => {
  filterMenu('All');
  setActiveButton(viewAllBtn);
  showSection(menuPage);
});
viewVegBtn.addEventListener('click', () => {
  filterMenu('Veg');
  setActiveButton(viewVegBtn);
  showSection(menuPage);
});
viewNonVegBtn.addEventListener('click', () => {
  filterMenu('Non-Veg');
  setActiveButton(viewNonVegBtn);
  showSection(menuPage);
});
viewCartBtn.addEventListener('click', () => {
  setActiveButton(null);
  renderCart();
  showSection(cartPage);
});
clearCartBtn.addEventListener('click', () => {
  if(confirm('Are you sure you want to clear the cart?')) {
    clearCart();
  }
});
proceedToBillingBtn.addEventListener('click', () => {
  if(cart.length === 0) {
    alert('Cart is empty. Please add items before proceeding.');
    return;
  }
  renderBilling();
  showSection(billingPage);
});
payNowBtn.addEventListener('click', () => {
  if(cart.length === 0){
    alert('Cart is empty.');
    showSection(menuPage);
    return;
  }
  const upiAmount = billingTotalDisplay.textContent.replace(/[^\d.]/g, '');
  // UPI payment URL, replace with merchant's real VPA and name
  const upiUrl = `upi://pay?pa=merchant-vpa@bank&pn=MerchantName&am=${upiAmount}&cu=INR&tn=IndianFoodOrder`;
  window.location.href = upiUrl;
});
backToCartBtn.addEventListener('click', () => {
  renderCart();
  showSection(cartPage);
});

function setActiveButton(button) {
  [viewAllBtn, viewVegBtn, viewNonVegBtn].forEach(btn => btn.classList.remove('active'));
  if(button) button.classList.add('active');
}

function updateCartCount() {
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

filterMenu('All');
setActiveButton(viewAllBtn);
updateCartCount();
showSection(menuPage);
