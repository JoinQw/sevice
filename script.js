// Основные функции для всех страниц

// Инициализация пользователя
document.addEventListener('DOMContentLoaded', function() {
    // Проверка авторизации
    checkAuthStatus();
    
    // Инициализация элементов интерфейса
    initUIElements();
});

// Проверка статуса авторизации
function checkAuthStatus() {
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('username-display').textContent = username;
    } else {
        // Если пользователь не авторизован, перенаправляем на страницу входа
        window.location.href = 'login.html';
    }
}

// Инициализация элементов UI
function initUIElements() {
    // Инициализация табов на странице ввода данных
    if (document.querySelector('.tabs')) {
        initTabs();
    }
    
    // Инициализация кнопки выхода
    document.getElementById('logout-btn').addEventListener('click', logout);
}

// Функция выхода
function logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('authToken');
    window.location.href = 'login.html';
}

// Инициализация системы табов
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Удаляем активный класс у всех кнопок и контента
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Добавляем активный класс к текущей кнопке
            button.classList.add('active');
            
            // Находим соответствующий контент и делаем его активным
            const tabId = button.getAttribute('data-tab') + '-tab';
            document.getElementById(tabId).classList.add('active'));
            
            // Обновляем состояние кнопок навигации
            updateNavButtons();
        });
    });
    
    // Инициализация кнопок навигации между табами
    const prevBtn = document.getElementById('prev-tab-btn');
    const nextBtn = document.getElementById('next-tab-btn');
    const completeBtn = document.getElementById('complete-input-btn');
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', goToPrevTab);
        nextBtn.addEventListener('click', goToNextTab);
        completeBtn.addEventListener('click', completeDataInput);
        updateNavButtons();
    }
}

// Переход к предыдущему табу
function goToPrevTab() {
    const activeTab = document.querySelector('.tab-btn.active');
    const prevTab = activeTab.previousElementSibling;
    
    if (prevTab && prevTab.classList.contains('tab-btn')) {
        prevTab.click();
    }
}

// Переход к следующему табу
function goToNextTab() {
    const activeTab = document.querySelector('.tab-btn.active');
    const nextTab = activeTab.nextElementSibling;
    
    if (nextTab && nextTab.classList.contains('tab-btn')) {
        nextTab.click();
    }
}

// Обновление состояния кнопок навигации
function updateNavButtons() {
    const activeTab = document.querySelector('.tab-btn.active');
    const prevBtn = document.getElementById('prev-tab-btn');
    const nextBtn = document.getElementById('next-tab-btn');
    const completeBtn = document.getElementById('complete-input-btn');
    
    // Проверяем, есть ли предыдущий таб
    prevBtn.disabled = !activeTab.previousElementSibling || 
                       !activeTab.previousElementSibling.classList.contains('tab-btn');
    
    // Проверяем, есть ли следующий таб
    nextBtn.disabled = !activeTab.nextElementSibling || 
                      !activeTab.nextElementSibling.classList.contains('tab-btn');
    
    // Показываем кнопку завершения только на последнем табе
    if (nextBtn.disabled) {
        completeBtn.classList.remove('hidden');
        nextBtn.classList.add('hidden');
    } else {
        completeBtn.classList.add('hidden');
        nextBtn.classList.remove('hidden');
    }
}

// Завершение ввода данных
function completeDataInput() {
    // Здесь можно добавить валидацию данных перед завершением
    alert('Данные успешно сохранены. Переходим к анализу.');
    window.location.href = 'analysis.html';
}

// Функция для отображения уведомлений
function showNotification(type, message) {
    const notificationsList = document.getElementById('notifications-list');
    if (notificationsList) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span class="notification-icon">${type === 'success' ? '✓' : '!'}</span>
            <span class="notification-message">${message}</span>
        `;
        notificationsList.prepend(notification);
        
        // Автоматическое скрытие уведомления через 5 секунд
        setTimeout(() => {
            notification.remove();
        }, 5000);
    } else {
        // Если контейнера для уведомлений нет, используем стандартный alert
        alert(message);
    }
}

// Инициализация загрузки документов
function initDocumentUpload() {
    const uploadButtons = document.querySelectorAll('.upload-btn');
    
    uploadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = '.pdf,.jpg,.jpeg,.png,.csv,.xlsx,.doc,.docx';
            
            fileInput.onchange = function(e) {
                const file = e.target.files[0];
                if (file) {
                    // Здесь можно добавить логику загрузки файла на сервер
                    const statusElement = this.parentElement.nextElementSibling;
                    statusElement.textContent = file.name;
                    statusElement.classList.add('uploaded');
                    
                    showNotification('success', `Файл "${file.name}" успешно загружен`);
                }
            };
            
            fileInput.click();
        });
    });
}

// Инициализация при загрузке страницы
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUIElements);
} else {
    initUIElements();
}