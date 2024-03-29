"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var headerHeight = $('.header').height();
var screenSize = window.innerWidth;
var md = 768;

var getScrollbarWidth = function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
};

$('body').css({
  '--sw': getScrollbarWidth() + 'px'
});
window.addEventListener('resize', function () {
  screenSize = window.innerWidth;
  checkMediaQuery();
});
var heroSlider = new Swiper('.hero-slider', {
  loop: true,
  speed: 1000,
  effect: 'creative',
  creativeEffect: {
    prev: {
      opacity: 0,
      rotate: [0, 0, -5]
    },
    next: {
      opacity: 0,
      scale: 1.2,
      rotate: [0, 0, 5]
    }
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  navigation: {
    prevEl: '.hero-prev',
    nextEl: '.hero-next'
  }
});
var photoCarusel = new Swiper('.photo-carusel', {
  slidesPerView: 'auto',
  spaceBetween: 10,
  pagination: {
    el: '.photo-carusel-nav__pagination',
    clickable: true
  },
  navigation: {
    prevEl: '.photo-carusel-nav__prev',
    nextEl: '.photo-carusel-nav__next'
  },
  breakpoints: {
    768: {
      slidesPerView: 3,
      spaceBetween: 20
    }
  }
});
var photoSlider = new Swiper('.photo-slider', {
  slidesPerView: 'auto',
  spaceBetween: 10,
  pagination: {
    el: '.photo-carusel-nav__pagination',
    clickable: true
  },
  navigation: {
    prevEl: '.photo-carusel-nav__prev',
    nextEl: '.photo-carusel-nav__next'
  },
  breakpoints: {
    768: {
      slidesPerView: 1,
      spaceBetween: 0
    }
  }
});
var dateCarusel = new Swiper('.date-list', {
  slidesPerView: 'auto',
  freeMode: true,
  spaceBetween: 0,
  mousewheel: true
});
var storesCarusel = new Swiper('.stores-carusel', {
  slidesPerView: 'auto',
  spaceBetween: 20,
  pagination: {
    el: '.photo-carusel-nav__pagination',
    clickable: true
  },
  navigation: {
    prevEl: '.photo-carusel-nav__prev',
    nextEl: '.photo-carusel-nav__next'
  },
  breakpoints: {
    768: {
      slidesPerView: 2
    }
  }
});
$(window).scroll(function () {
  if ($(window).scrollTop() >= headerHeight) {
    $('.header').addClass('header_scrolled');
  } else {
    $('.header').removeClass('header_scrolled');
  }
});
$('.header-burger').click(function () {
  $(this).toggleClass('header-burger_active');
  $('body').toggleClass('lock');
  $('.header').toggleClass('header_open');
  $('#menu').fadeToggle(200);

  if (!$(this).hasClass('header-burger_active')) {
    $('.header-burger__text').text('меню');
  } else {
    $('.header-burger__text').text('закрыть');
  }
});
$('.language-select__current').click(function () {
  $('.language-select__drop').slideToggle(200);
});
$('.navigation__title').click(function () {
  if (screenSize < md) {
    $(this).next().slideToggle();
    return false;
  }
});
$(document).click(function (e) {
  var search = $('#searchForm');
  var btn = $('#searchOpen');

  if (btn.has(e.target).length === 1 && screenSize > md) {
    search.fadeIn(300);
  }

  if (search.has(e.target).length === 0 && btn.has(e.target).length === 0 && screenSize > md) {
    search.fadeOut(300);
  }
});
$('.header__search-input').on('paste keyup', function () {
  var inpLenth = $(this).val().length;

  if (inpLenth >= 1) {
    $('.header__search-drop').fadeIn(200);
  } else {
    $('.header__search-drop').fadeOut(200);
  }
});

function checkMediaQuery() {
  if (screenSize < md) {
    $('#menu .container').prepend($('#searchForm'));
  } else {
    $('.header__search').prepend($('#searchForm'));
  }
}

checkMediaQuery();
$('.text-reveal-anim').each(function () {
  var textContainer = $(this);
  var text = textContainer.text().trim();
  var words = text.split(/\s+/);
  textContainer.empty();
  words.forEach(function (word) {
    var span = $('<span/>').text(word);
    textContainer.append(span).append(' ');
  });
  gsap.registerPlugin(ScrollTrigger);
  gsap.to('.text-reveal-anim span', {
    duration: 0.3,
    opacity: 1,
    ease: 'none',
    stagger: 0.1,
    scrollTrigger: {
      trigger: textContainer,
      //markers: true,
      start: 'top 100%',
      end: 'bottom 70%',
      scrub: true
    }
  });
});
$('.expand-vacation').click(function () {
  var btn = $(this);
  var vacancyContent = btn.closest('.vacancy-item').find('.vacancy-item__full');

  if (vacancyContent.is(':visible')) {
    btn.html("\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435 <i class=\"icon icon-arrow-down\"></i>");
  } else {
    btn.html("\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C <i class=\"icon icon-arrow-down\" style=\"transform: rotateX(180deg)\"></i>");
  }

  vacancyContent.slideToggle(300);
  return false;
});
$(document).on('click', '.expand-history', function () {
  $('.manuf-history').toggleClass('manuf-history_all');

  if ($('.manuf-history').hasClass('manuf-history_all')) {
    $(this).html("\u0421\u043A\u0440\u044B\u0442\u044C <i class=\"icon icon-arrow-down\" style=\"transform: rotateX(180deg)\"></i>");
  } else {
    $(this).html("\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0435\u0449\u0451 <i class=\"icon icon-arrow-down\" ></i>");
  }
});
$('.faq-accordion__title').click(function () {
  $(this).toggleClass('faq-accordion__title_active');
  $(this).next().slideToggle(300);
});
$('.sorting__btn').click(function () {
  $('.sorting__drop').fadeToggle(200);
});
$('.sorting__option').click(function () {
  var optionText = $(this).find('.sorting__value').text().trim();
  $('.sorting__current').text(optionText);
  $('.sorting__drop').fadeOut(200);
});
$(document).click(function (e) {
  var sortDrop = $('.sorting__drop');
});
$('#addCart').click(function () {
  $('#cart').modal({
    fadeDuration: 300,
    showClose: false
  });
});
$('#showParams').click(function () {
  $('#techModal').modal({
    fadeDuration: 300
  });
});
$('.requestVacancy').click(function () {
  $('#vacancyModal').modal({
    fadeDuration: 300
  });
  return false;
});
$('.queueModalOpen').click(function () {
  $('#queueModal').modal({
    fadeDuration: 300
  });
  return false;
});
$('.feedBackModalOpen').click(function () {
  $('#feedBackModal').modal({
    fadeDuration: 300
  });
  return false;
});
$('.feedBackModalOpen').click(function () {
  $('#feedBackModal').modal({
    fadeDuration: 300
  });
  return false;
});
$('.openVideoModal').click(function () {
  $('#videoModal').modal({
    fadeDuration: 300
  });
  return false;
});
$('.с-select select').select2({
  width: 'style',
  minimumResultsForSearch: Infinity
}).on('select2:select', function (e) {
  $(e.target).parent('.с-select').find('.с-select__label').addClass('с-select__label_choised');
});
$("input[name='payment']").change(function () {
  $('#card').is(':checked') ? $('.checkout__pay-card-form').slideDown() : $('.checkout__pay-card-form').slideUp();
});
$('.order-item__title').click(function () {
  $(this).next().slideToggle();
});
var phoneInput = document.querySelector('#phone');

if (phoneInput) {
  window.intlTelInput(phoneInput, {
    initialCountry: 'RU'
  });
} //yamap


initMap();

function initMap() {
  return _initMap.apply(this, arguments);
}

function _initMap() {
  _initMap = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var _ymaps, YMap, YMapDefaultSchemeLayer, map;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return ymaps3.ready;

          case 2:
            _ymaps = ymaps3, YMap = _ymaps.YMap, YMapDefaultSchemeLayer = _ymaps.YMapDefaultSchemeLayer; // Иницилиазируем карту

            map = new YMap( // Передаём ссылку на HTMLElement контейнера
            document.getElementById('yaMap'), // Передаём параметры инициализации карты
            {
              location: {
                // Координаты центра карты
                center: [37.588144, 55.733842],
                // Уровень масштабирования
                zoom: 10
              }
            }); // Добавляем слой для отображения схематической карты

            map.addChild(new YMapDefaultSchemeLayer());

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _initMap.apply(this, arguments);
}