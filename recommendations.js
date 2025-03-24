// Функции для страницы рекомендаций

document.addEventListener('DOMContentLoaded', function() {
    // Загрузка рекомендаций
    loadRecommendations();
    
    // Инициализация фильтрации по типам вычетов
    initDeductionFilters();
    
    // Инициализация кнопок действий
    initActionButtons();
});

// Загрузка рекомендаций
function loadRecommendations() {
    // Показываем индикатор загрузки
    const deductionsList = document.getElementById('deductions-list');
    deductionsList.innerHTML = '<div class="loading">Загрузка рекомендаций...</div>';
    
    // В реальном приложении здесь будет запрос к API
    setTimeout(() => {
        // Моковые данные для демонстрации
        const mockRecommendations = [
            {
                type: 'social',
                title: 'Социальный вычет на образование',
                amount: 15000,
                description: 'Вы можете вернуть 13% от расходов на образование (свое или детей). Максимальная сумма расходов для вычета - 120,000 руб. в год.',
                documents: [
                    'Договор с образовательным учреждением',
                    'Лицензия образовательного учреждения',
                    'Платежные документы'
                ]
            },
            {
                type: 'social',
                title: 'Социальный вычет на лечение',
                amount: 10000,
                description: 'Вы можете вернуть 13% от расходов на медицинские услуги и лекарства. Максимальная сумма расходов для вычета - 120,000 руб. в год.',
                documents: [
                    'Договор с медицинским учреждением',
                    'Лицензия медицинского учреждения',
                    'Платежные документы',
                    'Рецепты на лекарства (если применимо)'
                ]
            },
            {
                type: 'property',
                title: 'Имущественный вычет при покупке жилья',
                amount: 260000,
                description: 'Вы можете вернуть 13% от расходов на покупку жилья (максимум 2,000,000 руб. расходов). Если у вас была ипотека, можно дополнительно получить вычет с уплаченных процентов.',
                documents: [
                    'Договор купли-продажи',
                    'Акт приема-передачи',
                    'Платежные документы',
                    'Договор ипотеки (если применимо)',
                    'Справка об уплаченных процентах (если применимо)'
                ]
            },
            {
                type: 'standard',
                title: 'Стандартный вычет на ребенка',
                amount: 1400,
                description: 'Вы можете получать ежемесячный вычет на каждого ребенка. Размер вычета зависит от количества детей и их возраста.',
                documents: [
                    'Свидетельство о рождении ребенка',
                    'Справка об обучении (если ребенок старше 18 лет)'
                ]
            },
            {
                type: 'investment',
                title: 'Инвестиционный вычет',
                amount: 52000,
                description: 'Вы можете получить вычет с доходов от инвестиций или с суммы внесенных на ИИС средств.',
                documents: [
                    'Договор с брокером',
                    'Выписки по счету',
                    'Документы, подтверждающие внесение средств на ИИС'
                ]
            }
        ];
        
        // Обновляем общие суммы
        updateSummary(mockRecommendations);
        
        // Отображаем рекомендации
        displayRecommendations(mockRecommendations);
    }, 1500);
}

// Обновление сводной информации
function updateSummary(recommendations) {
    const totalDeductions = recommendations.reduce((sum, item) => sum + item.amount, 0);
    const totalReturn = Math.floor(totalDeductions * 0.13); // 13% от суммы вычетов
    
    document.getElementById('total-deductions').textContent = `${totalDeductions.toLocaleString()} руб.`;
    document.getElementById('total-return').textContent = `${totalReturn.toLocaleString()} руб.`;
    document.getElementById('recommendations-status').textContent = 'Анализ завершен';
}

// Отображение рекомендаций
function displayRecommendations(recommendations) {
    const deductionsList = document.getElementById('deductions-list');
    deductionsList.innerHTML = '';
    
    if (recommendations.length === 0) {
        deductionsList.innerHTML = '<div class="no-results">Нет доступных налоговых вычетов на основе предоставленных данных.</div>';
        return;
    }
    
    recommendations.forEach(item => {
        const deductionCard = document.createElement('div');
        deductionCard.className = `deduction-card ${item.type}`;
        deductionCard.innerHTML = `
            <div class="deduction-header">
                <h3>${item.title}</h3>
                <span class="deduction-amount">+${item.amount.toLocaleString()} руб.</span>
            </div>
            <div class="deduction-details">
                <p>${item.description}</p>
                <div class="deduction-documents">
                    <h4>Необходимые документы:</h4>
                    <ul>
                        ${item.documents.map(doc => `<li>${doc}</li>`).join('')}
                    </ul>
                </div>
            </div>
            <div class="deduction-actions">
                <button class="details-btn">Подробнее</button>
                <button class="include-btn">Включить в декларацию</button>
            </div>
        `;
        
        deductionsList.appendChild(deductionCard);
        
        // Добавляем обработчики для кнопок
        const detailsBtn = deductionCard.querySelector('.details-btn');
        detailsBtn.addEventListener('click', () => showDeductionDetails(item));
        
        const includeBtn = deductionCard.querySelector('.include-btn');
        includeBtn.addEventListener('click', () => includeDeductionInDeclaration(item));
    });
}

// Показ деталей вычета
function showDeductionDetails(deduction) {
    // В реальном приложении можно открыть модальное окно с дополнительной информацией
    alert(`Подробная информация о вычете "${deduction.title}"\n\n${deduction.description}`);
}

// Включение вычета в декларацию
function includeDeductionInDeclaration(deduction) {
    // В реальном приложении здесь будет сохранение выбора пользователя
    showNotification('success', `Вычет "${deduction.title}" включен в декларацию`);
    
    // Обновляем кнопку
    const buttons = document.querySelectorAll(`.deduction-card:contains("${deduction.title}") .include-btn`);
    buttons.forEach(button => {
        button.textContent = 'Добавлено в декларацию';
        button.disabled = true;
    });
}

// Инициализация фильтрации по типам вычетов
function initDeductionFilters() {
    const deductionTypes = document.querySelectorAll('.deduction-type');
    
    deductionTypes.forEach(type => {
        type.addEventListener('click', function() {
            // Обновляем активный тип
            deductionTypes.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Фильтруем рекомендации
            filterRecommendations(this.getAttribute('data-type'));
        });
    });
}

// Фильтрация рекомендаций по типу
function filterRecommendations(type) {
    const allCards = document.querySelectorAll('.deduction-card');
    
    if (type === 'all') {
        allCards.forEach(card => card.style.display = 'block');
    } else {
        allCards.forEach(card => {
            card.style.display = card.classList.contains(type) ? 'block' : 'none';
        });
    }
}

// Инициализация кнопок действий
function initActionButtons() {
    // Кнопка "Сформировать все документы"
    const generateAllBtn = document.getElementById('generate-all-docs-btn');
    if (generateAllBtn) {
        generateAllBtn.addEventListener('click', generateAllDocuments);
    }
    
    // Кнопка "Отправить через Госуслуги"
    const submitGosuslugiBtn = document.getElementById('submit-gosuslugi-btn');
    if (submitGosuslugiBtn) {
        submitGosuslugiBtn.addEventListener('click', submitViaGosuslugi);
    }
    
    // Кнопка "Сохранить для последующей подачи"
    const saveForLaterBtn = document.getElementById('save-for-later-btn');
    if (saveForLaterBtn) {
        saveForLaterBtn.addEventListener('click', saveForLater);
    }
}

// Формирование всех документов
function generateAllDocuments() {
    // В реальном приложении здесь будет запрос к API для формирования документов
    showNotification('info', 'Начато формирование документов...');
    
    setTimeout(() => {
        showNotification('success', 'Все документы успешно сформированы и готовы к скачиванию');
        
        // В реальном приложении здесь будет предложение скачать документы
        const downloadLink = document.createElement('a');
        downloadLink.href = '#';
        downloadLink.textContent = 'Скачать все документы';
        downloadLink.className = 'download-link';
        downloadLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('В реальном приложении здесь будет скачивание ZIP-архива с документами');
        });
        
        const notifications = document.getElementById('notifications-list');
        if (notifications) {
            const lastNotification = notifications.firstElementChild;
            if (lastNotification) {
                lastNotification.appendChild(document.createElement('br'));
                lastNotification.appendChild(downloadLink);
            }
        }
    }, 2000);
}

// Отправка через Госуслуги
function submitViaGosuslugi() {
    // Проверяем, подключены ли Госуслуги
    const isGosuslugiConnected = localStorage.getItem('gosuslugiConnected') === 'true';
    
    if (!isGosuslugiConnected) {
        if (confirm('Для отправки документов необходимо подключить аккаунт Госуслуг. Хотите подключить сейчас?')) {
            connectGosuslugi();
        }
        return;
    }
    
    // В реальном приложении здесь будет отправка документов через API Госуслуг
    showNotification('info', 'Отправка документов через Госуслуги...');
    
    setTimeout(() => {
        showNotification('success', 'Документы успешно отправлены в ФНС через Госуслуги');
        
        // Обновляем timeline
        document.querySelectorAll('.timeline-step').forEach((step, index) => {
            if (index < 3) {
                step.classList.add('active');
            }
        });
    }, 2500);
}

// Подключение Госуслуг
function connectGosuslugi() {
    // В реальном приложении здесь будет OAuth-авторизация через Госуслуги
    showNotification('info', 'Перенаправление на страницу авторизации Госуслуг...');
    
    // Имитация успешного подключения через 2 секунды
    setTimeout(() => {
        localStorage.setItem('gosuslugiConnected', 'true');
        showNotification('success', 'Аккаунт Госуслуг успешно подключен');
    }, 2000);
}

// Сохранение для последующей подачи
function saveForLater() {
    // В реальном приложении здесь будет сохранение данных на сервере
    showNotification('success', 'Все данные сохранены. Вы можете вернуться к подаче документов позже.');
}