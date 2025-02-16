document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const toggleIcon = menuToggle.querySelector("i");
  const navbarPages = document.querySelector(".navbarPages");
  const mainLang = document.querySelector(".mainLang");
  const langOptions = document.querySelectorAll(".langDropdown li");
  const loadingOverlay = document.getElementById("loadingOverlay");

  // Navbar toggle functionality
  menuToggle.addEventListener("click", function () {
    navbarPages.classList.toggle("active");

    // Toggle between 'fa-toggle-off' and 'fa-toggle-on'
    if (navbarPages.classList.contains("active")) {
      toggleIcon.classList.remove("fa-toggle-off");
      toggleIcon.classList.add("fa-toggle-on");
    } else {
      toggleIcon.classList.remove("fa-toggle-on");
      toggleIcon.classList.add("fa-toggle-off");
    }
  });

  // Load saved language from localStorage
  const savedLanguage = localStorage.getItem("selectedLanguage");
  if (savedLanguage) {
    mainLang.innerText = savedLanguage;
    changeLanguage(savedLanguage, false); // No loading animation on page load
  }

  // Event listener for changing language
  langOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const selectedLanguage = this.innerText;
      mainLang.innerText = selectedLanguage;
      localStorage.setItem("selectedLanguage", selectedLanguage);
      
      // Show loading overlay before applying language change
      showLoading(() => changeLanguage(selectedLanguage, true));
    });
  });

  // Function to show the loading screen for 2 seconds
  function showLoading(callback) {
    loadingOverlay.style.display = "flex";
    setTimeout(() => {
      loadingOverlay.style.display = "none";
      callback();
    }, 2000);
  }

  // Function to change page content based on language
  function changeLanguage(language, showLoader) {
    const translations = {
      English: { services: "Services", portfolio: "Portfolio", projects: "Projects", contact: "Contact Me" },
      Thai: { services: "บริการ", portfolio: "ผลงาน", projects: "โครงการ", contact: "ติดต่อฉัน" },
      Urdu: { services: "خدمات", portfolio: "پورٹ فولیو", projects: "پروجیکٹس", contact: "مجھ سے رابطہ کریں" },
      French: { services: "Services", portfolio: "Portefeuille", projects: "Projets", contact: "Contactez-moi" },
      Spanish: { services: "Servicios", portfolio: "Portafolio", projects: "Proyectos", contact: "Contáctame" },
      Russian: { services: "Услуги", portfolio: "Портфолио", projects: "Проекты", contact: "Свяжитесь со мной" },
      Japanese: { services: "サービス", portfolio: "ポートフォリオ", projects: "プロジェクト", contact: "お問い合わせ" },
      Korean: { services: "서비스", portfolio: "포트폴리오", projects: "프로젝트", contact: "문의하기" },
    };

    // Delay text update if showLoader is true
    if (showLoader) {
      setTimeout(() => applyTranslations(translations[language]), 2000);
    } else {
      applyTranslations(translations[language]);
    }
  }

  // Function to update text based on language selection
  function applyTranslations(translations) {
    const navbarLinks = document.querySelectorAll(".navbarPages ul li a");
    navbarLinks[0].innerText = translations.services;
    navbarLinks[1].innerText = translations.portfolio;
    navbarLinks[2].innerText = translations.projects;
    navbarLinks[3].innerText = translations.contact;
  }
});
