let headerHeight = $('.header').height()

$(window).scroll(function () {
    if ($(window).scrollTop() >= headerHeight) {
        $('.header').addClass('header_scrolled')
    } else {
        $('.header').removeClass('header_scrolled')
    }
})

const swiper = new Swiper('.swiper', {
    loop: true,
    effect: 'fade',
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
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
