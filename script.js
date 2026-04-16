/* ============================================================
   La Tavola Stretta
   FE-GR4-Restaurant Website Project
   script.js
   ============================================================ */

const FULL_MENU = [
  {
    category: "Antipasti/Appetizers",
    items: [
      {
        name: "Bruschetta Classica",
        desc: "Toasted Ciabatta topped with Roma tomatoes, fresh basil, garlic, and extra virgin olive oil.",
        price: "$12.50",
        tags: ["Vegetarian", "Vegan"],
        img: "./Images/Bruschetta 2.jpg",
      },
      {
        name: "Calamari Fritti",
        desc: "Lightly floured squid rings served with a spicy marinara dipping sauce and lemon wedges.",
        price: "$19.00",
        tags: ["Seafood"],
        img: "./Images/Calamari.jpg",
      },
      {
        name: "Arancini di Sicilia",
        desc: "Crispy saffron rice balls stuffed with mozzarella and peas, served over a bed of pomodoro sauce.",
        price: "$15.00",
        tags: ["Vegetarian"],
        img: "./Images/Arancini.jpg",
      },
      {
        name: "Burrata & Prosciutto",
        desc: "Creamy Burrata cheese paired with 24-month aged Prosciutto di Parma and a balsamic reduction.",
        price: "$22.00",
        tags: ["Gluten-Free"],
        img: "./Images/Burrata & Prosciutto.jpg",
      },
    ],
  },
  {
    category: "Secondi/Main Dishes",
    items: [
      {
        name: "Polpo Arrosto al Lomone",
        desc: "A tender, slow-cooked octopus tentacle, lightly grilled for a perfect char, served on a bed of creamy mashed potatoes, finished with lemon, olive oil, and fresh herbs.",
        price: "$36.00",
        tags: ["Seafood", "Award-winning", "Signature"],
        img: "./Images/award winning dish.jpg",
      },
      {
        name: "Gnocchi al Pomodoro e Burrata",
        desc: "Hand-made potato gnocchi in a light tomato-basil sauce, topped with fresh burrata.",
        price: "$24.00",
        tags: ["Vegetarian", "Pasta"],
        img: "./Images/Gnocchi-al-Pomodoro-e-Burrata.png",
      },
      {
        name: "Pollo alla Parmigiana",
        desc: "Breaded chicken breast topped with melted mozzarella and tomato sauce, served with a side of spaghetti.",
        price: "$32.00",
        tags: ["Classic"],
        img: "./Images/Pollo%20alla%20Parmigiana.png",
      },
      {
        name: "Salmone al Limone",
        desc: "Pan-seared Atlantic salmon with a lemon-caper butter sauce, served with seasonal roasted vegetables.",
        price: "$36.00",
        tags: ["Seafood", "Gluten-Free"],
        img: "./Images/Salmone al Limone.jpg",
      },
      {
        name: "Guancia di Manzo",
        desc: "12-hour slow-braised beef cheek in a rich Barolo wine reduction, served over hand-cut golden egg pasta.",
        price: "$38.00",
        tags: ["Signature"],
        img: "./Images/guancia di manzo.jpg",
      },
    ],
  },
  {
    category: "Dolci/Desserts",
    items: [
      {
        name: "Classic Tiramisu",
        desc: "Ladyfingers soaked in espresso and Marsala, layered with whipped mascarpone and cocoa powder.",
        price: "$13.00",
        tags: ["Vegetarian"],
        img: "./Images/tiramisu.jpg",
      },
      {
        name: "Panna Cotta ai Frutti di Bosco",
        desc: "Velvety vanilla bean custard topped with a wild berry compote.",
        price: "$11.50",
        tags: ["Vegetarian", "Gluten-Free"],
        img: "./Images/Panna Cotta ai Frutti di Bosco.png",
      },
      {
        name: "Sicilian Cannoli",
        desc: "Crispy pastry shells filled with sweet ricotta and chocolate chips, finished with crushed pistachios.",
        price: "$10.00",
        tags: ["Contains Nuts"],
        img: "./Images/cannoli.png",
      },
    ],
  },
  {
    category: "Bevande/Drinks",
    items: [
      {
        name: "San Pellegrino Sparkling Water",
        desc: "750ml bottle of sparkling mineral water.",
        price: "$7.50",
        tags: ["Non-Alcoholic"],
        img: "./Images/SanPellegrino.png",
      },
      {
        name: "Glass of Chianti Classico",
        desc: "6oz pour of Italian red wine.",
        price: "$14.00",
        tags: ["Alcoholic"],
        img: "./Images/chianti.jpg",
      },
      {
        name: "Aperol Spritz",
        desc: "Classic Italian wine-based cocktail.",
        price: "$16.00",
        tags: ["Alcoholic"],
        img: "./Images/AperolSpritz.jpg",
      },
      {
        name: "Espresso / Cappuccino",
        desc: "Authentic Italian coffee options.",
        price: "$4.00 / $5.50",
        tags: ["Caffeine"],
        img: "./Images/capuccino.jpg",
      },
    ],
  },
];

/* ─── Build the modal HTML ─── */
function buildModal() {
  const modalBody = document.getElementById("modalBody");
  if (!modalBody) return;

  let html = "";

  FULL_MENU.forEach((section) => {
    html += `<div class="modal-category">${section.category}</div>`;

    section.items.forEach((item) => {
      const tagsHtml = item.tags
        .map((t) => `<span class="modal-tag">${t}</span>`)
        .join("");

      html += `
        <div class="modal-menu-item">
          <div class="modal-dish-img-wrap">
            <img
              src="${item.img}"
              alt="${item.name}"
              class="modal-dish-img"
              loading="lazy"
              onerror="this.src='https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=200&q=60'"
            />
          </div>
          <div class="modal-dish-info">
            <div class="modal-dish-name">${item.name}</div>
            <div class="modal-dish-desc">${item.desc}</div>
            <div class="modal-dish-tags">${tagsHtml}</div>
          </div>
          <div class="modal-dish-price">${item.price}</div>
        </div>`;
    });
  });

  modalBody.innerHTML = html;
}

/* ─── Search logic ─── */
function initSearch() {
  const searchInput = document.querySelector('input[type="search"]');
  const searchForm  = document.querySelector('form[role="search"]');
  const modalBody   = document.getElementById("modalBody");
  if (!searchInput || !modalBody) return;

  // "no results" message
  const noResults = document.createElement("p");
  noResults.id          = "no-results-msg";
  noResults.className   = "text-muted text-center mt-3";
  noResults.textContent = "No menu items found.";
  noResults.style.display = "none";
  modalBody.appendChild(noResults);

  const modalEl = document.getElementById("fullMenuModal");
  const bsModal = modalEl ? new bootstrap.Modal(modalEl) : null;

  function performSearch(query) {
    const trimmed = query.trim().toLowerCase();
    const menuItems    = document.querySelectorAll(".modal-menu-item");
    const categoryDivs = document.querySelectorAll(".modal-category");

    if (trimmed === "") {
      menuItems.forEach((item) => (item.style.display = ""));
      categoryDivs.forEach((div) => (div.style.display = ""));
      noResults.style.display = "none";
      return;
    }

    // Check each category: show all its items if the category name matches,
    // otherwise show only items that match individually
    categoryDivs.forEach((categoryDiv) => {
      const categoryName = categoryDiv.textContent.toLowerCase();
      const categoryMatches = categoryName.includes(trimmed);

      let sibling    = categoryDiv.nextElementSibling;
      let hasVisible = false;

      while (sibling && !sibling.classList.contains("modal-category")) {
        if (sibling.classList.contains("modal-menu-item")) {
          if (categoryMatches) {
            // Whole category matched — show all items under it
            sibling.style.display = "";
            hasVisible = true;
          } else {
            // Check individual item fields
            const name  = sibling.querySelector(".modal-dish-name")?.textContent.toLowerCase()  || "";
            const desc  = sibling.querySelector(".modal-dish-desc")?.textContent.toLowerCase()  || "";
            const tags  = sibling.querySelector(".modal-dish-tags")?.textContent.toLowerCase()  || "";
            const price = sibling.querySelector(".modal-dish-price")?.textContent.toLowerCase() || "";

            const itemMatches =
              name.includes(trimmed)  ||
              desc.includes(trimmed)  ||
              tags.includes(trimmed)  ||
              price.includes(trimmed);

            sibling.style.display = itemMatches ? "" : "none";
            if (itemMatches) hasVisible = true;
          }
        }
        sibling = sibling.nextElementSibling;
      }

      // Show/hide the category header itself
      categoryDiv.style.display = hasVisible ? "" : "none";
    });

    const anyVisible = [...menuItems].some((item) => item.style.display !== "none");
    noResults.style.display = !anyVisible ? "block" : "none";
  }

  function triggerSearch() {
    if (searchInput.value.trim() !== "" && bsModal) bsModal.show();
    performSearch(searchInput.value);
  }

  // ── Click on Search button only ──
  searchForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    triggerSearch();
  });

  // ── Enter key ──
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      triggerSearch();
    }
  });

  // ── Native clear button (×) resets results ──
  searchInput.addEventListener("search", (e) => {
    if (e.target.value === "") performSearch("");
  });

  // ── Reset scroll when modal opens manually ──
  modalEl?.addEventListener("show.bs.modal", () => {
    if (searchInput.value.trim() === "") performSearch("");
    const body = modalEl.querySelector(".modal-body");
    if (body) body.scrollTop = 0;
  });

  // ── Clear input when modal is closed ──
  modalEl?.addEventListener("hidden.bs.modal", () => {
    searchInput.value = "";
    performSearch("");
  });
}

/* ─── Animate main menu items on scroll (Intersection Observer) ─── */
function initScrollReveal() {
  const items = document.querySelectorAll(".menu-item");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.animationPlayState = "running";
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  items.forEach((el) => {
    // Pause the CSS animation initially; let observer trigger it
    el.style.animationPlayState = "paused";
    observer.observe(el);
  });
}

/* ─── Back to top button ─── */
function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTop");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    backToTopBtn.style.display = window.scrollY > 400 ? "flex" : "none";
  });

  backToTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ─── Single Init ─── */
document.addEventListener("DOMContentLoaded", () => {
  buildModal();
  initSearch();       // ← search runs after modal is built
  initScrollReveal();
  initBackToTop();
});

/* *** READ MORE... *** */
function toggleText() {
  const dots = document.getElementById("dots");
  const moreText = document.getElementById("more");
  const btn = document.getElementById("readMoreBtn");

  const isHidden = moreText.style.display === "none" || moreText.style.display === "";

  if (isHidden) {
    moreText.style.display = "inline";
    dots.style.display = "none";
    btn.innerText = "Read Less";
  } else {
    moreText.style.display = "none";
    dots.style.display = "inline";
    btn.innerText = "Read More...";
  }
}


/* ***DARK/LIGHT MODE*** */
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("light-dark-mode");
  if (!btn) return;

  // *** DEFAULT = DARK 
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
  }

  btn.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-mode");

    
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });
});

/* *** Account & login *** */

function signup() {
  const username = document.getElementById("signup-username");
  const password = document.getElementById("signup-password");
  const message = document.getElementById("message");

  if (!username || !password) return;

  if (!username.value || !password.value) {
    message.style.color = "red";
    message.innerText = "Fill all fields";
    return;
  }

  const user = {
    username: username.value,
    password: password.value,
  };

  localStorage.setItem("user", JSON.stringify(user));

  message.style.color = "green";
  message.innerText = "Account created!";
}

function login() {
  const username = document.getElementById("login-username");
  const password = document.getElementById("login-password");
  const message = document.getElementById("message");

  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (!savedUser) {
    message.style.color = "red";
    message.innerText = "No account found. Please sign up first.";
    return;
  }

  if (
    username.value === savedUser.username &&
    password.value === savedUser.password
  ) {
    message.style.color = "green";
    message.innerText = "Login successful!";
  } else {
    message.style.color = "red";
    message.innerText = "Wrong username or password";
  }
}

/* ✅ THIS MUST BE OUTSIDE login() */
function togglePassword(id) {
  const input = document.getElementById(id);
  if (!input) return;

  input.type = input.type === "password" ? "text" : "password";
}


/* ***Language Selection DropDown*** */
function setLang(lang) {
  const dict = translation[lang] || translation.EN;
  localStorage.setItem("lang", lang);

  // set <html lang> ****
  document.documentElement.setAttribute("lang", lang === "FR" ? "fr" : (lang === "IT" ? "it" : "en"));

  // text nodes ****
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] != null) el.innerHTML = dict[key];
  });

  // placeholders ****
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key] != null) el.setAttribute("placeholder", dict[key]);
  });

  /* hide dropdown after selection */
  document.getElementById("langMenu")?.classList.remove("show");

 
  const moreText = document.getElementById("more");
  const readBtn = document.getElementById("readMoreBtn");
  if (moreText && readBtn) {
    const expanded = moreText.style.display === "inline";
    readBtn.innerHTML = expanded ? (dict.read_less || "") : (dict.read_more || "");
  }
}

/* *** Toggle DropDown *** */
function toggleLangMenu() {
  document.getElementById("langMenu").classList.toggle("show");
}

/* *** Close when clicking outside *** */
document.addEventListener("click", function (e) {
  const menu = document.getElementById("langMenu");
  const button = document.querySelector(".lang-dropdown button");

  if (!menu.contains(e.target) && !button.contains(e.target)) {
    menu.classList.remove("show");
  }
});

/* *** Load saved language *** */
window.addEventListener("load", () => {
  setLang(localStorage.getItem("lang") || "EN");
});

/* *** Translation *** */
const translation = {
  EN: {
    nav_home: "Home",
    nav_menu: "Menu",
    nav_reservations: "Reservations",
    nav_contact: "Contact Us",
    reserve_table: "Reserve a Table",

    search_placeholder: "Search the menu...",
    search_btn: "Search",

    top_hours: "Tue-Sun   11am-11pm",

    hero_desc: "La Tavola Stretta is a small, modern Italian restaurant offering an intimate fine-dining experience.",
    happyhour_title: "5 - 7 Happy Hour!",
    happyhour_desc: "Join us from 5 - 7 PM for drinks and Italian bites in a cozy modern setting.",
    book_now: "Book Now",
    hero_tagline: "Where Every Seat Tells A Story",

    about_title: "About Us",
    about_text: "La Tavola Stretta is an intimate, modern Italian restaurant focused on authentic flavors and quality ingredients.\nLed by Chef Leonardo, we create a warm, elegant dining experience where every meal brings people together.",
story_title: "Our Story",
    story_p1: "La Tavola Stretta was born from a simple idea: bringing people closer together through authentic Italian food.\nAfter years of working in renowned kitchens across Italy, Chef Leonardo dreamed of opening a space that felt intimate, elegant, and true to his roots.",
story_more: "He brought together a small team of chefs he trusted—Maria, Angelo, and Donaldo—each sharing the same passion for tradition and quality.\nTogether, they created a restaurant where every detail matters.",
read_more: "Read More...",
    read_less: "Read Less",

    award_title: "Award Winning Dish",
    award_desc: "A tender, slow-cooked octopus tentacle, lightly grilled for a perfect char, served on a bed of creamy mashed potatoes, finished with lemon, olive oil, and fresh herbs. A refined, award-winning dish celebrating bold coastal Italian flavors.",

    menu_title: "Menu",
    featured_dishes: "— Featured Dishes —",
    tag_seafood: "Seafood",
    tag_signature: "Signature Dish",
    tag_chefs_pick: "Chef's Pick",
    view_full_menu: "View Full Menu",
    view_pdf: "View PDF",
    modal_full_menu_title: "La Tavola Stretta — Full Menu",
    modal_footer_note: "Ask your server about allergens & daily specials.",

    reservation_title: "Reservation",
    online_reservation: "Online Reservation",
    your_name: "Your Name",
    phone_number: "Phone Number",
    message: "Message",
    party_1: "1 Person",
    party_2: "2 People",
    party_3: "3 People",
    party_4: "4 People",
    party_5: "5 People",
    party_6: "6 People",
    party_7: "7 People",
    party_8: "8 People",
    party_9: "9 People",
    party_10: "10 People",
    book_a_table: "Book A Table",
    email_label: "Email:",
    phone_label: "Phone:",

    testimonial_title: "Valuable Testimonial",
    prev: "Previous",
    next: "Next",

    contact_kicker: "CONTACT US",
    contact_title: "Join us at the table",
    contact_intro: "Walk-ins are welcome when we can fit you in. Reservations are recommended on weekends.",
    address: "📍 Address",
    phone: "☎ Phone",
    email: "✉ Email",
    hours: "⏱ Hours",
    hours_tuesun: "Tue–Sun   11:00 AM–11:00 PM",
    mon_closed: "Mon     closed",

    create_account: "Create Account",
    username: "Username",
    password: "Password",
    sign_up: "Sign Up",
    login: "Login",

    footer_rights: "© 2026 La Tavola Stretta. All rights reserved.",
    chef_quote: "“Born and trained in Florence, Leonardo brings over 20 years of experience in refined Italian cuisine. His passion for authentic flavors and modern presentation led him to La Tavola Stretta, where he crafts a menu that blends tradition with innovation in an intimate dining experience.”",
    team_title: "The Team",
    job_head_chef: "Head Chef",
    job_chef: "Chef",
    staff_maria_desc: "Trained in Milan with years of fine-dining experience, Maria leads the kitchen with creativity and precision.",
    staff_angelo_desc: "Specializes in handmade pasta and brings a passion for tradition to every plate.",
    staff_donaldo_desc: "Specializes in fresh coastal dishes and adds a bold, vibrant touch to the team's creations.",
    featured_calamari_desc: "Lightly floured calamari rings served with spicy marinara and lemon wedges.",
    featured_salmon_desc: "Pan-seared Atlantic salmon with a lemon-caper butter sauce, served with seasonal roasted vegetables.",
    featured_cannoli_desc: "Crispy pastry shells filled with sweet ricotta and chocolate chips, finished with crushed pistachios.",
    testimonial_value: "Valuable",
    testimonial_word: "Testimonial",
  },

  FR: {
    nav_home: "Accueil",
    nav_menu: "Menu",
    nav_reservations: "Réservations",
    nav_contact: "Nous joindre",
    reserve_table: "Réserver une table",

    search_placeholder: "Rechercher dans le menu...",
    search_btn: "Rechercher",

    top_hours: "Mar–Dim   11 h–23 h",

    hero_desc: "La Tavola Stretta est un petit restaurant italien moderne offrant une expérience gastronomique intime.",
    happyhour_title: "5 à 7 – Happy Hour!",
    happyhour_desc: "Joignez-vous à nous de 17 h à 19 h pour des boissons et des bouchées italiennes dans une ambiance moderne et chaleureuse.",
    book_now: "Réserver",
    hero_tagline: "Chaque place raconte une histoire",

    about_title: "À propos",
    about_text: "La Tavola Stretta est un restaurant italien moderne et intime, axé sur des saveurs authentiques et des ingrédients de qualité.\nDirigé par le chef Leonardo, nous créons une expérience chaleureuse et élégante où chaque repas rassemble les gens.",

    story_title: "Notre histoire",
    story_p1: "La Tavola Stretta est née d’une idée simple : rapprocher les gens grâce à une cuisine italienne authentique.\nAprès des années dans des cuisines renommées à travers l’Italie, le chef Leonardo rêvait d’ouvrir un lieu intime, élégant et fidèle à ses racines.",
    story_more: "Il a réuni une petite équipe de chefs de confiance — Maria, Angelo et Donaldo — partageant la même passion pour la tradition et la qualité.\nEnsemble, ils ont créé un restaurant où chaque détail compte.",
    read_more: "Lire la suite...",
    read_less: "Réduire",

    award_title: "Plat Vedette",
    award_desc: "Une tentacule de pieuvre tendre, cuite lentement puis légèrement grillée, servie sur une purée onctueuse, relevée de citron, d’huile d’olive et d’herbes fraîches. Un plat raffiné et primé qui célèbre les saveurs côtières italiennes.",

    menu_title: "Menu",
    featured_dishes: "— Plats en vedette —",
    tag_seafood: "Fruits de mer",
    tag_signature: "Plat signature",
    tag_chefs_pick: "Coup de cœur du chef",
    view_full_menu: "Voir le menu complet",
    view_pdf: "Voir le PDF",
    modal_full_menu_title: "La Tavola Stretta — Menu complet",
    modal_footer_note: "Renseignez-vous auprès de votre serveur au sujet des allergènes et des plats du jour.",

    reservation_title: "Réservation",
    online_reservation: "Réservation en ligne",
    your_name: "Votre nom",
    phone_number: "Numéro de téléphone",
    message: "Message",
    party_1: "1 personne",
    party_2: "2 personnes",
    party_3: "3 personnes",
    party_4: "4 personnes",
    party_5: "5 personnes",
    party_6: "6 personnes",
    party_7: "7 personnes",
    party_8: "8 personnes",
    party_9: "9 personnes",
    party_10: "10 personnes",
    book_a_table: "Réserver une table",
    email_label: "Courriel :",
    phone_label: "Téléphone :",

    testimonial_title: "Témoignages",
    prev: "Précédent",
    next: "Suivant",

    contact_kicker: "NOUS JOINDRE",
    contact_title: "Joignez-vous à nous à table",
    contact_intro: "Les clients sans réservation sont les bienvenus selon la disponibilité. Les réservations sont recommandées la fin de semaine.",
    address: "📍 Adresse",
    phone: "☎ Téléphone",
    email: "✉ Courriel",
    hours: "⏱ Heures",
    hours_tuesun: "Mar–Dim   11 h–23 h",
    mon_closed: "Lun     fermé",

    create_account: "Créer un compte",
    username: "Nom d’utilisateur",
    password: "Mot de passe",
    sign_up: "S’inscrire",
    login: "Connexion",

    footer_rights: "© 2026 La Tavola Stretta. Tous droits réservés.",
    chef_quote: "« Né et formé à Florence, Leonardo apporte plus de 20 ans d’expérience en cuisine italienne raffinée. Sa passion pour les saveurs authentiques et la présentation moderne l’a mené à La Tavola Stretta, où il crée un menu qui marie tradition et innovation dans une expérience gastronomique intime. »",
    team_title: "L’équipe",
    team_text: "Notre équipe à La Tavola Stretta est composée de chefs passionnés, dédiés à une cuisine italienne authentique. Avec une expérience à travers toute l’Italie, ils apportent tradition, créativité et soin à chaque plat.",
    job_head_chef: "Chef principale",
    job_chef: "Chef",
    staff_maria_desc: "Formée à Milan et forte de nombreuses années en gastronomie, Maria dirige la cuisine avec créativité et précision.",
    staff_angelo_desc: "Spécialiste des pâtes faites maison, il apporte une passion pour la tradition à chaque assiette.",
    staff_donaldo_desc: "Spécialiste des plats côtiers, il ajoute une touche audacieuse et vibrante aux créations de l’équipe.",
    featured_calamari_desc: "Calmars légèrement farinés, servis avec une marinara épicée et du citron.",
    featured_salmon_desc: "Saumon de l’Atlantique poêlé, sauce citron-câpres, servi avec des légumes rôtis de saison.",
    featured_cannoli_desc: "Coques croustillantes garnies de ricotta sucrée et de pépites de chocolat, finies avec des pistaches concassées.",
    testimonial_value: "Magnifiques",
    testimonial_word: "témoignages",
    testi_text:"« Une expérience absolument incroyable. L’ambiance est intime et élégante, et chaque plat donnait l’impression d’un voyage en Italie. Les pâtes étaient incroyables — facilement l’un des meilleurs repas que j’ai eus depuis des années. »",
    testi_text2:"« La Tavola Stretta est un véritable joyau caché. La nourriture est authentique, magnifiquement présentée et pleine de saveurs. Le personnel nous a fait sentir comme en famille dès notre arrivée. »",
    testi_text3:"« Tout était parfait — du cadre moderne et chaleureux au menu dégustation inoubliable. On ressent vraiment la passion derrière chaque plat. Je reviendrai sans aucun doute. »",
  },

  IT: {
    nav_home: "Home",
    nav_menu: "Menù",
    nav_reservations: "Prenotazioni",
    nav_contact: "Contattaci",
    reserve_table: "Prenota un tavolo",

    search_placeholder: "Cerca nel menù...",
    search_btn: "Cerca",

    top_hours: "Mar–Dom   11:00–23:00",

    hero_desc: "La Tavola Stretta è un piccolo ristorante italiano moderno che offre un’esperienza di alta cucina intima.",
    happyhour_title: "Happy Hour dalle 17:00 alle 19:00!",
    happyhour_desc: "Unisciti a noi dalle 17:00 alle 19:00 per drink e stuzzichini italiani in un’atmosfera moderna e accogliente.",
    book_now: "Prenota ora",
    hero_tagline: "Ogni posto racconta una storia",

    about_title: "Chi siamo",
    about_text: "La Tavola Stretta è un ristorante italiano moderno e intimo, incentrato su sapori autentici e ingredienti di qualità.\nGuidati dallo Chef Leonardo, creiamo un’esperienza calda ed elegante in cui ogni pasto unisce le persone.",

    story_title: "La nostra storia",
    story_p1: "La Tavola Stretta nasce da un’idea semplice: avvicinare le persone attraverso l’autentica cucina italiana.\nDopo anni di lavoro in cucine rinomate in tutta Italia, lo Chef Leonardo sognava di aprire un luogo intimo, elegante e fedele alle sue radici.",
    story_more: "Ha riunito un piccolo team di chef di fiducia — Maria, Angelo e Donaldo — tutti con la stessa passione per tradizione e qualità.\nInsieme hanno creato un ristorante dove ogni dettaglio conta.",
    read_more: "Leggi di più...",
    read_less: "Mostra meno",

    award_title: "Piatto premiato",
    award_desc: "Un tentacolo di polpo tenero, cotto lentamente e leggermente grigliato, servito su una cremosa purea di patate, completato con limone, olio d’oliva ed erbe fresche. Un piatto raffinato e premiato che celebra i sapori costieri italiani.",

    menu_title: "Menù",
    featured_dishes: "— Piatti in evidenza —",
    tag_seafood: "Mare",
    tag_signature: "Piatto signature",
    tag_chefs_pick: "Scelta dello chef",
    view_full_menu: "Vedi menù completo",
    view_pdf: "Vedi PDF",
    modal_full_menu_title: "La Tavola Stretta — Menù completo",
    modal_footer_note: "Chiedi al personale informazioni su allergeni e piatti del giorno.",

    reservation_title: "Prenotazione",
    online_reservation: "Prenotazione online",
    your_name: "Il tuo nome",
    phone_number: "Numero di telefono",
    message: "Messaggio",
    party_1: "1 persona",
    party_2: "2 persone",
    party_3: "3 persone",
    party_4: "4 persone",
    party_5: "5 persone",
    party_6: "6 persone",
    party_7: "7 persone",
    party_8: "8 persone",
    party_9: "9 persone",
    party_10: "10 persone",
    book_a_table: "Prenota un tavolo",
    email_label: "Email:",
    phone_label: "Telefono:",

    testimonial_title: "Testimonianze",
    prev: "Precedente",
    next: "Successivo",

    contact_kicker: "CONTATTACI",
    contact_title: "Unisciti a noi a tavola",
    contact_intro: "Senza prenotazione siete i benvenuti in base alla disponibilità. Nel weekend la prenotazione è consigliata.",
    address: "📍 Indirizzo",
    phone: "☎ Telefono",
    email: "✉ Email",
    hours: "⏱ Orari",
    hours_tuesun: "Mar–Dom   11:00–23:00",
    mon_closed: "Lun     chiuso",

    create_account: "Crea account",
    username: "Nome utente",
    password: "Password",
    sign_up: "Registrati",
    login: "Accedi",

    footer_rights: "© 2026 La Tavola Stretta. Tutti i diritti riservati.",
    chef_quote: "« Nato e formato a Firenze, Leonardo porta oltre 20 anni di esperienza nella cucina italiana d’autore. La sua passione per i sapori autentici e la presentazione moderna lo ha portato a La Tavola Stretta, dove crea un menù che unisce tradizione e innovazione in un’esperienza di alta cucina intima. »",
    team_title: "Il team",
    team_text:"Il nostro team alla La Tavola Stretta è composto da chef appassionati dedicati alla cucina italiana autentica. Con esperienza in tutta Italia, portano tradizione, creatività e cura in ogni piatto.",
    job_head_chef: "Capo chef",
    job_chef: "Chef",
    staff_maria_desc: "Formata a Milano con anni di esperienza nell’alta cucina, Maria guida la cucina con creatività e precisione.",
    staff_angelo_desc: "Specializzato nella pasta fatta a mano, porta la passione per la tradizione in ogni piatto.",
    staff_donaldo_desc: "Specializzato in piatti di mare, aggiunge un tocco audace e vivace alle creazioni del team.",
    featured_calamari_desc: "Calamari leggermente infarinati, serviti con marinara piccante e limone.",
    featured_salmon_desc: "Salmone dell’Atlantico scottato, salsa al limone e capperi, con verdure di stagione arrosto.",
    featured_cannoli_desc: "Cannoli croccanti ripieni di ricotta dolce e gocce di cioccolato, con pistacchi tritati.",
    testimonial_value: "Bellissime",
    testimonial_word: "testimonianze",
    testi_text:"« Un’esperienza assolutamente incredibile. L’atmosfera è intima ed elegante e ogni piatto sembrava un viaggio in Italia. La pasta era incredibile — facilmente uno dei migliori pasti che abbia mangiato negli ultimi anni. »",
    testi_text2:"« La Tavola Stretta è una gemma nascosta. Il cibo è autentico, presentato in modo impeccabile e pieno di sapore. Il personale ci ha fatto sentire come in famiglia fin dal momento in cui siamo entrati. »",
    testi_text3:"« Tutto era perfetto — dall’ambiente moderno e accogliente al menu degustazione indimenticabile. Si sente davvero la passione dietro ogni piatto. Tornerò sicuramente. »",
  }
};
