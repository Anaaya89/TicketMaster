const container = document.querySelector(".container4");
const seats = document.querySelectorAll(".row .seat:not(.sold)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("asiento");
const cantBoletoInput = document.getElementById("cantBoleto");
const totalPriceDisplay = document.getElementById("totalPriceDisplay"); // Obtener el elemento para mostrar el precio total

let ticketPrice = +movieSelect.value;
let totalPrice = 0; // Variable para almacenar el precio total

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  totalPrice = selectedSeatsCount * ticketPrice; // Calcula el precio total multiplicando la cantidad de asientos seleccionados por el precio del boleto
  total.innerText = totalPrice;

  setMovieData(movieSelect.selectedIndex, movieSelect.value);
  cantBoletoInput.value = selectedSeatsCount; // Actualiza el valor del input de cantidad de boletos con la cantidad de asientos seleccionados
  
  // Actualiza el valor del input de costo total con el precio total
  document.getElementById("Costototal").value = totalPrice;

  // Actualizar el contenido del elemento HTML para mostrar el precio total
  totalPriceDisplay.innerText = totalPrice;
}

// Function to limit the maximum number of selectable seats
function limitarAsientos() {
    const selectedSeatsCount = document.querySelectorAll('.row .seat.selected').length;
    seats.forEach(seat => {
        if (selectedSeatsCount >= 10 && !seat.classList.contains('selected')) {
            seat.disabled = true;
        } else {
            seat.disabled = false;
        }
    });
}

// Call the function to limit the maximum number of seats when the page loads
limitarAsientos();

// Seat click event
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("seat") && !e.target.classList.contains("sold")) {
    e.target.classList.toggle("selected");
    limitarAsientos(); // Limitar nuevamente el número máximo de asientos después de cada clic
    updateSelectedCount();
  }
});

// Movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value; // Actualiza el precio del boleto
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Initial count and total set
updateSelectedCount();
