document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.menu-icon').addEventListener('click', function() {
    const nav = document.querySelector('nav ul');
    if (nav.style.display === 'block') {
      nav.style.display = 'none';
    } else {
      nav.style.display = 'block';
    }
  });
});