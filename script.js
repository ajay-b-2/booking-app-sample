// --- State Management ---
let currentUser = null; 
let vehicles = [
    {
        id: 1,
        name: 'Tata nexon',
        category: 'Car',
        type: 'Luxury Sedan',
        price: 3500,
        seating: 4,
        transmission: 'Automatic',
        fuel: 'Petrol',
        image: 'https://imgd.aeplcdn.com/310x174/n/cw/ec/141867/nexon-exterior-right-front-three-quarter-79.png?isig=0&q=80',
        rating: 5.0,
        reviews: [
            { user: 'Karan M', text: 'Ultimate luxury! Made our wedding day unforgettable.' }
        ],
        description: 'The epitome of luxury. Make a grand entrance on your special day in the world-renowned Tata nexon. Chauffeur included.'
    },
    {
        id: 2,
        name: 'Maruti Wagon R',
        category: 'Car',
        type: 'Vintage',
        price: 2500,
        seating: 4,
        transmission: 'Manual',
        fuel: 'Petrol',
        image: 'https://imgd.aeplcdn.com/1920x1080/n/cw/ec/112947/wagon-r-exterior-right-front-three-quarter-6.png?isig=0&q=80&q=80',
        rating: 4.9,
        reviews: [],
        description: 'Add a touch of timeless elegance to your wedding with this fully restored classic vintage Jaguar.'
    },
    {
        id: 3,
        name: 'Maruti Suzuki Swift',
        category: 'Car',
        type: 'Hatchback',
        price: 1500,
        seating: 4,
        transmission: 'Manual',
        fuel: 'Petrol',
        image: 'https://i0.wp.com/bestsellingcarsblog.com/wp-content/uploads/2022/06/Suzuki-Swift-South-Africa-May-2022.jpeg?resize=600%2C400',
        rating: 4.8,
        reviews: [
            { user: 'Rahul K', text: 'Great car for city driving.' }
        ],
        description: 'Compact and fuel-efficient hatchback, perfect for city rides and short trips. Features AC, Bluetooth audio, and comfortable seating.'
    },

    {
        id: 4,
        name: 'Toyota Innova Crysta',
        category: 'Car',
        type: 'SUV',
        price: 3000,
        seating: 7,
        transmission: 'Automatic',
        fuel: 'Diesel',
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1000',
        rating: 4.9,
        reviews: [],
        description: 'Premium SUV offering ultimate comfort for long journeys. Ample legroom, powerful AC, and smooth automatic transmission.'
    },

       {
        id: 9,
        name: 'Maruti Alto K10',
        category: 'Car',
        type: 'Hatchback',
        price: 900,
        seating: 4,
        transmission: 'Manual',
        fuel: 'Diesel',
        image: 'https://imgd.aeplcdn.com/664x374/cw/ec/39013/Maruti-Suzuki-Alto-Right-Front-Three-Quarter-154833.jpg?wm=0&q=80',
        rating: 4.6,
        reviews: [],
        description: 'Reliable and comfortable AC tourist bus for corporate trips, school tours, and large group travels.'
    },
    {
        id: 5,
        name: 'Force Traveller',
        category: 'Traveller',
        type: 'Van',
        price: 4500,
        seating: 12,
        transmission: 'Manual',
        fuel: 'Diesel',
        image: 'https://buscdn.cardekho.com/in/force/traveller-3050/force-traveller-3050.jpg?impolicy=resize&imwidth=480',
        rating: 4.7,
        reviews: [],
        description: 'Spacious 12-seater AC Traveller for group tours and family trips. Comes with push-back seats and ample luggage space.'
    },
    {
        id: 6,
        name: 'Tempo Traveller',
        category: 'Traveller',
        type: 'Van',
        price: 16000,
        seating: 30,
        transmission: 'Manual',
        fuel: 'Diesel',
        image: 'https://cdn.bluebirdtravels.in/wp-content/uploads/2017/01/Tempo_Traveller_PI.png',
        rating: 4.8,
        reviews: [],
        description: 'Tempo Traveller is for every occasion, Economy and Luxury. Vehicle to undertake rugged mountain trips. Long trips or short ones, Hill stations or other picnic spots, We have the right range for you.'
    },

           {
        id: 10,
        name: 'Force Urbania',
        category: 'Traveller',
        type: 'Hatchback',
        price: 12000,
        seating: 20,
        transmission: 'Manual',
        fuel: 'Diesel',
        image: 'https://buscdn.cardekho.com/in/force/urbania/force-urbania.jpg?impolicy=resize&imwidth=480',
        rating: 4.6,
        reviews: [],
        description: 'Reliable and comfortable AC tourist bus for corporate trips, school tours, and large group travels.'
    },
    {
        id: 7,
        name: 'Touist Bus volvo',
        category: 'Bus',
        type: 'Luxury Bus',
        price: 12000,
        seating: 45,
        transmission: 'Automatic',
        fuel: 'Diesel',
        image: 'https://keralatourbus.com/wp-content/uploads/2019/04/glider-1-ktb.png',
        rating: 4.9,
        reviews: [],
        description: 'State-of-the-art Volvo luxury tourist bus with semi-sleeper seats, onboard entertainment, and air suspension for maximum comfort.'
    },
    {
        id: 8,
        name: 'Tata Magna Tourist AC',
        category: 'Bus',
        type: 'AC Bus',
        price: 9000,
        seating: 35,
        transmission: 'Manual',
        fuel: 'Diesel',
        image: 'https://www.clearcabs.com/assets/img/service/volvo-bus-hire-clearcabs-1.webp',
        rating: 4.6,
        reviews: [],
        description: 'Reliable and comfortable AC tourist bus for corporate trips, school tours, and large group travels.'
    },


    
    

  
    
];

let bookings = [];
let currentVehicle = null;
let currentBooking = null; 
let currentCategory = 'All';
let maxPrice = 50000;
let historyStack = [];
let currentBookingTab = 'upcoming';

// --- Initialization ---
window.onload = () => {
    setTimeout(() => {
        navigateTo('auth-screen');
    }, 2000); 
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

    const mainNav = document.getElementById('main-nav');
    const screensWithNav = ['home-screen', 'dashboard-screen', 'user-bookings-screen'];
    if (screensWithNav.includes(screenId)) {
        if(mainNav) mainNav.style.display = 'flex';
        updateNavHighlight(screenId);
    } else {
        if(mainNav) mainNav.style.display = 'none';
    }

    if (screenId === 'home-screen') {
        renderVehicles();
        renderUpcomingBooking();
    }
    if (screenId === 'user-bookings-screen') {
        currentBookingTab = 'upcoming'; // Reset to default tab
        const screen = document.getElementById('user-bookings-screen');
        if (screen) {
            const tabs = screen.querySelectorAll('.admin-tab');
            tabs.forEach(t => t.classList.remove('active'));
            if (tabs[0]) tabs[0].classList.add('active');
        }
        renderUserBookings();
    }
    if (screenId === 'admin-screen') {
        renderAdminVehicles();
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
    historyStack = []; 
    navigateTo(screenId, false);
    
    if (screenId === 'dashboard-screen' && currentUser?.role === 'admin') {
        navigateTo('admin-screen', false);
    }
}

function updateNavHighlight(screenId) {
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    if(screenId === 'home-screen') {
        if(document.querySelectorAll('.nav-item')[0]) document.querySelectorAll('.nav-item')[0].classList.add('active');
    } else if (screenId === 'user-bookings-screen') {
        if(document.querySelectorAll('.nav-item')[1]) document.querySelectorAll('.nav-item')[1].classList.add('active');
    } else if (screenId === 'dashboard-screen' || screenId === 'admin-screen') {
        if(document.querySelectorAll('.nav-item')[2]) document.querySelectorAll('.nav-item')[2].classList.add('active');
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
    if (event && event.currentTarget) event.currentTarget.classList.add('active');
    
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
function renderVehicles() {
    const list = document.getElementById('vehicle-list');
    list.innerHTML = '';
    const query = document.getElementById('search-input').value.toLowerCase();

    let filtered = vehicles.filter(v => {
        const matchCategory = currentCategory === 'All' || v.category === currentCategory;
        const matchSearch = v.name.toLowerCase().includes(query) || v.type.toLowerCase().includes(query);
        const matchPrice = v.price <= maxPrice;
        return matchCategory && matchSearch && matchPrice;
    });

    if(filtered.length === 0) {
        list.innerHTML = '<p style="text-align:center; color: var(--text-muted); margin-top: 20px;">No vehicles found.</p>';
        return;
    }

    filtered.forEach(veh => {
        const div = document.createElement('div');
        div.className = 'package-card';
        div.onclick = () => openDetails(veh.id);
        div.innerHTML = `
            <div class="package-img" style="background-image: url('${veh.image}')">
                <div class="package-price-tag">₹${veh.price}/day</div>
            </div>
            <div class="package-info">
                <h3 class="package-title">${veh.name}</h3>
                <p class="package-loc"><i class="ri-steering-2-line"></i> ${veh.type} • ${veh.seating} Seats</p>
                <div class="package-rating">
                    <i class="ri-star-fill"></i> ${veh.rating}
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
        const nextTrip = myBookings[myBookings.length - 1]; // most recent
        const veh = vehicles.find(v => v.id === nextTrip.vehicleId);
        container.style.display = 'block';
        card.innerHTML = `
            <div class="bc-header">
                <span>${veh ? veh.name : 'Unknown Vehicle'}</span>
                <span class="bc-status">Upcoming</span>
            </div>
            <div class="bc-date" style="margin-top:8px;"><i class="ri-calendar-line"></i> From: ${nextTrip.startDate} To: ${nextTrip.endDate}</div>
            <div class="bc-date" style="margin-top:4px;"><i class="ri-wallet-3-line"></i> Total: ₹${nextTrip.total}</div>
        `;
    } else {
        container.style.display = 'none';
    }
}

function setCategory(cat) {
    currentCategory = cat;
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderVehicles();
}

function toggleFilterModal() {
    const modal = document.getElementById('filter-modal');
    modal.classList.toggle('active');
}

function applyFilters() {
    maxPrice = parseInt(document.getElementById('filter-price').value);
    toggleFilterModal();
    renderVehicles();
}

// --- Details Screen Logic ---
function openDetails(id) {
    currentVehicle = vehicles.find(v => v.id === id);
    if(!currentVehicle) return;

    document.getElementById('details-image').style.backgroundImage = `url('${currentVehicle.image}')`;
    document.getElementById('details-title').innerText = currentVehicle.name;
    document.getElementById('details-price-val').innerText = currentVehicle.price;
    document.getElementById('details-type').innerText = currentVehicle.type;
    document.getElementById('details-transmission').innerText = currentVehicle.transmission;
    document.getElementById('details-fuel').innerText = currentVehicle.fuel;
    document.getElementById('details-rating-val').innerText = currentVehicle.rating;
    document.getElementById('details-seating').innerText = currentVehicle.seating;
    document.getElementById('details-desc').innerText = currentVehicle.description;
    
    navigateTo('details-screen');
}


// --- Booking Flow ---
function startBooking() {
    if(!currentUser) {
        showToast("Please login first");
        navigateTo('auth-screen');
        return;
    }
    
    document.getElementById('booking-pkg-img').style.backgroundImage = `url('${currentVehicle.image}')`;
    document.getElementById('booking-pkg-title').innerText = currentVehicle.name;
    document.getElementById('booking-pkg-seats').innerText = currentVehicle.seating + ' Seats';
    document.getElementById('booking-pkg-price').innerText = currentVehicle.price;
    document.getElementById('booking-start-date').value = '';
    document.getElementById('booking-end-date').value = '';
    document.getElementById('booking-total').innerText = '0';
    
    navigateTo('booking-screen');
}

function updateTotal() {
    const start = document.getElementById('booking-start-date').value;
    const end = document.getElementById('booking-end-date').value;
    
    if (start && end) {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffTime = endDate - startDate;
        let days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (days < 1) days = 1; // minimum 1 day
        
        const total = currentVehicle.price * days;
        document.getElementById('booking-total').innerText = total;
    }
}

function proceedToPayment() {
    const start = document.getElementById('booking-start-date').value;
    const end = document.getElementById('booking-end-date').value;
    const totalText = document.getElementById('booking-total').innerText;
    
    if(!start || !end) {
        showToast("Please select dates");
        return;
    }

    if (new Date(end) < new Date(start)) {
        showToast("End date must be after start date");
        return;
    }

    currentBooking = {
        vehicleId: currentVehicle.id,
        userId: currentUser.email,
        startDate: start,
        endDate: end,
        total: parseInt(totalText)
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
    const refId = Math.floor(10000 + Math.random() * 90000);
    
    bookings.push({
        id: refId,
        vehicleId: currentBooking.vehicleId,
        userId: currentBooking.userId,
        startDate: currentBooking.startDate,
        endDate: currentBooking.endDate,
        total: currentBooking.total,
        status: 'Confirmed'
    });

    document.getElementById('confirm-id').innerText = refId;
    
    navigateTo('confirmation-screen', false);
}

// --- User Bookings Logic ---
function switchUserBookingsTab(tab) {
    currentBookingTab = tab;
    const screen = document.getElementById('user-bookings-screen');
    const tabs = screen.querySelectorAll('.admin-tab');
    tabs.forEach(t => t.classList.remove('active'));
    if (event && event.currentTarget) event.currentTarget.classList.add('active');
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
        list.innerHTML = `<p style="color:var(--text-muted); text-align:center; padding: 20px;">No ${currentBookingTab} rides found.</p>`;
        return;
    }

    filteredBookings.forEach(b => {
        const veh = vehicles.find(v => v.id === b.vehicleId);
        const div = document.createElement('div');
        div.className = 'booking-card';
        div.innerHTML = `
            <div class="bc-header">
                <span>${veh ? veh.name : 'Unknown Vehicle'}</span>
                <span class="bc-status">${b.status}</span>
            </div>
            <div class="bc-date">From: ${b.startDate} | To: ${b.endDate}</div>
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
    document.querySelectorAll('#admin-screen .admin-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    document.querySelectorAll('.admin-content-tab').forEach(c => c.classList.remove('active'));
    if(tab === 'manage-vehicles') {
        document.getElementById('admin-vehicles-tab').classList.add('active');
    } else {
        document.getElementById('admin-bookings-tab').classList.add('active');
    }
}

function showAddVehicleForm() {
    const form = document.getElementById('add-vehicle-form');
    form.style.display = form.style.display === 'none' ? 'flex' : 'none';
}

function saveNewVehicle() {
    const name = document.getElementById('new-veh-name').value;
    const cat = document.getElementById('new-veh-cat').value;
    const type = document.getElementById('new-veh-type').value;
    const price = parseInt(document.getElementById('new-veh-price').value);
    const seats = parseInt(document.getElementById('new-veh-seats').value);
    const trans = document.getElementById('new-veh-transmission').value;
    const fuel = document.getElementById('new-veh-fuel').value;
    const desc = document.getElementById('new-veh-desc').value;

    if(!name || !price || !seats || !desc) {
        showToast("Please fill all required fields");
        return;
    }

    const newVeh = {
        id: vehicles.length + 1,
        name: name, category: cat, type: type, price: price, 
        seating: seats, transmission: trans, fuel: fuel, description: desc,
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1000',
        rating: 5.0,
        reviews: []
    };

    vehicles.push(newVeh);
    
    document.getElementById('new-veh-name').value = '';
    document.getElementById('new-veh-type').value = '';
    document.getElementById('new-veh-price').value = '';
    document.getElementById('new-veh-seats').value = '';
    document.getElementById('new-veh-transmission').value = '';
    document.getElementById('new-veh-fuel').value = '';
    document.getElementById('new-veh-desc').value = '';
    showAddVehicleForm();
    
    renderAdminVehicles();
    showToast("Vehicle Added!");
}

function renderAdminVehicles() {
    const list = document.getElementById('admin-veh-list');
    list.innerHTML = '';

    vehicles.forEach(veh => {
        const div = document.createElement('div');
        div.className = 'admin-pkg-card';
        div.innerHTML = `
            <div class="admin-pkg-img" style="background-image: url('${veh.image}')"></div>
            <div class="admin-pkg-info">
                <div class="admin-pkg-title">${veh.name}</div>
                <div class="admin-pkg-price">₹${veh.price}/day</div>
            </div>
            <button class="btn-delete-sm" onclick="deleteVehicle(${veh.id})"><i class="ri-delete-bin-line"></i></button>
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
        const veh = vehicles.find(v => v.id === b.vehicleId);
        const div = document.createElement('div');
        div.className = 'booking-card';
        div.innerHTML = `
            <div class="bc-header">
                <span>Ref: #${b.id}</span>
                <span class="bc-status">${b.status}</span>
            </div>
            <div class="bc-date">User: ${b.userId}</div>
            <div class="bc-date">Vehicle: ${veh?.name}</div>
            <div class="bc-date">From: ${b.startDate} | To: ${b.endDate}</div>
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

function deleteVehicle(id) {
    if(confirm("Are you sure you want to delete this vehicle?")) {
        vehicles = vehicles.filter(v => v.id !== id);
        renderAdminVehicles();
        showToast("Vehicle deleted");
    }
}
