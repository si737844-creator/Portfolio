'use strict';

const buttonthems = document.querySelector('#button');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-theme');
  buttonthems.textContent = '🌞';
} else {
  buttonthems.textContent = '🌛';
}

// Обработчик кнопки переключения темы
buttonthems.addEventListener('click', () => {
  body.classList.toggle('dark-theme');

  if (body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark');
    buttonthems.textContent = '🌞';
  } else {
    localStorage.setItem('theme', 'light');
    buttonthems.textContent = '🌛';
  }
});