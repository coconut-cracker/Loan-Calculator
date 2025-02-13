// Listen for submit
document.getElementById("loan-form").addEventListener("submit", function(e) {
  e.preventDefault();

  // Hide results
  document.getElementById("results").style.display = "none";

  // Show loader
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 2000);
});

// Calculate function
function calculateResults() {
  console.log("calculating..");

  // UI Variables

  const UIamount = document.getElementById("amount");
  const UIinterest = document.getElementById("interest");
  const UIyears = document.getElementById("years");
  const UImonthlyPayment = document.getElementById("monthly-payment");
  const UItotalInterest = document.getElementById("total-interest");
  const UItotalPayment = document.getElementById("total-payment");

  const principal = parseFloat(UIamount.value);
  const calculatedInterest = parseFloat(UIinterest.value) / 100 / 12;
  const calculatedPayments = parseFloat(UIyears.value) * 12;

  // Compute monthly payments

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    UImonthlyPayment.value = monthly.toFixed(2);
    UItotalPayment.value = (monthly * calculatedPayments).toFixed(2);
    UItotalInterest.value = (monthly * calculatedPayments - principal).toFixed(
      2
    );
    // Show Results
    document.getElementById("results").style.display = "block";
    // Hide Spinner
    document.getElementById("loading").style.display = "none";
  } else {
    // console.log("Please Check...");
    showError("Jestes jablko?");
  }
}

// Show Error
function showError(error) {
  // Hide results
  document.getElementById("results").style.display = "none";

  // Hide loader
  document.getElementById("loading").style.display = "none";

  // Create div
  const errorDiv = document.createElement("div");

  // Get elements

  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  errorDiv.className = "alert alert-danger";

  errorDiv.appendChild(document.createTextNode(error));

  // Insert Error above heading -- between Headign and Card
  card.insertBefore(errorDiv, heading);

  // Clear error after 3s
  setTimeout(clearError, 3000);
}

// Clear Error
function clearError() {
  document.querySelector(".alert").remove();
}
