// Функции для интеграции с внешними сервисами

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация кнопок подключения
    initConnectionButtons();
});

// Инициализация кнопок подключения
function initConnectionButtons() {
    // Кнопка подключения ФНС
    const fnsBtn = document.getElementById('connect-fns-btn');
    if (fnsBtn) {
        fnsBtn.addEventListener('click', connectToFNS);
    }
    
    // Кнопка подключения Госуслуг
    const gosuslugiBtn = document.getElementById('connect-gosuslugi-btn');
    if (gosuslugiBtn) {
        gosuslugiBtn.addEventListener('click', connectToGosuslugi);
    }
    
    // Кнопка подключения банка
    const bankBtn = document.getElementById('connect-bank-btn');
    if (bankBtn) {
        bankBtn.addEventListener('click', connectToBank);
    }
    
    // Проверяем статус подключений
    checkConnectionStatuses();
}

// Проверка статусов подключений
function checkConnectionStatuses() {
    // В реальном приложении здесь будет проверка реальных статусов
    const isFNSConnected = localStorage.getItem('fnsConnected') === 'true';
    const isGosuslugiConnected = localStorage.getItem('gosuslugiConnected') === 'true';
    const isBankConnected = localStorage.getItem('bankConnected') === 'true';
    
    if (isFNSConnected) {
        updateConnectionStatus('connect-fns-btn', true);
    }
    
    if (isGosuslugiConnected) {
        updateConnectionStatus('connect-gosuslugi-btn', true);
    }
    
    if (isBankConnected) {
        updateConnectionStatus('connect-bank-btn', true);
    }
}

// Обновление статуса подключения
function updateConnectionStatus(buttonId, isConnected) {
    const button = document.getElementById(buttonId);
    if (button) {
        if (isConnected) {
            button.textContent = 'Подключено';
            button.classList.add('connected');
            button.disabled = true;
        } else {
            button.textContent = 'Подключить';
            button.classList.remove('connected');
            button.disabled = false;
        }
    }
}

// Подключение к ФНС
function connectToFNS() {
    // В реальном приложении здесь будет OAuth-авторизация через ФНС
    showNotification('info', 'Перенаправление на страницу авторизации ФНС...');
    
    // Имитация успешного подключения через 2 секунды
    setTimeout(() => {
        localStorage.setItem('fnsConnected', 'true');
        updateConnectionStatus('connect-fns-btn', true);
        showNotification('success', 'Личный кабинет ФНС успешно подключен');
        
        // Загружаем данные из ФНС
        loadFNSData();
    }, 2000);
}

// Загрузка данных из ФНС
function loadFNSData() {
    // В реальном приложении здесь будет запрос к API ФНС
    showNotification('info', 'Загрузка данных из ФНС...');
    
    setTimeout(() => {
        // Моковые данные
        const fnsData = {
            income: [
                { type: 'salary', amount: 50000, period: '2023-01' },
                { type: 'salary', amount: 52000, period: '2023-02' },
                { type: 'salary', amount: 53000, period: '2023-03' }
            ],
            taxes: [
                { type: 'ndfl', amount: 6500, period: '2023-01' },
                { type: 'ndfl', amount: 6760, period: '2023-02' },
                { type: 'ndfl', amount: 6890, period: '2023-03' }
            ]
        };
        
        // Сохраняем данные
        localStorage.setItem('fnsData', JSON.stringify(fnsData));
        
        // Обновляем интерфейс
        updateIncomeDisplay(fnsData.income);
        showNotification('success', 'Данные из ФНС успешно загружены');
    }, 1500);
}

// Обновление отображения доходов
function updateIncomeDisplay(incomeData) {
    // Обновляем общий доход на главной странице
    const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);
    const annualIncomeElement = document.getElementById('annual-income');
    if (annualIncomeElement) {
        annualIncomeElement.textContent = `${totalIncome.toLocaleString()} руб.`;
    }
    
    // Обновляем поле ввода доходов, если оно есть на странице
    const incomeEntries = document.getElementById('income-entries');
    if (incomeEntries) {
        incomeEntries.innerHTML = '';
        
        incomeData.forEach(item => {
            const incomeEntry = document.createElement('div');
            incomeEntry.className = 'income-entry';
            incomeEntry.innerHTML = `
                <div class="form-group">
                    <label>Тип дохода</label>
                    <select class="income-type">
                        <option value="salary" ${item.type === 'salary' ? 'selected' : ''}>Зарплата</option>
                        <option value="business" ${item.type === 'business' ? 'selected' : ''}>Предпринимательский доход</option>
                        <option value="rent" ${item.type === 'rent' ? 'selected' : ''}>Аренда</option>
                        <option value="other" ${item.type === 'other' ? 'selected' : ''}>Прочий доход</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Сумма (руб)</label>
                    <input type="number" class="income-amount" placeholder="Введите сумму" value="${item.amount}">
                </div>
                <div class="form-group">
                    <label>Период</label>
                    <input type="month" class="income-period" value="${item.period}">
                </div>
                <button class="remove-income-btn">×</button>
            `;
            
            incomeEntries.appendChild(incomeEntry);
        });
    }
}

// Подключение к Госуслугам
function connectToGosuslugi() {
    // В реальном приложении здесь будет OAuth-авторизация через Госуслуги
    showNotification('info', 'Перенаправление на страницу авторизации Госуслуг...');
    
    // Имитация успешного подключения через 2 секунды
    setTimeout(() => {
        localStorage.setItem('gosuslugiConnected', 'true');
        updateConnectionStatus('connect-gosuslugi-btn', true);
        showNotification('success', 'Аккаунт Госуслуг успешно подключен');
    }, 2000);
}

// Подключение к банку
function connectToBank() {
    // В реальном приложении здесь будет выбор банка и OAuth-авторизация
    showNotification('info', 'Открытие диалога выбора банка...');
    
    // Имитация выбора банка
    setTimeout(() => {
        const bankName = 'Сбербанк'; // В реальном приложении это будет выбирать пользователь
        if (confirm(`Подключить аккаунт ${bankName}?`)) {
            // Имитация успешного подключения
            setTimeout(() => {
                localStorage.setItem('bankConnected', 'true');
                localStorage.setItem('connectedBank', bankName);
                updateConnectionStatus('connect-bank-btn', true);
                showNotification('success', `Аккаунт ${bankName} успешно подключен`);
                
                // Загружаем данные из банка
                loadBankData();
            }, 1500);
        }
    }, 500);
}

// Загрузка данных из банка
function loadBankData() {
    // В реальном приложении здесь будет запрос к API банка
    showNotification('info', 'Загрузка данных из банка...');
    
    setTimeout(() => {
        // Моковые данные
        const bankData = {
            expenses: [
                { category: 'education', amount: 40000, date: '2023-01-15', description: 'Оплата обучения' },
                { category: 'health', amount: 15000, date: '2023-02-20', description: 'Оплата медицинских услуг' },
                { category: 'property', amount: 5000, date: '2023-03-10', description: 'Коммунальные платежи' }
            ],
            balance: 150000
        };
        
        // Сохраняем данные
        localStorage.setItem('bankData', JSON.stringify(bankData));
        
        // Обновляем интерфейс
        updateExpensesDisplay(bankData.expenses);
        showNotification('success', 'Данные из банка успешно загружены');
    }, 1500);
}

// Обновление отображения расходов
function updateExpensesDisplay(expensesData) {
    // Группируем расходы по категориям
    const expensesByCategory = {};
    expensesData.forEach(expense => {
        if (!expensesByCategory[expense.category]) {
            expensesByCategory[expense.category] = [];
        }
        expensesByCategory[expense.category].push(expense);
    });
    
    // Обновляем интерфейс расходов, если он есть на странице
    const expenseDetails = document.getElementById('expense-details');
    if (expenseDetails) {
        Object.entries(expensesByCategory).forEach(([category, expenses]) => {
            const expenseList = document.getElementById(`${category}-expenses`);
            if (expenseList) {
                expenses.forEach(expense => {
                    const expenseItem = document.createElement('div');
                    expenseItem.className = 'expense-item';
                    expenseItem.innerHTML = `
                        <div class="expense-info">
                            <span class="expense-amount">${expense.amount} руб.</span>
                            <span class="expense-date">${expense.date}</span>
                            <span class="expense-description">${expense.description}</span>
                        </div>
                    `;
                    expenseList.appendChild(expenseItem);
                });
            }
        });
    }
}