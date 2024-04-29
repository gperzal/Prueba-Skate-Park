export function skaterFunctions() {


    const profileForm = document.getElementById('profileForm');
    const deleteProfile = document.getElementById('deleteProfile');


    if (profileForm) {


        const userData = JSON.parse(sessionStorage.getItem('userData'));
        const userID = userData.id;


        //Si existe profileForm, se ejecuta el evento submit

        const emailElement = document.getElementById('email');
        const nombreElement = document.getElementById('nombre');
        const passwordElement = document.getElementById('password');
        const especialidadElement = document.getElementById('especialidad');
        const anosExperienciaElement = document.getElementById('anos_experiencia');
        const currentPhoto = document.getElementById('currentPhoto');
        const fotoInput = document.getElementById('foto');
        // Obtén las referencias a los elementos, no sus valores


        fetch(`/api/skaters/${userID}`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch skater details');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (data) {
                    emailElement.value = data.email;
                    nombreElement.value = data.nombre;
                    especialidadElement.value = data.especialidad;
                    anosExperienciaElement.value = data.anos_experiencia;
                    currentPhoto.src = data.foto;
                }
            })
            .catch(error => console.error('Error loading skater data:', error));



        profileForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const formData = new FormData(profileForm);
            if (fotoInput.files.length === 0) {
                formData.delete('foto'); // Eliminar el campo de foto si no hay un archivo nuevo
            }

            // No necesitas eliminar el campo de contraseña si está vacío, simplemente no lo actualices en el servidor si no se proporciona

            // Asegúrate de que el token de autenticación esté disponible
            const authToken = sessionStorage.getItem('authToken');
            if (!authToken) {
                console.error('Auth token not found in sessionStorage');
                return;
            }

            fetch(`/api/skaters/${userID}`, {
                method: 'PUT',
                headers: {
                    // Cuando envías FormData, no establezcas el 'Content-Type', el navegador lo hará automáticamente
                    'Authorization': `Bearer ${authToken}`
                },
                body: formData
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error actualizando el perfil');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Perfil actualizado con éxito:', data);     
                    window.location.href = '/';
                  
                })
                .catch(error => {
                    console.error('Error al actualizar el perfil:', error);
                    // Aquí deberías mostrar un mensaje de error al usuario
                });
        });

        deleteProfile.addEventListener('click', () => {
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            const userID = userData.id;
            const authToken = sessionStorage.getItem('authToken');
            if (!authToken) {
                console.error('Auth token not found in sessionStorage');
                return;
            }
            fetch(`/api/skaters/${userID}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al eliminar el perfil');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Perfil eliminado:', data);
                    sessionStorage.clear();
                    window.location.href = '/';
                
                })
                .catch(error => {
                    console.error('Error al eliminar el perfil:', error);
                  
                })
        })



    }




}
