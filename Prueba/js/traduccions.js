const i18nData = {
  ca: {
    "nav-home": "Inici",
    "nav-about": "Qui Som",
    "nav-products": "Productes",
    "nav-recipes": "Receptes",
    "nav-stock": "Estoc",
    "hero-title": "L'Hort Ecològic del Campus <span>UPC CAMP</span>",
    "hero-desc": "Un ecosistema d'agricultura intel·ligent i sostenible integrat al cor de la UPC Castelldefels. Innovació tecnològica aplicada a la terra.",
    "btn-explore": "Explorar Productes",
    "btn-chat": "Parlar amb IA",
    "stat-surf": "Superfície",
    "stat-prod": "Varietats",
    "stat-team": "Investigadors",
    "stat-tech": "Eficiència",
    "sec-about-title": "El Nostre Projecte",
    "sec-team-title": "Equip d'Innovadors",
    "history-title": "La Nostra Història",
    "history-desc": "Nascut com una iniciativa universitària l'any 2024 per fusionar l'enginyeria agronòmica de la UPC amb sistemes digitals d'avantguarda.",
    "mission-title": "Missió",
    "mission-desc": "Promoure l'alimentació km0, la sostenibilitat i la recerca activa en tècniques de cultiu biològiques controlades digitalment.",
    "vision-title": "Visió",
    "vision-desc": "Ser el referent d'hort intel·ligent universitari a Europa per a l'any 2030.",
    "values-title": "Valors",
    "values-desc": "Sostenibilitat, Excel·lència Tecnològica, Treball Col·laboratiu i Economia Circular.",
    "search-placeholder": "Cerca...",
    "filter-all": "Tots",
    "chat-placeholder": "Pregunta a la IA de l'hort...",
    "btn-send": "Enviar"
  },
  es: {
    "nav-home": "Inicio",
    "nav-about": "Quién Somos",
    "nav-products": "Productos",
    "nav-recipes": "Recetas",
    "nav-stock": "Stock",
    "hero-title": "El Huerto Ecológico del Campus <span>UPC CAMP</span>",
    "hero-desc": "Un ecosistema de agricultura inteligente y sostenible integrado en el corazón de la UPC Castelldefels. Innovación tecnológica aplicada a la tierra.",
    "btn-explore": "Explorar Productos",
    "btn-chat": "Hablar con IA",
    "stat-surf": "Superfície",
    "stat-prod": "Variedades",
    "stat-team": "Investigadores",
    "stat-tech": "Eficiencia",
    "sec-about-title": "Nuestro Proyecto",
    "sec-team-title": "Equipo de Innovadores",
    "history-title": "Nuestra Historia",
    "history-desc": "Nacido como una iniciativa universitaria en 2024 para fusionar la ingeniería agronómica de la UPC con sistemas digitales de vanguardia.",
    "mission-title": "Misión",
    "mission-desc": "Promover la alimentación km0, la sostenibilidad y la investigación activa en técnicas de cultivo biológicas controladas digitalmente.",
    "vision-title": "Visión",
    "vision-desc": "Ser el referente de huerto inteligente universitario en Europa para el año 2030.",
    "values-title": "Valores",
    "values-desc": "Sostenibilidad, Excelencia Tecnológica, Trabajo Colaborativo y Economía Circular.",
    "search-placeholder": "Buscar...",
    "filter-all": "Todos",
    "chat-placeholder": "Pregunta a la IA del huerto...",
    "btn-send": "Enviar"
  },
  en: {
    "nav-home": "Home",
    "nav-about": "About Us",
    "nav-products": "Products",
    "nav-recipes": "Recipes",
    "nav-stock": "Stock",
    "hero-title": "The Ecological Garden of <span>UPC CAMP</span>",
    "hero-desc": "An ecosystem of smart and sustainable agriculture integrated into the heart of UPC Castelldefels. Technological innovation applied to the earth.",
    "btn-explore": "Explore Products",
    "btn-chat": "Talk to AI",
    "stat-surf": "Surface",
    "stat-prod": "Varieties",
    "stat-team": "Researchers",
    "stat-tech": "Efficiency",
    "sec-about-title": "Our Project",
    "sec-team-title": "Innovative Team",
    "history-title": "Our History",
    "history-desc": "Born as a university initiative in 2024 to merge UPC agronomic engineering with cutting-edge digital systems.",
    "mission-title": "Mission",
    "mission-desc": "To promote km0 food, sustainability, and active research in digitally controlled biological cultivation techniques.",
    "vision-title": "Vision",
    "vision-desc": "To be the benchmark for smart university gardens in Europe by 2030.",
    "values-title": "Values",
    "values-desc": "Sustainability, Technological Excellence, Collaborative Work, and Circular Economy.",
    "search-placeholder": "Search...",
    "filter-all": "All",
    "chat-placeholder": "Ask the garden AI...",
    "btn-send": "Send"
  }
};

function applyTranslations(lang) {
  localStorage.setItem('upc_camp_lang', lang);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18nData[lang] && i18nData[lang][key]) {
      if (el.tagName === 'INPUT' && el.getAttribute('placeholder')) {
        el.setAttribute('placeholder', i18nData[lang][key]);
      } else {
        el.innerHTML = i18nData[lang][key];
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('upc_camp_lang') || 'ca';
  const selector = document.getElementById('langSelector');
  if (selector) {
    selector.value = savedLang;
    selector.addEventListener('change', (e) => applyTranslations(e.target.value));
  }
  applyTranslations(savedLang);
});