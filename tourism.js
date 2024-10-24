function filtertourism() {
    // Get filter values
    var tourismTypeFilter = document.getElementById("tourism-type-filter").value;
    var priceRangeFilter = document.getElementById("price-range-filter").value;
    var searchQuery = document.getElementById("search").value.toLowerCase();
     
    // Get all tourism cards 
    var tourismCards = document.getElementsByClassName("tourism-card"); 
    
    // Loop through all tourism cards and show/hide them based on filters
    for (var i = 0; i < tourismCards.length; i++) {
        var card = tourismCards[i];
        var tourismType = card.getAttribute("data-type").toLowerCase();
        var priceText = card.querySelector("p").textContent.replace(/[^\d]/g, ""); // Extract price as number
        var price = parseInt(priceText);
        var title = card.querySelector("h3, h4").textContent.toLowerCase();
        
        // Check if tourism matches the selected filters and search query
        var matchesType = (tourismTypeFilter === "all" || tourismType === tourismTypeFilter.toLowerCase());
        var matchesPrice = checkPriceRange(price, priceRangeFilter);
        var matchesSearch = title.includes(searchQuery);
        
        if (matchesType && matchesPrice && matchesSearch) {
            card.style.display = "block"; // Show card
        } else {
            card.style.display = "none"; // Hide card
        }
    }
}

function checkPriceRange(price, range) {
    if (range === "low") {
        return price <= 300;
    } else if (range === "mid") {
        return price > 300 && price <= 600;
    } else if (range === "high") {
        return price > 600;
    } else {
        return true; // Show all if "All" is selected
    }
}

// Event listeners for filters
document.getElementById("tourism-type-filter").addEventListener("change", filtertourism);
document.getElementById("price-range-filter").addEventListener("change", filtertourism);
document.getElementById("search").addEventListener("input", filtertourism);

// Function to open the About modal
function openAboutModal() {
    document.getElementById("about-modal").style.display = "block";
}

// Function to close the About modal
function closeAboutModal() {
    document.getElementById("about-modal").style.display = "none";
}

// Function to open the Contact modal
function openContactModal() {
    document.getElementById("contact-modal").style.display = "block";
}

// Function to close the Contact modal
function closeContactModal() {
    document.getElementById("contact-modal").style.display = "none";
}

// Function to open the Sign In modal
function openSignInModal() {
    document.getElementById("signin-modal").style.display = "block";
}

// Function to close the Sign In modal
function closeSignInModal() {
    document.getElementById("signin-modal").style.display = "none";
}

// Close modal when the user clicks outside of the modal content
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none"; // Close modal
    }
}

// Function to open the Booking modal
function openBookingModal(tourismName) {
    document.getElementById("booking-modal").style.display = "block";
    // Optionally set the name in the modal if needed
    // document.getElementById("booking-modal-title").textContent = tourismName;
}

// Function to close the Booking modal
function closeBookingModal() {
    document.getElementById("booking-modal").style.display = "none";
}

// Function to close the Confirmation modal
function closeConfirmationModal() {
    document.getElementById("confirmation-modal").style.display = "none";
}

function submitBooking(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const travelDate = document.getElementById("travel-date").value;
    const email = document.getElementById("email").value;
    const totalTravelers = document.getElementById("total-travelers").value;

    // Create the booking data object
    const bookingData = {
        name,
        age,
        gender,
        travelDate,
        email,
        totalTravelers,
    };

    // Send data to the server
    fetch('http://localhost:5000/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message); // Show success message
        }
        // Populate the confirmation details and show the modal
        document.getElementById("confirmation-details").innerHTML = `
            <strong>Booking Confirmation</strong><br>
            Name: ${name}<br>
            Age: ${age}<br>
            Gender: ${gender}<br>
            Travel Date: ${travelDate}<br>
            Email ID: ${email}<br>
            Total Travelers: ${totalTravelers}
        `;
        document.getElementById("confirmation-modal").style.display = "block";

        // Close the booking modal
        closeBookingModal();
    })
    .catch(error => console.error('Error:', error));
}
