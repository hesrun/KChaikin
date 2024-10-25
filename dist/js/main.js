"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var headerHeight = $('.header').height();
var screenSize = window.innerWidth;
var md = 768;
var sm = 576;
var currentSlide = 0;

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
  autoplay: {
    delay: 15000
  },
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
$().fancybox({
  selector: '[data-fancybox="gallery"]',
  hideScrollbar: false,
  thumbs: false,
  beforeClose: function beforeClose(instance) {
    console.info(instance.currIndex);
    photoCarusel.slideTo(instance.currIndex, 0);
  }
});
var photoSlider = new Swiper('.photo-slider', {
  slidesPerView: 'auto',
  spaceBetween: 15,
  pagination: {
    el: '.photo-carusel-nav__pagination',
    clickable: true
  },
  navigation: {
    prevEl: '.photo-carusel-nav__prev',
    nextEl: '.photo-carusel-nav__next'
  },
  breakpoints: {
    768: _defineProperty({
      slidesPerView: 1,
      spaceBetween: 0
    }, "spaceBetween", 30)
  }
});
var dateCarusel = new Swiper('.date-list', {
  slidesPerView: 'auto',
  freeMode: true,
  spaceBetween: 0,
  mousewheel: true
});
var inventSlider = new Swiper('.invent-modal-slider', {
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  pagination: {
    el: '.photo-carusel-nav__pagination',
    clickable: true
  },
  navigation: {
    prevEl: '.photo-carusel-nav__prev',
    nextEl: '.photo-carusel-nav__next'
  }
});
$(document).on('click', '.date-list .swiper-slide', function (e) {
  e.preventDefault();
  $('.date-list__item').removeClass('date-list__item_active');
  $(this).find('.date-list__item').addClass('date-list__item_active');
  var year = $(this).attr('cont');
  $.get('', {
    year: year
  }, function (data) {
    $('.manuf-history, .expand-history').fadeOut('normal', function () {
      $('.manuf-history, .expand-history').remove();
      $(data).insertAfter('.date-list');
    });
  });

  if ($(this).index() > currentSlide) {
    dateCarusel.slideTo($(this).index(), 300);
    currentSlide = $(this).index();
  } else {
    dateCarusel.slideTo($(this).index() - 1, 300);
    currentSlide = $(this).index();
  }
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
$('.main-nav__link_has-sub').click(function () {
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
    $('.navigation__head').prepend($('#searchForm'));
  } else {
    $('.header__search').prepend($('#searchForm'));
  }

  if (screenSize < sm) {
    $('.productRequest').click(function () {
      $('#productRequestModal').modal({
        fadeDuration: 300
      });
    });
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
$(document).on('click', '.expand-series-text', function () {
  $('.series-text__collapse').toggleClass('series-text__collapse_full');

  if ($('.series-text__collapse').hasClass('series-text__collapse_full')) {
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
$(document).on('click', '.requestVacancy', function (e) {
  $('#vacancyModal').find('#VACANCY').val($(this).attr('val'));
  $('#vacancyModal').modal({
    fadeDuration: 300
  });
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
$('#formSuccessModal').modal({
  fadeDuration: 300
});
$('.media-card').click(function () {
  $('#inventModal').modal({
    fadeDuration: 300
  });
});
$('#codeModal').modal({});
$('.с-select select').select2({
  width: 'style',
  minimumResultsForSearch: Infinity,
  dropdownParent: $('.с-select')
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
    initialCountry: 'RU',
    strictMode: true,
    utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/23.0.10/js/utils.min.js'
  });
}