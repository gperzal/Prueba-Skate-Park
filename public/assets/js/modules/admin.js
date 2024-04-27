// modules/admin.js
export function initAdminPanel() {



    const checkboxes = document.querySelectorAll('.form-check-input');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (event) => {

            changeStatus(checkbox.getAttribute('data-skater-id'), checkbox.checked);
        });
    });




}

function changeStatus(skaterId, estado) {

    // Opción para enviar la solicitud con fetch
    fetch(`/admin/approve/${skaterId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ estado }) // Envía el estado actual del checkbox
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Problem updating skater status');
            }
            return response.json();
        })
        .then(data => {
            console.log(data.message);
            window.location.reload();
            // Aquí podrías hacer algo con la respuesta, como actualizar la interfaz de usuario
        })
        .catch(error => {
            console.error('Error:', error);
        });
}