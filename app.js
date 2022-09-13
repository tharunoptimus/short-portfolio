const LOCALSTORAGE_THEME = "theme"


function toggleTheme() {
    let emoji = getComputedStyle(toggle, ':before').getPropertyValue('content')
    let theme = emoji == '"🌞"' ? "light" : "dark"
    setTheme(theme)
}

function main() {
    let prefers = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    let theme = window.localStorage.getItem(LOCALSTORAGE_THEME) ?? prefers
    setTheme(theme)
}

function setTheme(theme) {
    if(theme == "dark") {
        document.documentElement.classList.add("darkTheme")
    } else {
        document.documentElement.classList.remove("darkTheme")
    }
    window.localStorage.setItem(LOCALSTORAGE_THEME, theme)
}

main()

let toggle = document.querySelector(".toggle")
toggle.addEventListener("click" , toggleTheme)