// Функции для страницы документов

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация счетчиков документов
    updateDocumentsCounters();
    
    // Инициализация кнопок
    initDocumentsButtons();
    
    // Инициализация загрузки документов
    initDocumentUpload();
});

// Обновление счетчиков документов
function updateDocumentsCounters() {
    const readyDocs = document.querySelectorAll('.document-item.ready').length;
    const missingDocs = document.querySelectorAll('.document-item.missing').length;
    const totalDocs = readyDocs + missingDocs;
    
    document.getElementById('ready-docs-count').textContent = readyDocs;
    document.getElementById('missing-docs-count').textContent = missingDocs;
    document.getElementById('total-docs-count').textContent = totalDocs;
}

// Инициализация кнопок
function initDocumentsButtons() {
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
    const saveDocsBtn = document.getElementById('save-docs-btn');
    if (saveDocsBtn) {
        saveDocsBtn.addEventListener('click', saveForLater);
    }
    
    // Кнопки "Просмотреть"
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const docName = this.closest('.document-item').querySelector('h3').textContent;
            alert(`Просмотр документа: ${docName}\n\nВ реальном приложении здесь будет отображение документа.`);
        });
    });
    
    // Кнопки "Скачать"
    const downloadBtns = document.querySelectorAll('.download-btn');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const docName = this.closest('.document-item').querySelector('h3').textContent;
            alert(`Скачивание документа: ${docName}\n\nВ реальном приложении здесь будет скачивание PDF.`);
        });
    });
}

// Формирование всех документов
function generateAllDocuments() {
    // В реальном приложении здесь будет запрос к API
    showNotification('info', 'Начато формирование всех документов...');
    
    setTimeout(() => {
        // Имитация успешного формирования
        const missingDocs = document.querySelectorAll('.document-item.missing');
        missingDocs.forEach(doc => {
            doc.classList.remove('missing');
            doc.classList.add('ready');
            doc.querySelector('.document-status').textContent = 'Готово';
            doc.querySelector('.document-hint').remove();
            
            const actions = doc.querySelector('.document-actions');
            actions.innerHTML = '';
            actions.innerHTML = `
                <button class="view-btn">Просмотреть</button>
                <button class="download-btn">Скачать</button>
            `;
            
            // Добавляем обработчики для новых кнопок
            actions.querySelector('.view-btn').addEventListener('click', function() {
                const docName = this.closest('.document-item').querySelector('h3').textContent;
                alert(`Просмотр документа: ${docName}`);
            });
            
            actions.querySelector('.download-btn').addEventListener('click', function() {
                const docName = this.closest('.document-item').querySelector('h3').textContent;
                alert(`Скачивание документа: ${docName}`);
            });
        });
        
        updateDocumentsCounters();
        showNotification('success', 'Все документы успешно сформированы');
    }, 2000);
}

// Отправка через Госуслуги
function submitViaGosuslugi() {
    // Проверяем, есть ли отсутствующие документы
    const missingDocs = document.querySelectorAll('.document-item.missing').length;
    if (missingDocs > 0) {
        if (!confirm(`У вас ${missingDocs} отсутствующих документов. Вы уверены, что хотите продолжить?`)) {
            return;
        }
    }
    
    // В реальном приложении здесь будет отправка через API Госуслуг
    showNotification('info', 'Отправка документов через Госуслуги...');
    
    setTimeout(() => {
        showNotification('success', 'Документы успешно отправлены в ФНС через Госуслуги');
    }, 2500);
}

// Сохранение для последующей подачи
function saveForLater() {
    // В реальном приложении здесь будет сохранение на сервере
    showNotification('success', 'Все документы сохранены. Вы можете вернуться к подаче позже.');
}

// Инициализация загрузки документов
function initDocumentUpload() {
    const uploadBtns = document.querySelectorAll('.upload-btn');
    
    uploadBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const docItem = this.closest('.document-item');
            const docName = docItem.querySelector('h3').textContent;
            
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = '.pdf,.jpg,.jpeg,.png';
            
            fileInput.onchange = function(e) {
                const file = e.target.files[0];
                if (file) {
                    // В реальном приложении здесь будет загрузка на сервер
                    docItem.classList.remove('missing');
                    docItem.classList.add('ready');
                    
                    const status = docItem.querySelector('.document-status');
                    status.textContent = 'Готово';
                    
                    if (docItem.querySelector('.document-hint')) {
                        docItem.querySelector('.document-hint').remove();
                    }
                    
                    const actions = docItem.querySelector('.document-actions');
                    actions.innerHTML = '';
                    actions.innerHTML = `
                        <button class="view-btn">Просмотреть</button>
                        <button class="download-btn">Скачать</button>
                    `;
                    
                    // Добавляем обработчики для новых кнопок
                    actions.querySelector('.view-btn').addEventListener('click', function() {
                        alert(`Просмотр документа: ${docName}`);
                    });
                    
                    actions.querySelector('.download-btn').addEventListener('click', function() {
                        alert(`Скачивание документа: ${docName}`);
                    });
                    
                    updateDocumentsCounters();
                    showNotification('success', `Документ "${file.name}" успешно загружен`);
                }
            };
            
            fileInput.click();
        });
    });
}