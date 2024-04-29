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
      clearAllCookies();
      window.location.href = '/';
    });
  }


});



function clearAllCookies() {
  const cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  }
}
