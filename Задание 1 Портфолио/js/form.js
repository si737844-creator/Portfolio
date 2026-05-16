// Ждём полной загрузки страницы
document.addEventListener('DOMContentLoaded', function () {

  // Находим форму
  const contactForm = document.querySelector('.form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Отменяем стандартную отправку

      // Получаем значения полей
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      const submitBtn = document.querySelector('.form__button');

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();

      // Валидация имени
      if (name === '') {
        showNotification('Пожалуйста, введите ваше имя', 'error');
        nameInput.style.border = '2px solid #ef4444';
        nameInput.focus();
        return;
      }

      // Валидация email
      if (email === '') {
        showNotification('Пожалуйста, введите ваш email', 'error');
        emailInput.style.border = '2px solid #ef4444';
        emailInput.focus();
        return;
      }

      // Проверка формата email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showNotification('Пожалуйста, введите корректный email (например: name@mail.ru)', 'error');
        emailInput.style.border = '2px solid #ef4444';
        emailInput.focus();
        return;
      }

      // Валидация сообщения
      if (message === '') {
        showNotification('Пожалуйста, напишите ваше сообщение', 'error');
        messageInput.style.border = '2px solid #ef4444';
        messageInput.focus();
        return;
      }

      // Убираем красную рамку, если всё заполнено
      nameInput.style.border = '';
      emailInput.style.border = '';
      messageInput.style.border = '';

      // Сохраняем оригинальный текст кнопки
      const originalBtnText = submitBtn.textContent;

      // Блокируем кнопку и показываем загрузку
      submitBtn.textContent = '⏳ Отправка...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.6';

      // Имитируем отправку на сервер (задержка 2 секунды)
      setTimeout(function () {
        // Очищаем форму
        contactForm.reset();

        // Восстанавливаем кнопку
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';

        // Показываем успешное уведомление
        showNotification(`Спасибо, ${name}! Ваше сообщение успешно отправлено. Я свяжусь с вами в ближайшее время.`, 'success');
      }, 2000);
    });
  }

  // Функция показа уведомления
  function showNotification(message, type) {
    // Удаляем старое уведомление, если оно есть
    const oldNotification = document.querySelector('.notification');
    if (oldNotification) {
      oldNotification.remove();
    }

    // Создаём элемент уведомления
    const notification = document.createElement('div');
    notification.className = 'notification';

    // Выбираем иконку и цвет в зависимости от типа
    let icon = '';
    let bgColor = '';

    if (type === 'success') {
      icon = '✅';
      bgColor = '#22c55e';
    } else if (type === 'error') {
      icon = '❌';
      bgColor = '#ef4444';
    } else {
      icon = 'ℹ️';
      bgColor = '#3B82F6';
    }

    notification.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px;">
          <span style="font-size: 1.5rem;">${icon}</span>
          <span style="flex: 1; font-size: 0.95rem; line-height: 1.4; color: #1f2937;">${message}</span>
          <button class="notification-close" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #9ca3af; padding: 0; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; border-radius: 50%;">×</button>
        </div>
      `;

    // Стили для уведомления
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        max-width: 450px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        padding: 15px;
        animation: slideIn 0.3s ease;
        border-left: 4px solid ${bgColor};
      `;

    document.body.appendChild(notification);

    // Добавляем обработчик для кнопки закрытия
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function () {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(function () {
        notification.remove();
      }, 300);
    });

    // Автоматическое закрытие через 5 секунд
    setTimeout(function () {
      if (notification.parentElement) {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(function () {
          notification.remove();
        }, 300);
      }
    }, 5000);
  }

  // Убираем красную рамку при вводе
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  if (nameInput) {
    nameInput.addEventListener('input', function () {
      this.style.border = '';
    });
  }

  if (emailInput) {
    emailInput.addEventListener('input', function () {
      this.style.border = '';
    });
  }

  if (messageInput) {
    messageInput.addEventListener('input', function () {
      this.style.border = '';
    });
  }
});