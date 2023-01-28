if (!localStorage.getItem('token')) {
  window.location.href = '/src/login.html';
}