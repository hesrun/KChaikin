const splitWords = (selector) => {
    const elements = document.querySelectorAll(selector)

    elements.forEach((el) => {
        let html = el.innerHTML.trim()
        html = html.replace(/<br\s*\/?>/gi, '[[BR]]')
        const parts = html.split(/\s+/)
        el.innerHTML = parts
            .map((part) => {
                if (part === '[[BR]]') {
                    return '<br>' // ставим бр обратно
                }
                return `<span class="word">${part}</span>`
            })
            .join(' ')
    })
}

/* -------------------------------------------------------------------------- */
/*                            initParallaxMouseMove                           */
/* -------------------------------------------------------------------------- */

function initParallaxMouseMove() {
    let mouseX = 0
    let mouseY = 0

    window.addEventListener('mousemove', function (e) {
        console.log(window.innerWidth, window.innerHeight)

        const centerX = window.innerWidth / 2
        const centerY = window.innerHeight / 2

        mouseX = e.clientX - centerX
        mouseY = e.clientY - centerY
    })

    const paralaxElements = document.querySelectorAll('.move-paralax')

    paralaxElements.forEach(function (block) {
        let currentX = 0
        let currentY = 0

        function animate() {
            const ease = 0.05
            currentX += (mouseX - currentX) * ease
            currentY += (mouseY - currentY) * ease

            block.style.setProperty('--mouse-x', `${currentX}px`)
            block.style.setProperty('--mouse-y', `${currentY}px`)

            requestAnimationFrame(animate)
        }

        animate()
    })
}

initParallaxMouseMove()
