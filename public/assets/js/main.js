// main.js
import { initAdminPanel } from './modules/admin.js';
import { setupAuth } from './modules/auth.js';
import { skaterFunctions } from './modules/skatersProfile.js';

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar funcionalidades específicas de cada módulo según la página
  setupAuth();
  initAdminPanel();
  skaterFunctions();




  
  const logoutButton = document.getElementById('logout-link');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      // Aquí tu lógica para cerrar sesión
      sessionStorage.clear();
      window.location.href = '/';
    });
  }


});


