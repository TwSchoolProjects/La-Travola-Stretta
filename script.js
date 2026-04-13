/* ***Language Selection DropDown*** */
function setLang(lang) {
localStorage.setItem("lang", lang);
document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = translation[lang][key] || "";
});
document.getElementById("langMenu").classList.add("hidden");
}

/* *** Toggle DropDown *** */
function toggleLangMenu() {
    document.getElementById("langMenu").classList.toggle("hidden");
}


/* *** Load saved language *** */
window.addEventListener("load", () => {
    setLang(localStorage.getItem("lang") || "en");
});


/* *** Translation *** */
const translation = {
    en: {

    },

    fr: {

    },

    it: {

    }
};