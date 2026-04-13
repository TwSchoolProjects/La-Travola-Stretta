/* ============================================================
   La Tavola Stretta
   FE-GR4-Restaurant Website Project
   style.css
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
        img: ""
      },
      {
        name: "Calamari Fritti",
        desc: "Lightly floured squid rings served with a spicy marinara dipping sauce and lemon wedges.", 
        price: "$19.00", 
        tags: ["Seafood"],
        img: ""
      },
      {
        name: "Arancini di Sicilia",
        desc: "Crispy saffron rice balls stuffed with mozzarella and peas, served over a bed of pomodoro sauce.", 
        price: "$15.00",
        tags: ["Vegetarian"],
        img: ""
      },
      {
        name: "Burrata & Prosciutto",
        desc: "Creamy Burrata cheese paired with 24-month aged Prosciutto di Parma and a balsamic reduction.", 
        price: "$22.00", 
        tags: ["Gluten-Free"],
        img: ""
      }
    ]
  },
  {
    category: "Secondi/Main Dishes",
    items: [
      {
        name: "Tagliatelle alla Bolognese",
        desc: "Fresh egg pasta tossed in a slow-cooked beef and pork ragù with Parmigiano-Reggiano.", 
        price: "$26.00", 
        tags: ["Classic", "Pasta"],
        img: ""
      },
      {
        name: "Gnocchi al Pomodoro e Burrata",
        desc: "Hand-made potato gnocchi in a light tomato-basil sauce, topped with fresh burrata.", 
        price: "$24.00", 
        tags: ["Vegetarian", "Pasta"],
        img: ""
      },
      {
        name: "Pollo alla Parmigiana",
        desc: "Breaded chicken breast topped with melted mozzarella and tomato sauce, served with a side of spaghetti.", 
        price: "$32.00", 
        tags: ["Classic"],
        img: ""
      },
      {
        name: "Salmone al Limone",
        desc: "Pan-seared Atlantic salmon with a lemon-caper butter sauce, served with seasonal roasted vegetables.", 
        price: "$36.00", 
        tags: ["Seafood", "Gluten-Free"],
        img: ""
      },
      {
        name: "Guancia di Manzo",
        desc: "12-hour slow-braised beef cheek in a rich Barolo wine reduction, served over hand-cut golden egg pasta.", 
        price: "$38.00", 
        tags: ["Signature"],
        img: ""
      }
    ]
  },
  {
    category: "Dolci/Desserts",
    items: [
      {
        name: "Classic Tiramisu",
        desc: "Ladyfingers soaked in espresso and Marsala, layered with whipped mascarpone and cocoa powder.", 
        price: "$13.00", 
        tags: ["Vegetarian"],
        img: ""
      },
      {
        name: "Panna Cotta ai Frutti di Bosco",
        desc: "Velvety vanilla bean custard topped with a wild berry compote.", 
        price: "$11.50", 
        tags: ["Vegetarian", "Gluten-Free"],
        img: ""
      },
      {
        name: "Sicilian Cannoli",
        desc: "Crispy pastry shells filled with sweet ricotta and chocolate chips, finished with crushed pistachios.", 
        price: "$10.00", 
        tags: ["Vegetarian", "Contains Nuts"],
        img: ""
      }
    ]
  },
  {
    category: "Bevande/Drinks",
    items: [
      {
        name: "San Pellegrino Sparkling Water",
        desc: "750ml bottle of sparkling mineral water.", 
        price: "$7.50", 
        tags: ["Non-Alcoholic"],
        img: ""
      },
      {
        name: "Glass of Chianti Classico",
        desc: "6oz pour of Italian red wine.", 
        price: "$14.00", 
        tags: ["Alcoholic"],
        img: ""
      },
      {
        name: "Aperol Spritz",
        desc: "Classic Italian wine-based cocktail.", 
        price: "$16.00", 
        tags: ["Alcoholic"],
        img: ""
      },
      {
        name: "Espresso / Cappuccino",
        desc: "Authentic Italian coffee options.", 
        price: "$4.00 / $5.50", 
        tags: ["Caffeine"],
        img: ""
      }
    ]
  }
];

/* ─── Build the modal HTML ─── */
function buildModal() {
  const modalBody = document.getElementById("modalBody");
  if (!modalBody) return;

  let html = "";

  FULL_MENU.forEach(section => {
    html += `<div class="modal-category">${section.category}</div>`;

    section.items.forEach(item => {
      const tagsHtml = item.tags
        .map(t => `<span class="modal-tag">${t}</span>`)
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

/* ─── Animate main menu items on scroll (Intersection Observer) ─── */
function initScrollReveal() {
  const items = document.querySelectorAll(".menu-item");
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.animationPlayState = "running";
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach(el => {
    // Pause the CSS animation initially; let observer trigger it
    el.style.animationPlayState = "paused";
    observer.observe(el);
  });
}

/* ─── Reset modal scroll position when opened ─── */
function initModalScrollReset() {
  const modal = document.getElementById("fullMenuModal");
  if (!modal) return;
  modal.addEventListener("show.bs.modal", () => {
    const body = modal.querySelector(".modal-body");
    if (body) body.scrollTop = 0;
  });
}

/* ─── Init ─── */
document.addEventListener("DOMContentLoaded", () => {
  buildModal();
  initScrollReveal();
  initModalScrollReset();
});

document.addEventListener("DOMContentLoaded", function () {
    const backToTopBtn = document.getElementById("backToTop");

    // Show or hide the button based on scroll position
    window.addEventListener("scroll", function () {
        if (window.scrollY > 400) {
            backToTopBtn.style.display = "flex";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    // Smoothly scroll to the top when clicked
    backToTopBtn.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});