document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('password-form');
    const passwordInput = document.getElementById('password');
    const messageContainer = document.getElementById('message-container');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();  // Evita que se recargue la página

        const password = passwordInput.value.trim(); // Eliminamos espacios en blanco antes y después
        
        // Realizar una solicitud POST al servidor con la clave
        fetch('/check-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: password })  // Enviar la clave como JSON
        })
        .then(response => {
            if (response.ok) {
                // Si la clave es correcta, redirigir al video
                window.location.href = '/video';
            } else {
                // Si la clave es incorrecta, mostrar mensaje de error
                messageContainer.textContent = 'La clave ingresada es incorrecta. Inténtalo nuevamente.';
                messageContainer.style.color = 'red';
            }
        })
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            messageContainer.textContent = 'Hubo un problema con la solicitud. Inténtalo más tarde.';
            messageContainer.style.color = 'red';
        });
    });
});
