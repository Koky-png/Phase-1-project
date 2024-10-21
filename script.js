let vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
const vehicleList = document.getElementById('vehicles');
displayVehicles();

// Add a vehicle to the list
function addVehicle() {
    const vehicle = document.getElementById('vehicle').value;
    const vehicleError = document.getElementById('vehicle-error');

    if (vehicle) {
        vehicles.push(vehicle);
        localStorage.setItem('vehicles', JSON.stringify(vehicles));
        displayVehicles();
        document.getElementById('vehicle').value = ''; // Clear the input
        vehicleError.style.display = 'none';
    } else {
        vehicleError.textContent = "Please enter a vehicle.";
        vehicleError.style.display = 'block';
    }
}

// Display the list of vehicles
function displayVehicles() {
    vehicleList.innerHTML = '';
    vehicles.forEach((vehicle, index) => {
        vehicleList.innerHTML += `<li>${vehicle} <button onclick="deleteVehicle(${index})">Delete</button></li>`;
    });
}

// Delete a vehicle from the list
function deleteVehicle(index) {
    vehicles.splice(index, 1);
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
    displayVehicles();
}

// Update Profile Information
function updateProfile() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');

    let isValid = true;

    if (!name) {
        nameError.textContent = "Please enter your name.";
        nameError.style.display = 'block';
        isValid = false;
    } else {
        nameError.style.display = 'none';
    }

    if (!email) {
        emailError.textContent = "Please enter your email.";
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.style.display = 'none';
    }

    if (isValid) {
        localStorage.setItem('profile', JSON.stringify({ name, email }));
        alert(`Profile Updated! Name: ${name}, Email: ${email}`);
    }
}

// Fuel Alternatives Search with live suggestions
const fuelAlternatives = [
    { name: 'Gasoline', cost: '1.50 per gallon' },
    { name: 'Biofuel', cost: '2.00 per gallon' },
    { name: 'Hydrogen', cost: '3.50 per gallon' },
];

function liveSearch() {
    const searchInput = document.getElementById('searchFuel').value.toLowerCase();
    const suggestions = document.getElementById('searchSuggestions');
    suggestions.innerHTML = '';

    const filtered = fuelAlternatives.filter(fuel => fuel.name.toLowerCase().includes(searchInput));

    if (filtered.length > 0 && searchInput) {
        filtered.forEach(fuel => {
            const div = document.createElement('div');
            div.textContent = fuel.name;
            div.onclick = () => {
                document.getElementById('searchFuel').value = fuel.name;
                searchFuel();
                suggestions.innerHTML = ''; // Clear suggestions after selection
            };
            suggestions.appendChild(div);
        });
    }
}

// Search for fuel alternatives
function searchFuel() {
    const searchInput = document.getElementById('searchFuel').value.toLowerCase();
    const resultsList = document.getElementById('results-list');
    resultsList.innerHTML = '';

    const filtered = fuelAlternatives.filter(fuel => fuel.name.toLowerCase().includes(searchInput));

    if (filtered.length > 0) {
        filtered.forEach(fuel => {
            resultsList.innerHTML += `<li>${fuel.name} - Cost: ${fuel.cost}</li>`;
        });
    } else {
        resultsList.innerHTML = '<li>No fuel alternatives found</li>';
    }
}

// Fetch Data from API
async function fetchData() {
    try {
        const response = await fetch('https://phase-1-project-zze9.onrender.com');
        const data = await response.json();
        console.log(data); // Handle your data here
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call fetchData() if needed
fetchData();
// Initialize consumption records from localStorage
let consumptions = JSON.parse(localStorage.getItem('consumptions')) || [];

// Add a fuel consumption record
function addConsumption() {
    const mileage = document.getElementById('mileage').value;
    const liters = document.getElementById('liters').value;
    const consumptionError = document.getElementById('consumption-error');

    // Validate input
    if (!mileage || !liters) {
        consumptionError.textContent = "Please enter both mileage and liters.";
        consumptionError.style.display = 'block';
        return;
    }

    // Create a new consumption record
    const consumptionRecord = {
        mileage: parseFloat(mileage),
        liters: parseFloat(liters),
        date: new Date().toLocaleString()
    };

    // Add record to the array and save to localStorage
    consumptions.push(consumptionRecord);
    localStorage.setItem('consumptions', JSON.stringify(consumptions));
    displayConsumptions();

    // Clear input fields
    document.getElementById('mileage').value = '';
    document.getElementById('liters').value = '';
    consumptionError.style.display = 'none'; // Hide error
}

// Display the list of consumption records
function displayConsumptions() {
    const consumptionList = document.getElementById('consumptions');
    consumptionList.innerHTML = '';

    consumptions.forEach((record, index) => {
        consumptionList.innerHTML += `<li>${record.date}: ${record.mileage} KM, ${record.liters} liters</li>`;
    });
}

// Call this function to display existing records on page load
displayConsumptions();
