// Функции для работы с аутентификацией

// Проверка статуса аутентификации
function checkAuthStatus() {
    const authToken = localStorage.getItem('authToken');
    const username = localStorage.getItem('username');
    
    if (!authToken || !username) {
        // Если нет токена или имени пользователя, перенаправляем на страницу входа
        window.location.href = 'login.html';
    } else {
        // Обновляем отображение имени пользователя
        const usernameElements = document.querySelectorAll('#username-display');
        usernameElements.forEach(element => {
            element.textContent = username;
        });
        
        // Проверяем валидность токена на сервере
        validateAuthToken(authToken);
    }
}

// Валидация токена на сервере
function validateAuthToken(token) {
    // Здесь должна быть реализация проверки токена через API
    // Для примера используем setTimeout для имитации запроса
    setTimeout(() => {
        // В реальном приложении здесь будет проверка ответа сервера
        const isValid = true; // Предположим, что токен валиден
        
        if (!isValid) {
            // Если токен невалиден, очищаем хранилище и перенаправляем на вход
            localStorage.removeItem('authToken');
            localStorage.removeItem('username');
            window.location.href = 'login.html';
        }
    }, 100);
}

// Выход из системы
function logout() {
    // Здесь можно добавить запрос на сервер для инвалидации токена
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    window.location.href = 'login.html';
}

// Инициализация обработчиков для кнопки выхода
document.addEventListener('DOMContentLoaded', function() {
    const logoutButtons = document.querySelectorAll('#logout-btn');
    logoutButtons.forEach(button => {
        button.addEventListener('click', logout);
    });
});