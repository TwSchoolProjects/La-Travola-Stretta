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
        price: "$26.00",
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
        img: "./Images/SanPellegrino.jpg",
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

/* ***Language Selection DropDown*** */
function setLang(lang) {
  localStorage.setItem("lang", lang);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = translation[lang][key] || "";
  });

  /* hide dropdown after selection */
  document.getElementById("langMenu").classList.remove("show");
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
  setLang(localStorage.getItem("lang") || "en");
});

/* *** Translation *** */
const translation = {
  en: {},

  fr: {},

  it: {},
};





