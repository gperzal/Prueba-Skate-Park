// modules/auth.js
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

    const welcomeMessage = document.getElementById('welcome-message');

   

    if (authToken) {
        loginLink.style.display = 'none';  // Ocultar enlace de login
        logoutLink.style.display = 'block';  // Mostrar enlace de logout
        registerLink.style.display = 'none';
        welcomeMessage.innerHTML = `Bienvenido, ${userName}`;

        if (userRole === 'admin') {
            adminLink.style.display = 'block';  // Mostrar enlace de administrador si el usuario es admin
        }
    } else {
        logoutLink.style.display = 'none';
        adminLink.style.display = 'none';
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
            // Almacenar el token y otros datos del usuario
            sessionStorage.setItem('authToken', data.token);
            sessionStorage.setItem('userName', data.userName);
            sessionStorage.setItem('userRole', data.userRole);
            window.location.href = 'http://localhost:3000/api/skaters';
        })
        .catch(error => {
            console.error('Login failed:', error);
            // Mostrar mensaje de error
        });
}


