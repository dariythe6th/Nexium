document.addEventListener('DOMContentLoaded', function() {
  const languageToggle = document.getElementById('languageToggle');
  if (!languageToggle) return;

  // Получаем текущий язык из localStorage или устанавливаем русский по умолчанию
  let currentLanguage = localStorage.getItem('siteLanguage') || 'ru';
  
  // Инициализируем кнопку и страницу
  updateButtonText();
  translatePage(currentLanguage);
  
  // Обработчик клика
  languageToggle.addEventListener('click', function() {
    // Переключаем язык
    currentLanguage = currentLanguage === 'ru' ? 'en' : 'ru';
    localStorage.setItem('siteLanguage', currentLanguage);
    
    // Обновляем текст кнопки
    updateButtonText();
    
    // Переводим страницу
    translatePage(currentLanguage);
  });

  function updateButtonText() {
    languageToggle.textContent = currentLanguage === 'ru' ? 'EN' : 'RU';
  }
});