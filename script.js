document.addEventListener("DOMContentLoaded", function () {
  const bookingForm = document.getElementById("bookingForm");
  const confirmationMsg = document.getElementById("confirmationMsg");

  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault(); 

    // input values
    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const service = document.getElementById("service").value;
    const description = document.getElementById("description").value.trim();
    const datetime = document.getElementById("datetime").value;
    const address = document.getElementById("address").value.trim();

    // Validation
    if (!name || !mobile || !service || !datetime || !address) {
      alert("Please fill in all required fields.");
      return;
    }

    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    // Data 
    const bookingData = {
      name,
      mobile,
      service,
      description,
      datetime,
      address,
      status: "pending"
    };


    // localStorage 
    let allBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    allBookings.push(bookingData);
    localStorage.setItem("bookings", JSON.stringify(allBookings));

    // Confirmation message
    confirmationMsg.style.display = "block";

    // Clear form after 2 seconds
    setTimeout(() => {
      bookingForm.reset();
      confirmationMsg.style.display = "none";
    }, 2000);
  });
});
