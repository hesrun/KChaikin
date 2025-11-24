const splitWords = (selector) => {
    const el = document.querySelector(selector)
    const text = el.innerText.trim().split(/\s+/)

    el.innerHTML = text
        .map((word) => `<span class="word">${word}</span>`)
        .join(' ')
}
