/**
 * Theme switcher Web Component
 *
 * Set attribute 'hidden' to hide the theme switcher (sets display: none;)
 */
class ThemeSwitcher extends HTMLElement {
    constructor() {
        super();
        this.defaultTheme = "nord-light";
        this.activeTheme = this.defaultTheme;
    }

    connectedCallback() {
        const box = document.createElement("section");
        this.appendChild(box);

        const label = document.createElement("label");
        label.innerText = "Theme";
        box.appendChild(label);

        const themes = [
            ["nord-light", "Nord Light"],
            ["nord", "Nord"],
            ["cyber-renaissance", "Cyber Renaissance"],
            ["cyber-punk-ebook", "Cyber Punk Ebook"],
            ["kde", "KDE"],
            ["typewriter", "Typewriter"],
            ["old-school", "Old School"],
            ["redmond", "Redmond (Windows / Fluent UI)"],
            ["solarized", "Solarized"],
            ["solarized-light", "Solarized Light"],
        ];

        const select = document.createElement("select");
        select.onchange = () => {
            this.selectSetActiveTheme();
        };

        box.appendChild(select);
        themes.forEach((item) => {
            const option = document.createElement("option");
            option.value = item[0];
            option.innerText = item[1];
            select.appendChild(option);
        });
        select.value = this.activeTheme;
    }

    get activeTheme() {
        return localStorage.getItem("activeTheme") || this.defaultTheme;
    }

    /**
     * @param {string} theme
     */
    set activeTheme(theme) {
        console.log(`Setting active theme: ${theme}`);
        document.documentElement.setAttribute("data-theme", theme);
    }

    selectSetActiveTheme() {
        const value = this.querySelector("select").value;
        this.activeTheme = value;
        localStorage.setItem("activeTheme", value);
    }

    /**
     * TODO: Refactor switch case
     *
     * @param {string} name
     * @param {string} oldValue
     * @param {string} newValue
     */
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "hidden":
                //return this.getAttribute('hidden');
                this.style.display = "none";
        }
    }
}

window.customElements.define('theme-switcher', ThemeSwitcher)
