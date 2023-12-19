// script.js

// Function to register hours
function registrarHoras() {
    // Get form elements
    const fechaInput = document.getElementById('fecha');
    const horasInput = document.getElementById('horas');
    const resumenList = document.getElementById('resumenList');
    const totalHorasDiv = document.getElementById('totalHoras');

    // Get values from form
    const fecha = fechaInput.value;
    const horas = parseInt(horasInput.value);

    // Validate input
    if (fecha && !isNaN(horas) && horas > 0) {
        // Add the hours to the local storage
        const storedHours = JSON.parse(localStorage.getItem('hoursArray')) || [];
        storedHours.push({ fecha, horas });
        localStorage.setItem('hoursArray', JSON.stringify(storedHours));

        // Update the summary list
        const listItem = document.createElement('li');
        listItem.textContent = `${fecha}: ${horas} horas`;
        resumenList.appendChild(listItem);

        // Update total hours
        const totalHoras = storedHours.reduce((total, entry) => total + entry.horas, 0);
        totalHorasDiv.textContent = `Total horas trabajadas: ${totalHoras}`;

        // Clear the form
        fechaInput.value = '';
        horasInput.value = '';
    } else {
        alert('Por favor, ingrese una fecha válida y un número de horas mayor que 0.');
    }
}

// Ensure the DOM is fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Attach click event to the "Registrar" button
    const registrarButton = document.querySelector('button');
    registrarButton.addEventListener('click', registrarHoras);

    // Load stored hours on page load
    const storedHours = JSON.parse(localStorage.getItem('hoursArray')) || [];
    const resumenList = document.getElementById('resumenList');
    const totalHorasDiv = document.getElementById('totalHoras');

    storedHours.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.textContent = `${entry.fecha}: ${entry.horas} horas`;
        resumenList.appendChild(listItem);
    });

    const totalHoras = storedHours.reduce((total, entry) => total + entry.horas, 0);
    totalHorasDiv.textContent = `Total horas trabajadas: ${totalHoras}`;
});


// Función para eliminar todo de la lista en el localStorage
function eliminarTodo() {
    // Obtén la lista actual del localStorage
    var listaActual = JSON.parse(localStorage.getItem("hoursArray")) || [];

    // Verifica si la lista tiene elementos
    if (listaActual.length > 0) {
        // Si tiene elementos, elimina la lista del localStorage
        localStorage.removeItem("hoursArray");

        // Limpia la interfaz o realiza otras acciones necesarias
        const resumenList = document.getElementById('resumenList');
        const totalHorasDiv = document.getElementById('totalHoras');
        resumenList.innerHTML = '';
        totalHorasDiv.textContent = 'Total horas trabajadas: 0';

        alert("Todos los elementos han sido eliminados.");
    } else {
        alert("La lista ya está vacía.");
    }
}

// Asocia la función al botón mediante el evento click
document.getElementById("eliminarTodo").addEventListener("click", eliminarTodo);

