// Функции для страницы анализа

document.addEventListener('DOMContentLoaded', function() {
    // Запускаем анализ при загрузке страницы
    startAnalysis();
    
    // Инициализация кнопок
    initAnalysisButtons();
});

// Запуск анализа
function startAnalysis() {
    // Показываем индикатор прогресса
    const progressFill = document.getElementById('analysis-progress-fill');
    const progressText = document.getElementById('analysis-progress-text');
    const analysisSteps = document.querySelectorAll('.analysis-step');
    
    // Имитация процесса анализа
    let progress = 0;
    const analysisInterval = setInterval(() => {
        progress += 5;
        if (progress > 100) progress = 100;
        
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${progress}%`;
        
        // Обновляем активный шаг
        if (progress >= 25 && progress < 50) {
            analysisSteps[0].classList.remove('active');
            analysisSteps[1].classList.add('active');
        } else if (progress >= 50 && progress < 75) {
            analysisSteps[1].classList.remove('active');
            analysisSteps[2].classList.add('active');
        } else if (progress >= 75) {
            analysisSteps[2].classList.remove('active');
            analysisSteps[3].classList.add('active');
        }
        
        // Завершаем анализ при 100%
        if (progress === 100) {
            clearInterval(analysisInterval);
            completeAnalysis();
        }
    }, 200);
}

// Завершение анализа
function completeAnalysis() {
    // Показываем результаты
    const analysisResults = document.getElementById('analysis-results');
    analysisResults.classList.remove('hidden');
    
    // Заполняем результаты (в реальном приложении данные будут с сервера)
    document.getElementById('total-income-result').textContent = '624,000 руб.';
    document.getElementById('total-tax-result').textContent = '81,120 руб.';
    document.getElementById('potential-deductions-result').textContent = '120,000 руб.';
    document.getElementById('potential-return-result').textContent = '15,600 руб.';
}

// Инициализация кнопок
function initAnalysisButtons() {
    // Кнопка "Посмотреть рекомендации"
    const viewRecommendationsBtn = document.getElementById('view-recommendations-btn');
    if (viewRecommendationsBtn) {
        viewRecommendationsBtn.addEventListener('click', function() {
            window.location.href = 'recommendations.html';
        });
    }
    
    // Кнопка "Повторить анализ"
    const restartAnalysisBtn = document.getElementById('restart-analysis-btn');
    if (restartAnalysisBtn) {
        restartAnalysisBtn.addEventListener('click', function() {
            window.location.reload();
        });
    }
}