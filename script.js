document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const reviewsContainer = document.getElementById("reviews");

  // Обработка формы
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      if (!data.name || !data.email || !data.message) {
        alert("Пожалуйста, заполните все поля!");
        return;
      }

      console.log("Отправка данных:", data);
      alert("Ваше сообщение успешно отправлено!");
      form.reset();
    } catch (error) {
      console.error("Ошибка при отправке:", error);
      alert("Произошла ошибка при отправке. Попробуйте еще раз.");
    }
  });

  // Загрузка отзывов
  async function loadReviews() {
    const reviews = [
      { name: "Анна", text: "Отличная работа! Очень довольна дизайном." },
      { name: "Иван", text: "Быстро и качественно! Спасибо." },
      { name: "Мария", text: "Рекомендую! Профессиональный подход." },
    ];

    reviewsContainer.innerHTML = ""; // Очистка контейнера
    reviews.forEach((review) => {
      const reviewElement = document.createElement("div");
      reviewElement.classList.add("review");
      reviewElement.innerHTML = `
        <h3>${review.name}</h3>
        <p>${review.text}</p>
      `;
      reviewsContainer.appendChild(reviewElement);
    });
  }

  loadReviews(); // Вызов загрузки отзывов при загрузке страницы
});


document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  const dropdowns = document.querySelectorAll(".dropdown > a");

  // Переключение бургер-меню
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  // Выпадающее меню
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", (e) => {
      e.preventDefault();
      const submenu = dropdown.nextElementSibling;

      if (submenu.style.display === "block") {
        submenu.style.display = "none";
      } else {
        // Скрываем все открытые подменю
        document.querySelectorAll(".submenu").forEach((menu) => {
          menu.style.display = "none";
        });
        submenu.style.display = "block";
      }
    });
  });

  // Закрытие меню при клике вне его
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown") && !e.target.closest("#menu-toggle")) {
      document.querySelectorAll(".submenu").forEach((menu) => {
        menu.style.display = "none";
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Переключение бургер-меню
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  menuToggle.addEventListener("click", () => menu.classList.toggle("active"));

  // Модальное окно
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const closeModal = document.querySelector(".close");

  const galleryImages = document.querySelectorAll(".gallery-item img");

  // Открытие модального окна
  galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
      modal.style.display = "block";
      modalImg.src = img.dataset.full; // Загрузка большого изображения
    });
  });

  // Закрытие модального окна
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const closeModal = document.querySelector(".close");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");
  const filters = document.querySelectorAll(".filter button");
  const galleryItems = document.querySelectorAll(".gallery-item");

  let currentImages = [];
  let currentIndex = 0;
  let autoSlideInterval;

  // Бургер-меню
  menuToggle.addEventListener("click", () => menu.classList.toggle("active"));

  // Фильтр галереи
  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const category = filter.getAttribute("data-filter");

      galleryItems.forEach((item) => {
        item.style.display = category === "all" || item.getAttribute("data-category") === category ? "block" : "none";
      });
    });
  });

  // Открытие модального окна
  galleryItems.forEach((item) => {
    item.querySelector("img").addEventListener("click", () => {
      const img = item.querySelector("img");
      currentImages = JSON.parse(img.getAttribute("data-images"));
      currentIndex = 0;

      modalTitle.textContent = img.alt;
      modalDesc.textContent = img.getAttribute("data-desc");
      modalImg.src = currentImages[currentIndex];
      modal.style.display = "block";

      startAutoSlide(); // Запускаем автопрокрутку
    });
  });

  // Пролистывание изображений
  function showImage(index) {
    modalImg.src = currentImages[index];
  }

  nextBtn.addEventListener("click", () => {
    stopAutoSlide(); // Останавливаем автопрокрутку при ручном переключении
    currentIndex = (currentIndex + 1) % currentImages.length;
    showImage(currentIndex);
  });

  prevBtn.addEventListener("click", () => {
    stopAutoSlide();
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    showImage(currentIndex);
  });

  // Автоматическая прокрутка слайдов
  function startAutoSlide() {
    stopAutoSlide(); // Очищаем предыдущий таймер
    autoSlideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % currentImages.length;
      showImage(currentIndex);
    }, 3000); // Прокрутка каждые 3 секунды
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Закрытие модального окна
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    stopAutoSlide();
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      stopAutoSlide();
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("order-modal");
  const modalTitle = document.getElementById("modal-service-title");
  const closeModal = document.querySelector(".close");
  const orderBtns = document.querySelectorAll(".order-btn");
  const form = document.getElementById("order-form");

  let selectedService = "";

  // Открытие модального окна
  orderBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedService = btn.getAttribute("data-service");
      modalTitle.textContent = `Заказать услугу: ${selectedService}`;
      modal.style.display = "block";
    });
  });

  // Закрытие модального окна
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Обработка формы
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    console.log("Заказ:", {
      service: selectedService,
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    });

    alert("Ваш заказ отправлен!");
    form.reset();
    modal.style.display = "none";
  });
});



//для шапки
document.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  const overlay = document.querySelector(".header-overlay");

  if (window.scrollY > window.innerHeight * 0.1) { // Если прокрутили на 10% высоты экрана
    header.classList.add("scrolled");
    overlay.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
    overlay.classList.remove("scrolled");
  }
});


window.addEventListener("scroll", () => {
  const overlay = document.querySelector(".content-overlay");
  const scrollY = window.scrollY;

  if (scrollY > 50) {
    // Если прокрутка больше 50px
    overlay.classList.add("scrolled");
  } else {
    // Если прокрутка меньше 50px
    overlay.classList.remove("scrolled");
  }
});







// Создаём "фонарик"
const spotlight = document.createElement("div");
spotlight.id = "spotlight";
document.body.appendChild(spotlight);

// Обновляем позицию "фонарика" при движении мыши
document.addEventListener("mousemove", (e) => {
  spotlight.style.left = `${e.pageX}px`;
  spotlight.style.top = `${e.pageY}px`;
});

// Находим все активные элементы
const interactiveElements = document.querySelectorAll(".link, .btn, .team-name");

// Добавляем обработчики событий
interactiveElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    spotlight.style.width = "300px"; // Сужение
    spotlight.style.height = "300px";
  });

  el.addEventListener("mouseleave", () => {
    spotlight.style.width = "500px"; // Возврат к исходному размеру
    spotlight.style.height = "500px";
  });
});




//для анимации появления элементов при прокрутке
function onEntry(entry) {
  entry.forEach(change => {
    if (change.isIntersecting) {
      change.target.classList.add('element-show');
    }
  });
}

let options = {
  threshold: [0.5] // Порог видимости элемента (50%)
};
let observer = new IntersectionObserver(onEntry, options);

let elements = document.querySelectorAll('#intro, #highlights, footer'); // Выбираем все нужные элементы

for (let elm of elements) {
  observer.observe(elm);
}
