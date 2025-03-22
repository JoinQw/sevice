// Обработка кнопки "Выход"
document.getElementById('logout-btn').addEventListener('click', function () {
    alert('Вы вышли из системы.');
    // Здесь можно добавить логику выхода (например, очистка localStorage или переход на страницу входа)
});

// Обработка кнопки "Загрузить документы"
document.getElementById('upload-docs-btn').addEventListener('click', function () {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf, .csv, .xlsx';
    fileInput.onchange = function (event) {
        const file = event.target.files[0];
        if (file) {
            alert(`Файл "${file.name}" успешно загружен.`);
        }
    };
    fileInput.click();
});

// Обработка кнопки "Синхронизировать с ФНС"
document.getElementById('sync-fns-btn').addEventListener('click', function () {
    alert('Данные синхронизированы с ФНС.');
    // Здесь можно добавить логику синхронизации с API ФНС
});

// Обработка ввода дохода
document.getElementById('income-input').addEventListener('input', function (event) {
    const income = event.target.value;
    console.log(`Введенный доход: ${income} руб.`);
});
// Обработка кнопки "Сохранить и продолжить"
document.getElementById('save-btn').addEventListener('click', function () {
    const fullName = document.getElementById('full-name').value;
    const inn = document.getElementById('inn').value;
    const address = document.getElementById('address').value;
    const income = document.getElementById('income').value;
    const expenses = document.getElementById('expenses').value;

    if (fullName && inn && address && income && expenses) {
        alert('Данные успешно сохранены.');
        // Здесь можно добавить логику сохранения данных (например, отправка на сервер)
    } else {
        alert('Пожалуйста, заполните все поля.');
    }
});
// Обработка кнопок "Подробнее"
document.querySelectorAll('.details-btn').forEach(button => {
    button.addEventListener('click', function () {
        alert('Подробная информация о вычете.');
        // Здесь можно добавить логику отображения деталей вычета
    });
});

// Обработка кнопки "Сформировать документы"
document.getElementById('generate-docs-btn').addEventListener('click', function () {
    alert('Документы успешно сформированы.');
    // Здесь можно добавить логику формирования документов
});

// Обработка кнопки "Отправить через Госуслуги"
document.getElementById('submit-gosuslugi-btn').addEventListener('click', function () {
    alert('Документы отправлены через Госуслуги.');
    // Здесь можно добавить логику отправки документов через API Госуслуг
});