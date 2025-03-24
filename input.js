// Функции для страницы ввода данных

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация загрузки документов
    initDocumentUpload();
    
    // Инициализация формы личных данных
    initPersonalForm();
    
    // Инициализация ввода доходов
    initIncomeInput();
    
    // Инициализация ввода расходов
    initExpenseInput();
});

// Инициализация формы личных данных
function initPersonalForm() {
    const personalForm = document.getElementById('personal-form');
    if (personalForm) {
        personalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Собираем данные формы
            const formData = {
                fullName: document.getElementById('full-name').value,
                inn: document.getElementById('inn').value,
                address: document.getElementById('address').value,
                passport: document.getElementById('passport').value
            };
            
            // Валидация ИНН
            if (!validateINN(formData.inn)) {
                alert('Пожалуйста, введите корректный ИНН (12 цифр)');
                return;
            }
            
            // Сохраняем данные (в реальном приложении - отправка на сервер)
            localStorage.setItem('personalData', JSON.stringify(formData));
            showNotification('success', 'Личные данные успешно сохранены');
        });
        
        // Загрузка сохраненных данных, если они есть
        loadSavedPersonalData();
    }
}

// Валидация ИНН
function validateINN(inn) {
    return /^\d{12}$/.test(inn);
}

// Загрузка сохраненных личных данных
function loadSavedPersonalData() {
    const savedData = localStorage.getItem('personalData');
    if (savedData) {
        const formData = JSON.parse(savedData);
        document.getElementById('full-name').value = formData.fullName || '';
        document.getElementById('inn').value = formData.inn || '';
        document.getElementById('address').value = formData.address || '';
        document.getElementById('passport').value = formData.passport || '';
    }
}

// Инициализация ввода доходов
function initIncomeInput() {
    const addIncomeBtn = document.getElementById('add-income-btn');
    if (addIncomeBtn) {
        addIncomeBtn.addEventListener('click', addIncomeField);
        
        // Добавляем первое поле по умолчанию
        addIncomeField();
    }
    
    // Инициализация кнопок импорта
    const importFnsBtn = document.getElementById('import-fns-income');
    if (importFnsBtn) {
        importFnsBtn.addEventListener('click', importFromFNS);
    }
    
    const importBankBtn = document.getElementById('import-bank-income');
    if (importBankBtn) {
        importBankBtn.addEventListener('click', importFromBank);
    }
    
    const importExcelBtn = document.getElementById('import-excel-income');
    if (importExcelBtn) {
        importExcelBtn.addEventListener('click', importFromExcel);
    }
}

// Добавление поля для ввода дохода
function addIncomeField() {
    const incomeEntries = document.getElementById('income-entries');
    const incomeId = Date.now();
    
    const incomeEntry = document.createElement('div');
    incomeEntry.className = 'income-entry';
    incomeEntry.innerHTML = `
        <div class="form-group">
            <label>Тип дохода</label>
            <select class="income-type">
                <option value="salary">Зарплата</option>
                <option value="business">Предпринимательский доход</option>
                <option value="rent">Аренда</option>
                <option value="other">Прочий доход</option>
            </select>
        </div>
        <div class="form-group">
            <label>Сумма (руб)</label>
            <input type="number" class="income-amount" placeholder="Введите сумму">
        </div>
        <div class="form-group">
            <label>Период</label>
            <input type="month" class="income-period">
        </div>
        <button class="remove-income-btn" data-id="${incomeId}">×</button>
    `;
    
    incomeEntries.appendChild(incomeEntry);
    
    // Добавляем обработчик для кнопки удаления
    const removeBtn = incomeEntry.querySelector('.remove-income-btn');
    removeBtn.addEventListener('click', function() {
        if (document.querySelectorAll('.income-entry').length > 1) {
            incomeEntry.remove();
        } else {
            alert('Должен остаться хотя бы один источник дохода');
        }
    });
}

// Импорт данных из ФНС
function importFromFNS() {
    // Здесь должна быть реализация импорта данных через API ФНС
    showNotification('success', 'Запрос на импорт данных из ФНС отправлен');
    
    // Имитация получения данных через 2 секунды
    setTimeout(() => {
        // В реальном приложении здесь будут данные с сервера
        const mockData = [
            { type: 'salary', amount: 50000, period: '2023-01' },
            { type: 'salary', amount: 52000, period: '2023-02' }
        ];
        
        // Очищаем существующие поля
        const incomeEntries = document.getElementById('income-entries');
        incomeEntries.innerHTML = '';
        
        // Добавляем поля с импортированными данными
        mockData.forEach(data => {
            addIncomeField();
            const lastEntry = incomeEntries.lastElementChild;
            lastEntry.querySelector('.income-type').value = data.type;
            lastEntry.querySelector('.income-amount').value = data.amount;
            lastEntry.querySelector('.income-period').value = data.period;
        });
        
        showNotification('success', 'Данные из ФНС успешно импортированы');
    }, 2000);
}

// Импорт данных из банка
function importFromBank() {
    // Аналогично importFromFNS, но для банковских данных
    showNotification('info', 'Функция импорта из банка в разработке');
}

// Импорт данных из Excel
function importFromExcel() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.xlsx,.xls,.csv';
    
    fileInput.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            showNotification('success', `Файл "${file.name}" загружен для обработки`);
            
            // Имитация обработки файла
            setTimeout(() => {
                // В реальном приложении здесь будет парсинг файла
                const mockData = [
                    { type: 'business', amount: 15000, period: '2023-01' },
                    { type: 'rent', amount: 20000, period: '2023-01' }
                ];
                
                // Очищаем существующие поля
                const incomeEntries = document.getElementById('income-entries');
                incomeEntries.innerHTML = '';
                
                // Добавляем поля с импортированными данными
                mockData.forEach(data => {
                    addIncomeField();
                    const lastEntry = incomeEntries.lastElementChild;
                    lastEntry.querySelector('.income-type').value = data.type;
                    lastEntry.querySelector('.income-amount').value = data.amount;
                    lastEntry.querySelector('.income-period').value = data.period;
                });
                
                showNotification('success', 'Данные из файла успешно импортированы');
            }, 1500);
        }
    };
    
    fileInput.click();
}

// Инициализация ввода расходов
function initExpenseInput() {
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            showExpenseCategory(this.getAttribute('data-category'));
        });
    });
    
    // Показываем первую категорию по умолчанию
    if (categoryCards.length > 0) {
        showExpenseCategory(categoryCards[0].getAttribute('data-category'));
    }
}

// Показ деталей расходов по категории
function showExpenseCategory(category) {
    // Убираем активный класс у всех карточек
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // Добавляем активный класс к выбранной карточке
    document.querySelector(`.category-card[data-category="${category}"]`).classList.add('active');
    
    // Обновляем содержимое блока с деталями
    const expenseDetails = document.getElementById('expense-details');
    expenseDetails.innerHTML = getExpenseCategoryHTML(category);
    
    // Инициализация кнопки добавления расхода
    const addExpenseBtn = expenseDetails.querySelector('.add-expense-btn');
    if (addExpenseBtn) {
        addExpenseBtn.addEventListener('click', addExpenseField.bind(null, category));
    }
    
    // Инициализация кнопки загрузки документов
    const uploadDocsBtn = expenseDetails.querySelector('.upload-docs-btn');
    if (uploadDocsBtn) {
        uploadDocsBtn.addEventListener('click', uploadExpenseDocuments.bind(null, category));
    }
}

// Генерация HTML для категории расходов
function getExpenseCategoryHTML(category) {
    const categories = {
        education: {
            title: 'Образование',
            description: 'Расходы на собственное образование или образование детей',
            fields: [
                { name: 'educational_institution', label: 'Учебное заведение', type: 'text' },
                { name: 'contract_number', label: 'Номер договора', type: 'text' },
                { name: 'amount', label: 'Сумма расходов (руб)', type: 'number' },
                { name: 'period', label: 'Период оплаты', type: 'month' }
            ]
        },
        health: {
            title: 'Здоровье',
            description: 'Расходы на лечение, лекарства и медицинские услуги',
            fields: [
                { name: 'medical_institution', label: 'Медицинское учреждение', type: 'text' },
                { name: 'service_type', label: 'Вид услуги', type: 'text' },
                { name: 'amount', label: 'Сумма расходов (руб)', type: 'number' },
                { name: 'period', label: 'Период оплаты', type: 'month' }
            ]
        },
        property: {
            title: 'Недвижимость',
            description: 'Расходы на покупку или строительство жилья',
            fields: [
                { name: 'property_address', label: 'Адрес объекта', type: 'text' },
                { name: 'purchase_date', label: 'Дата покупки', type: 'date' },
                { name: 'amount', label: 'Сумма расходов (руб)', type: 'number' },
                { name: 'mortgage', label: 'Ипотека', type: 'checkbox', options: ['Да'] }
            ]
        },
        investments: {
            title: 'Инвестиции',
            description: 'Расходы на инвестиционные продукты',
            fields: [
                { name: 'investment_type', label: 'Тип инвестиций', type: 'text' },
                { name: 'broker', label: 'Брокер/Управляющая компания', type: 'text' },
                { name: 'amount', label: 'Сумма расходов (руб)', type: 'number' },
                { name: 'period', label: 'Период', type: 'month' }
            ]
        },
        other: {
            title: 'Прочие расходы',
            description: 'Другие расходы, которые могут давать право на вычет',
            fields: [
                { name: 'expense_type', label: 'Тип расхода', type: 'text' },
                { name: 'description', label: 'Описание', type: 'text' },
                { name: 'amount', label: 'Сумма расходов (руб)', type: 'number' },
                { name: 'period', label: 'Период', type: 'month' }
            ]
        }
    };
    
    const categoryData = categories[category] || categories.other;
    
    let fieldsHTML = '';
    categoryData.fields.forEach(field => {
        if (field.type === 'checkbox') {
            fieldsHTML += `
                <div class="form-group">
                    <label>${field.label}</label>
                    <div class="checkbox-group">
                        ${field.options.map(option => `
                            <label>
                                <input type="checkbox" name="${field.name}" value="${option}">
                                ${option}
                            </label>
                        `).join('')}
                    </div>
                </div>
            `;
        } else {
            fieldsHTML += `
                <div class="form-group">
                    <label>${field.label}</label>
                    <input type="${field.type}" name="${field.name}">
                </div>
            `;
        }
    });
    
    return `
        <h3>${categoryData.title}</h3>
        <p>${categoryData.description}</p>
        
        <div class="expense-form">
            ${fieldsHTML}
            
            <div class="form-actions">
                <button class="add-expense-btn">Добавить расход</button>
                <button class="upload-docs-btn">Загрузить документы</button>
            </div>
        </div>
        
        <div class="expense-list" id="${category}-expenses">
            <!-- Список добавленных расходов будет здесь -->
        </div>
    `;
}

// Добавление поля расхода
function addExpenseField(category) {
    const expenseForm = document.querySelector(`#expense-details .expense-form`);
    const formData = new FormData(expenseForm);
    const expenseData = {};
    
    formData.forEach((value, key) => {
        expenseData[key] = value;
    });
    
    // Проверяем, что все обязательные поля заполнены
    if (!expenseData.amount || isNaN(expenseData.amount)) {
        showNotification('error', 'Пожалуйста, укажите сумму расхода');
        return;
    }
    
    const expenseList = document.getElementById(`${category}-expenses`);
    const expenseId = Date.now();
    
    const expenseItem = document.createElement('div');
    expenseItem.className = 'expense-item';
    expenseItem.innerHTML = `
        <div class="expense-info">
            <span class="expense-amount">${expenseData.amount} руб.</span>
            <span class="expense-period">${expenseData.period || 'Нет данных'}</span>
        </div>
        <button class="remove-expense-btn" data-id="${expenseId}">×</button>
    `;
    
    expenseList.appendChild(expenseItem);
    
    // Добавляем обработчик для кнопки удаления
    const removeBtn = expenseItem.querySelector('.remove-expense-btn');
    removeBtn.addEventListener('click', function() {
        expenseItem.remove();
    });
    
    // Очищаем форму
    expenseForm.querySelectorAll('input[type="text"], input[type="number"], input[type="date"], input[type="month"]').forEach(input => {
        input.value = '';
    });
    
    showNotification('success', 'Расход успешно добавлен');
}

// Загрузка документов для расхода
function uploadExpenseDocuments(category) {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.multiple = true;
    fileInput.accept = '.pdf,.jpg,.jpeg,.png';
    
    fileInput.onchange = function(e) {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            // В реальном приложении здесь будет загрузка файлов на сервер
            const expenseList = document.getElementById(`${category}-expenses`);
            const lastExpense = expenseList.lastElementChild;
            
            if (lastExpense) {
                const docsList = document.createElement('div');
                docsList.className = 'expense-docs';
                docsList.innerHTML = '<span>Документы:</span>';
                
                files.forEach(file => {
                    docsList.innerHTML += `
                        <span class="doc-name">${file.name}</span>
                    `;
                });
                
                lastExpense.appendChild(docsList);
                showNotification('success', `Документы (${files.length}) успешно загружены`);
            } else {
                showNotification('error', 'Сначала добавьте расход, затем загружайте документы');
            }
        }
    };
    
    fileInput.click();
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