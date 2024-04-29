
export function setupAuth() {
    // En auth.js


    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }


    //Validar Roles

    const userName = sessionStorage.getItem('userName');
    const userRole = sessionStorage.getItem('userRole');
    const authToken = sessionStorage.getItem('authToken');

    const loginLink = document.getElementById('login-link');
    const logoutLink = document.getElementById('logout-link');
    const adminLink = document.getElementById('admin-link');
    const registerLink = document.getElementById('register-link');
    const profileLink = document.getElementById('profile-link');
    const welcomeMessage = document.getElementById('welcome-message');



    //profile
    profileLink.addEventListener('click', () => {
        getUserProfile(authToken);
    })

    //admin
    adminLink.addEventListener('click', (e) => {
        e.preventDefault();
        handleAdminAccess(authToken, userRole);
    });

    if (authToken) {
        loginLink.style.display = 'none';  // Ocultar enlace de login
        logoutLink.style.display = 'block';  // Mostrar enlace de logout
        profileLink.style.display = 'block';    // Mostrar enlace de perfil
        registerLink.style.display = 'none';
        welcomeMessage.display = 'block';
        welcomeMessage.innerHTML = `Bienvenido, ${userName}`;

        if (userRole === 'admin') {
            adminLink.style.display = 'block';  // Mostrar enlace de administrador si el usuario es admin
            profileLink.style.display = 'block';
        }
    } else {
        logoutLink.style.display = 'none';
        adminLink.style.display = 'none';

    }





}

function handleAdminAccess(token, role) {

    if (role === 'admin') {
        window.location.href = `/admin/dashboard/`;


    } else {

        alert('Acceso denegado. Solo los administradores pueden entrar aquí.');
        window.location.href = '/'; // Redirige a la página de inicio
    }


}




function handleLoginSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch('/api/skaters/login', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la autenticación');
            }
            return response.json();
        })
        .then(data => {
            console.log("Login successful:", data);
            // Almacenar el token y otros datos del usuario
            sessionStorage.setItem('authToken', data.token);
            sessionStorage.setItem('userName', data.userName);
            sessionStorage.setItem('userRole', data.userRole);
            window.location.href = '/';
        })
        .catch(error => {
            console.error('Login failed:', error);

        });
}




// Función para obtener el perfil del usuario
function getUserProfile(authToken) {
    showLoader();
    fetch('/profiles', {

        headers: {
            method: 'GET',
            'Authorization': `Bearer ${(authToken)}`
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener la información del perfil');
            }
            return response.json();
        })
        .then(data => {
            sessionStorage.setItem('userData', JSON.stringify(data));
            window.location.href = '/profile';

        })
        .catch(error => {
            console.error('Error al obtener el perfil:', error);
        }).finally(() => {
            hideLoader();
        });
}




function showLoader() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'block';
    }
}

function hideLoader() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
}