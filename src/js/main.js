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
    navigation: {
        nextEl: '.hero-prev',
        prevEl: '.hero-next',
    },
})

$('.header-burger').click(function () {
    $(this).toggleClass('header-burger_active')
    $('body').toggleClass('lock')
    $('.header').toggleClass('header_open')
    $('#menu').fadeToggle(200)
    $('#searchForm').hide()
    if (!$(this).hasClass('header-burger_active')) {
        $('.header-burger__text').text('меню')
    } else {
        $('.header-burger__text').text('закрыть')
    }
})

$('#searchOpen').click(function () {
    $('#searchForm').fadeIn(300)
})

function checkMediaQuery() {
    // If the inner width of the window is greater then 768px
    if (window.innerWidth < 768) {
        $('.navigation__title').click(function () {
            $(this).next().slideToggle()
        })
        $('#menu .container').prepend($('#searchForm'))
    } else {
        $('.header__search').prepend($('#searchForm'))
    }
}

checkMediaQuery()
