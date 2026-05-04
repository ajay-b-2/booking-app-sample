// --- State Management ---
let currentUser = null; // null or { name, email, role: 'user' | 'admin' }
let packages = [
    {
        id: 1,
        title: 'Munnar Tea Gardens Retreat',
        location: 'Munnar, Kerala',
        category: 'Hill Station',
        price: 15000,
        image: 'assets/munnar.png',
        description: 'Experience the breathtaking lush green tea gardens of Munnar. Enjoy misty mornings, rolling hills, and a serene getaway amidst nature.',
        rating: 4.8,
        reviews: [
            { user: 'John Doe', text: 'Amazing experience! The views are spectacular.' },
            { user: 'Sarah M', text: 'Highly recommend this for a peaceful retreat.' }
        ]
    },
    {
        id: 2,
        title: 'Alleppey Backwater Cruise',
        location: 'Alleppey, Kerala',
        category: 'Backwaters',
        price: 22000,
        image: 'assets/alleppey.png',
        description: 'Relax in a traditional wooden houseboat on the serene backwaters of Alleppey. Enjoy golden sunsets, palm trees, and delicious Kerala cuisine onboard.',
        rating: 4.9,
        reviews: [
            { user: 'Mike T', text: 'The houseboat stay was incredible and very relaxing.' }
        ]
    },
    {
        id: 3,
        title: 'Wayanad Forest Adventure',
        location: 'Wayanad, Kerala',
        category: 'Nature',
        price: 18000,
        image: 'assets/wayanad.png',
        description: 'Discover the dense green forests of Wayanad. Visit majestic waterfalls, explore wildlife, and stay in eco-friendly nature resorts.',
        rating: 4.7,
        reviews: []
    },
    {
        id: 4,
        title: 'Goa Beach Holiday',
        location: 'Goa, India',
        category: 'Beach',
        price: 12000,
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop',
        description: 'Enjoy the vibrant nightlife, sandy beaches, and water sports in Goa. Perfect for a relaxing getaway.',
        rating: 4.6,
        reviews: []
    },
    {
        id: 5,
        title: 'Jaipur Heritage Tour',
        location: 'Jaipur, Rajasthan',
        category: 'Heritage',
        price: 14000,
        image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1000&auto=format&fit=crop',
        description: 'Explore the Pink City, visit majestic forts, and experience the rich cultural heritage of Rajasthan.',
        rating: 4.8,
        reviews: []
    },
    {
        id: 6,
        title: 'Manali Snow Trek',
        location: 'Manali, Himachal',
        category: 'Hill Station',
        price: 16000,
        image: 'https://images.unsplash.com/photo-1605649487212-4d4b1f4fa9b4?q=80&w=1000&auto=format&fit=crop',
        description: 'Experience the thrill of snowy mountains, cozy cafes, and beautiful pine forests in Manali.',
        rating: 4.9,
        reviews: []
    }
];

let bookings = [
    // { id, packageId, userId (email), date, guests, total, status }
];

let currentPackage = null;
let currentBooking = null; // Temporary state during booking flow
let currentCategory = 'All';
let maxPrice = 50000;
let historyStack = [];
let currentBookingTab = 'upcoming';

// --- Initialization ---
window.onload = () => {
    setTimeout(() => {
        navigateTo('auth-screen');
    }, 2000); // 2 second splash screen
};

// --- Navigation ---
function navigateTo(screenId, pushToHistory = true) {
    const currentActive = document.querySelector('.screen.active');
    if (currentActive && pushToHistory && currentActive.id !== 'splash-screen' && currentActive.id !== 'auth-screen') {
        historyStack.push(currentActive.id);
    }

    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(screenId);
    if(target) target.classList.add('active');

    // Bottom Nav visibility
    const mainNav = document.getElementById('main-nav');
    const screensWithNav = ['home-screen', 'dashboard-screen', 'user-bookings-screen'];
    if (screensWithNav.includes(screenId)) {
        mainNav.style.display = 'flex';
        updateNavHighlight(screenId);
    } else {
        mainNav.style.display = 'none';
    }

    // Refresh data on specific screens
    if (screenId === 'home-screen') {
        renderPackages();
        renderUpcomingBooking();
    }
    if (screenId === 'user-bookings-screen') renderUserBookings();
    if (screenId === 'admin-screen') {
        renderAdminPackages();
        renderAdminBookings();
    }
}

function goBack() {
    if (historyStack.length > 0) {
        const prevScreen = historyStack.pop();
        navigateTo(prevScreen, false);
    } else {
        navigateTo('home-screen', false);
    }
}

function navToTab(screenId, element) {
    historyStack = []; // Clear stack on bottom nav click
    navigateTo(screenId, false);
    
    // special logic if admin clicks profile
    if (screenId === 'dashboard-screen' && currentUser?.role === 'admin') {
        navigateTo('admin-screen', false);
    }
}

function updateNavHighlight(screenId) {
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    if(screenId === 'home-screen') {
        document.querySelectorAll('.nav-item')[0].classList.add('active');
    } else if (screenId === 'user-bookings-screen') {
        document.querySelectorAll('.nav-item')[1].classList.add('active');
    } else if (screenId === 'dashboard-screen' || screenId === 'admin-screen') {
        document.querySelectorAll('.nav-item')[2].classList.add('active');
    }
}

function resetNav() {
    historyStack = [];
}

// --- Auth Flow ---
let authMode = 'login';
function switchAuthTab(mode) {
    authMode = mode;
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    const nameGroup = document.getElementById('name-group');
    const submitBtn = document.getElementById('auth-submit-btn');
    
    if (mode === 'signup') {
        nameGroup.style.display = 'flex';
        submitBtn.innerText = 'Sign Up';
    } else {
        nameGroup.style.display = 'none';
        submitBtn.innerText = 'Login';
    }
}

function handleAuth(e) {
    e.preventDefault();
    const email = document.getElementById('auth-email').value;
    const isAdmin = document.getElementById('auth-is-admin').checked;
    
    let name = "Traveler";
    if (authMode === 'signup') {
        name = document.getElementById('auth-name').value || "Traveler";
        showToast("Account created successfully!");
    } else {
        showToast("Logged in successfully!");
    }

    currentUser = {
        name: name,
        email: email,
        role: isAdmin ? 'admin' : 'user'
    };

    document.getElementById('user-greeting-name').innerText = currentUser.name.split(' ')[0];
    document.getElementById('dash-user-name').innerText = currentUser.name;
    document.getElementById('dash-user-email').innerText = currentUser.email;

    if (currentUser.role === 'admin') {
        navigateTo('admin-screen');
    } else {
        navigateTo('home-screen');
    }
}

function logout() {
    currentUser = null;
    historyStack = [];
    document.getElementById('auth-form').reset();
    navigateTo('auth-screen');
}

// --- Home Screen Logic ---
function renderPackages() {
    const list = document.getElementById('package-list');
    list.innerHTML = '';
    const query = document.getElementById('search-input').value.toLowerCase();

    let filtered = packages.filter(p => {
        const matchCategory = currentCategory === 'All' || p.category === currentCategory;
        const matchSearch = p.title.toLowerCase().includes(query) || p.location.toLowerCase().includes(query);
        const matchPrice = p.price <= maxPrice;
        return matchCategory && matchSearch && matchPrice;
    });

    if(filtered.length === 0) {
        list.innerHTML = '<p style="text-align:center; color: var(--text-muted); margin-top: 20px;">No packages found.</p>';
        return;
    }

    filtered.forEach(pkg => {
        const div = document.createElement('div');
        div.className = 'package-card';
        div.onclick = () => openDetails(pkg.id);
        div.innerHTML = `
            <div class="package-img" style="background-image: url('${pkg.image}')">
                <div class="package-price-tag">₹${pkg.price}</div>
            </div>
            <div class="package-info">
                <h3 class="package-title">${pkg.title}</h3>
                <p class="package-loc"><i class="ri-map-pin-line"></i> ${pkg.location}</p>
                <div class="package-rating">
                    <i class="ri-star-fill"></i> ${pkg.rating} (${pkg.reviews.length})
                </div>
            </div>
        `;
        list.appendChild(div);
    });
}

function renderUpcomingBooking() {
    const container = document.getElementById('home-upcoming-booking');
    const card = document.getElementById('home-booking-card');
    
    if (!currentUser) {
        container.style.display = 'none';
        return;
    }
    
    const myBookings = bookings.filter(b => b.userId === currentUser.email && b.status === 'Confirmed');
    if (myBookings.length > 0) {
        const nextTrip = myBookings[0];
        const pkg = packages.find(p => p.id === nextTrip.packageId);
        container.style.display = 'block';
        card.innerHTML = `
            <div class="bc-header">
                <span>${pkg.title}</span>
                <span class="bc-status">Upcoming</span>
            </div>
            <div class="bc-date" style="margin-top:8px;"><i class="ri-calendar-line"></i> Date: ${nextTrip.date}</div>
            <div class="bc-date" style="margin-top:4px;"><i class="ri-user-line"></i> Guests: ${nextTrip.guests}</div>
        `;
    } else {
        container.style.display = 'none';
    }
}


function setCategory(cat) {
    currentCategory = cat;
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderPackages();
}

function filterPackages() {
    renderPackages();
}

function toggleFilterModal() {
    const modal = document.getElementById('filter-modal');
    modal.classList.toggle('active');
}

function applyFilters() {
    maxPrice = parseInt(document.getElementById('filter-price').value);
    toggleFilterModal();
    renderPackages();
}

// --- Details Screen Logic ---
function openDetails(id) {
    currentPackage = packages.find(p => p.id === id);
    if(!currentPackage) return;

    document.getElementById('details-image').style.backgroundImage = `url('${currentPackage.image}')`;
    document.getElementById('details-title').innerText = currentPackage.title;
    document.getElementById('details-price').innerText = currentPackage.price;
    document.getElementById('details-location').innerText = currentPackage.location;
    document.getElementById('details-rating-val').innerText = currentPackage.rating;
    document.getElementById('details-reviews-count').innerText = currentPackage.reviews.length;
    document.getElementById('details-desc').innerText = currentPackage.description;
    
    renderReviews();
    navigateTo('details-screen');
}

function renderReviews() {
    const list = document.getElementById('details-reviews-list');
    list.innerHTML = '';
    
    if (currentPackage.reviews.length === 0) {
        list.innerHTML = '<p class="review-text">No reviews yet. Be the first!</p>';
        return;
    }

    currentPackage.reviews.forEach(r => {
        const div = document.createElement('div');
        div.className = 'review-item';
        div.innerHTML = `
            <div class="review-user">${r.user}</div>
            <div class="review-text">${r.text}</div>
        `;
        list.appendChild(div);
    });
}

function submitReview() {
    const input = document.getElementById('review-text');
    const text = input.value.trim();
    if(!text) return;

    currentPackage.reviews.push({
        user: currentUser.name,
        text: text
    });
    
    input.value = '';
    document.getElementById('details-reviews-count').innerText = currentPackage.reviews.length;
    renderReviews();
    showToast("Review added!");
}

// --- Booking Flow ---
function startBooking() {
    if(!currentUser) {
        showToast("Please login first");
        navigateTo('auth-screen');
        return;
    }
    
    document.getElementById('booking-pkg-img').style.backgroundImage = `url('${currentPackage.image}')`;
    document.getElementById('booking-pkg-title').innerText = currentPackage.title;
    document.getElementById('booking-pkg-loc').innerText = currentPackage.location;
    document.getElementById('booking-pkg-price').innerText = currentPackage.price;
    document.getElementById('booking-guests').value = 1;
    document.getElementById('booking-date').value = '';
    updateTotal();
    
    navigateTo('booking-screen');
}

function updateTotal() {
    const guests = parseInt(document.getElementById('booking-guests').value) || 1;
    const total = currentPackage.price * guests;
    document.getElementById('booking-total').innerText = total;
}

function proceedToPayment() {
    const date = document.getElementById('booking-date').value;
    const guests = document.getElementById('booking-guests').value;
    
    if(!date) {
        showToast("Please select a travel date");
        return;
    }

    currentBooking = {
        packageId: currentPackage.id,
        userId: currentUser.email,
        date: date,
        guests: guests,
        total: currentPackage.price * guests
    };

    document.getElementById('payment-amount').innerText = currentBooking.total;
    navigateTo('payment-screen');
}

function selectPayment(method) {
    document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('active'));
    event.currentTarget.classList.add('active');
    
    if (method === 'card') {
        document.getElementById('payment-card-details').style.display = 'block';
        document.getElementById('payment-upi-details').style.display = 'none';
    } else {
        document.getElementById('payment-card-details').style.display = 'none';
        document.getElementById('payment-upi-details').style.display = 'block';
    }
}

function confirmBooking() {
    // Generate random ID
    const refId = Math.floor(10000 + Math.random() * 90000);
    
    bookings.push({
        id: refId,
        packageId: currentBooking.packageId,
        userId: currentBooking.userId,
        date: currentBooking.date,
        guests: currentBooking.guests,
        total: currentBooking.total,
        status: 'Confirmed'
    });

    document.getElementById('confirm-location').innerText = currentPackage.location;
    document.getElementById('confirm-id').innerText = refId;
    
    navigateTo('confirmation-screen', false);
}

// --- User Bookings Logic ---
function switchUserBookingsTab(tab) {
    currentBookingTab = tab;
    const screen = document.getElementById('user-bookings-screen');
    const tabs = screen.querySelectorAll('.admin-tab');
    tabs.forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    renderUserBookings();
}

function renderUserBookings() {
    const list = document.getElementById('user-bookings-list');
    list.innerHTML = '';

    const allMyBookings = bookings.filter(b => b.userId === currentUser.email);
    const filteredBookings = allMyBookings.filter(b => {
        if(currentBookingTab === 'upcoming') {
            return b.status === 'Confirmed';
        } else {
            return b.status === 'Cancelled' || b.status === 'Completed';
        }
    });

    if (filteredBookings.length === 0) {
        list.innerHTML = `<p style="color:var(--text-muted); text-align:center; padding: 20px;">No ${currentBookingTab} bookings found.</p>`;
        return;
    }

    filteredBookings.forEach(b => {
        const pkg = packages.find(p => p.id === b.packageId);
        const div = document.createElement('div');
        div.className = 'booking-card';
        div.innerHTML = `
            <div class="bc-header">
                <span>${pkg.title}</span>
                <span class="bc-status">${b.status}</span>
            </div>
            <div class="bc-date">Travel Date: ${b.date} | Guests: ${b.guests}</div>
            <div style="font-weight:600; font-size:14px; margin-top:4px;">Total: ₹${b.total}</div>
            ${b.status === 'Confirmed' ? `
            <div class="bc-actions">
                <button class="btn-cancel" onclick="cancelBooking(${b.id})">Cancel</button>
            </div>` : ''}
        `;
        list.appendChild(div);
    });
}

function cancelBooking(id) {
    if(confirm("Are you sure you want to cancel this booking?")) {
        const b = bookings.find(x => x.id === id);
        if(b) b.status = 'Cancelled';
        renderUserBookings();
        showToast("Booking cancelled");
    }
}

// --- Admin Panel ---
function switchAdminTab(tab) {
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    document.querySelectorAll('.admin-content-tab').forEach(c => c.classList.remove('active'));
    if(tab === 'manage-packages') {
        document.getElementById('admin-packages-tab').classList.add('active');
    } else {
        document.getElementById('admin-bookings-tab').classList.add('active');
    }
}

function showAddPackageForm() {
    const form = document.getElementById('add-package-form');
    form.style.display = form.style.display === 'none' ? 'flex' : 'none';
}

function saveNewPackage() {
    const title = document.getElementById('new-pkg-title').value;
    const loc = document.getElementById('new-pkg-loc').value;
    const price = parseInt(document.getElementById('new-pkg-price').value);
    const cat = document.getElementById('new-pkg-cat').value;
    const desc = document.getElementById('new-pkg-desc').value;

    if(!title || !loc || !price || !desc) {
        showToast("Please fill all fields");
        return;
    }

    const newPkg = {
        id: packages.length + 1,
        title, location: loc, price, category: cat, description: desc,
        image: 'assets/munnar.png', // using placeholder existing image
        rating: 5.0,
        reviews: []
    };

    packages.push(newPkg);
    
    document.getElementById('new-pkg-title').value = '';
    document.getElementById('new-pkg-loc').value = '';
    document.getElementById('new-pkg-price').value = '';
    document.getElementById('new-pkg-desc').value = '';
    showAddPackageForm(); // hide
    
    renderAdminPackages();
    showToast("Package Added!");
}

function renderAdminPackages() {
    const list = document.getElementById('admin-pkg-list');
    list.innerHTML = '';

    packages.forEach(pkg => {
        const div = document.createElement('div');
        div.className = 'admin-pkg-card';
        div.innerHTML = `
            <div class="admin-pkg-img" style="background-image: url('${pkg.image}')"></div>
            <div class="admin-pkg-info">
                <div class="admin-pkg-title">${pkg.title}</div>
                <div class="admin-pkg-price">₹${pkg.price}</div>
            </div>
            <button class="btn-delete-sm" onclick="deletePackage(${pkg.id})"><i class="ri-delete-bin-line"></i></button>
        `;
        list.appendChild(div);
    });
}

function renderAdminBookings() {
    const list = document.getElementById('admin-all-bookings-list');
    list.innerHTML = '';

    if (bookings.length === 0) {
        list.innerHTML = '<p style="color:var(--text-muted);">No bookings found.</p>';
        return;
    }

    bookings.forEach(b => {
        const pkg = packages.find(p => p.id === b.packageId);
        const div = document.createElement('div');
        div.className = 'booking-card';
        div.innerHTML = `
            <div class="bc-header">
                <span>Ref: #${b.id}</span>
                <span class="bc-status">${b.status}</span>
            </div>
            <div class="bc-date">User: ${b.userId}</div>
            <div class="bc-date">Package: ${pkg?.title} | Date: ${b.date}</div>
            <div style="font-weight:600; font-size:14px; margin-top:4px;">Total: ₹${b.total}</div>
        `;
        list.appendChild(div);
    });
}

// --- Utils ---
function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function deletePackage(id) {
    if(confirm("Are you sure you want to delete this package?")) {
        packages = packages.filter(p => p.id !== id);
        renderAdminPackages();
        showToast("Package deleted successfully");
    }
}