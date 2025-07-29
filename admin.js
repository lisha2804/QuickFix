let bookings = [];
const container = document.getElementById("bookingCards");
const serviceFilter = document.getElementById("filterService");
const statusFilter = document.getElementById("filterStatus");

// Load
window.onload = function () {
  const stored = localStorage.getItem("bookings");
  bookings = stored ? JSON.parse(stored) : [];
  bookings.forEach(b => {
    if (!b.status) b.status = "pending";
  });
  saveAndRefresh(); 
};


// Render filters
function renderFilters() {
  const services = [...new Set(bookings.map(b => b.service))];
  serviceFilter.innerHTML = `<option value="">Filter by Service Type</option>`;
  services.forEach(service => {
    serviceFilter.innerHTML += `<option value="${service}">${service}</option>`;
  });
}


// Render bookings
function renderBookings() {
  container.innerHTML = "";

  const filtered = bookings.filter(booking => {
    const serviceMatch =
      !serviceFilter.value || booking.service === serviceFilter.value;
    const statusMatch =
      !statusFilter.value || booking.status === statusFilter.value;
    return serviceMatch && statusMatch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div class="no-bookings">No bookings yet. Sit back and relax!</div>`;
    return;
  }

  filtered.forEach((booking, index) => {
    const card = document.createElement("div");
    card.className = "col-12 col-md-6 col-lg-4";
    card.innerHTML = `
      <div class="booking-card">
        <h5>${booking.service}</h5>
        <p><strong>Name:</strong> ${booking.name}</p>
        <p><strong>Mobile:</strong> ${booking.mobile}</p>
        <p><strong>Address:</strong> ${booking.address}</p>
        <p><strong>Issue:</strong> ${booking.description || "-"}</p>
        <p><strong>Date & Time:</strong> ${new Date(booking.datetime).toLocaleString("en-IN")}</p>
        <p>
          <strong>Status:</strong> 
          <span class="badge bg-${booking.status === "pending" ? "warning text-dark" : "success"} status-badge">
            ${booking.status}
          </span>
        </p>
        <div class="mt-2">
          ${
            booking.status === "pending"
              ? `<button class="btn btn-sm btn-success" onclick="markCompleted(${index})">Mark as Completed</button>`
              : `<button class="btn btn-sm btn-danger" onclick="deleteBooking(${index})">Delete</button>`
          }
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Completed
function markCompleted(index) {
  bookings[index].status = "completed";
  saveAndRefresh();
}

// To delete
function deleteBooking(index) {
  bookings.splice(index, 1);
  saveAndRefresh();
}

// Save
function saveAndRefresh() {
  localStorage.setItem("bookings", JSON.stringify(bookings));
  renderFilters();
  renderBookings();
}

// Filter handling
serviceFilter.addEventListener("change", renderBookings);
statusFilter.addEventListener("change", renderBookings);

