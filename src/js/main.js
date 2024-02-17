let headerHeight = $('.header').height()
let screenSize = window.innerWidth
let md = 768

window.addEventListener('resize', function () {
    screenSize = window.innerWidth
    checkMediaQuery()
})

const swiper = new Swiper('.swiper', {
    loop: true,
    effect: 'fade',
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.hero-prev',
        prevEl: '.hero-next',
    },
})

$(window).scroll(function () {
    if ($(window).scrollTop() >= headerHeight) {
        $('.header').addClass('header_scrolled')
    } else {
        $('.header').removeClass('header_scrolled')
    }
})

$('.header-burger').click(function () {
    $(this).toggleClass('header-burger_active')
    $('body').toggleClass('lock')
    $('.header').toggleClass('header_open')
    $('#menu').fadeToggle(200)
    if (!$(this).hasClass('header-burger_active')) {
        $('.header-burger__text').text('меню')
    } else {
        $('.header-burger__text').text('закрыть')
    }
})

$('.navigation__title').click(function () {
    if (screenSize < md) {
        $(this).next().slideToggle()
    }
})
$(document).click(function (e) {
    let search = $('#searchForm')
    let btn = $('#searchOpen')
    if (btn.has(e.target).length === 1 && screenSize > md) {
        search.fadeIn(300)
    }
    if (
        search.has(e.target).length === 0 &&
        btn.has(e.target).length === 0 &&
        screenSize > md
    ) {
        search.fadeOut(300)
    }
})

$('.header__search-input').on('change paste keyup', function () {
    let inpLenth = $(this).val().length
    if (inpLenth >= 1) {
        $('.header__search-drop').fadeIn(200)
    } else {
        $('.header__search-drop').fadeOut(200)
    }
})

function checkMediaQuery() {
    if (screenSize < md) {
        $('#menu .container').prepend($('#searchForm'))
    } else {
        $('.header__search').prepend($('#searchForm'))
    }
}
checkMediaQuery()
