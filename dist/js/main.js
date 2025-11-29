"use strict";

var splitWords = function splitWords(selector) {
  var elements = document.querySelectorAll(selector);
  elements.forEach(function (el) {
    var html = el.innerHTML.trim();
    html = html.replace(/<br\s*\/?>/gi, '[[BR]]');
    var parts = html.split(/\s+/);
    el.innerHTML = parts.map(function (part) {
      if (part === '[[BR]]') {
        return '<br>'; // ставим бр обратно
      }

      return "<span class=\"word\">".concat(part, "</span>");
    }).join(' ');
  });
};
/* -------------------------------------------------------------------------- */

/*                            initParallaxMouseMove                           */

/* -------------------------------------------------------------------------- */


function initParallaxMouseMove() {
  var mouseX = 0;
  var mouseY = 0;
  window.addEventListener('mousemove', function (e) {
    console.log(window.innerWidth, window.innerHeight);
    var centerX = window.innerWidth / 2;
    var centerY = window.innerHeight / 2;
    mouseX = e.clientX - centerX;
    mouseY = e.clientY - centerY;
  });
  var paralaxElements = document.querySelectorAll('.move-paralax');
  paralaxElements.forEach(function (block) {
    var currentX = 0;
    var currentY = 0;

    function animate() {
      var ease = 0.05;
      currentX += (mouseX - currentX) * ease;
      currentY += (mouseY - currentY) * ease;
      block.style.setProperty('--mouse-x', "".concat(currentX, "px"));
      block.style.setProperty('--mouse-y', "".concat(currentY, "px"));
      requestAnimationFrame(animate);
    }

    animate();
  });
}

initParallaxMouseMove();
var headerHeight = $('.header').height();
var screenSize = window.innerWidth;
var md = 768;
var sm = 576;
var lg = 992;
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
}); // const heroSlider = new Swiper('.hero-slider', {
//     loop: true,
//     speed: 1000,
//     effect: 'creative',
//     autoplay: {
//         delay: 15000,
//     },
//     creativeEffect: {
//         prev: {
//             opacity: 0,
//             rotate: [0, 0, -5],
//         },
//         next: {
//             opacity: 0,
//             scale: 1.2,
//             rotate: [0, 0, 5],
//         },
//     },
//     pagination: {
//         el: '.swiper-pagination',
//         clickable: true,
//     },
//     navigation: {
//         prevEl: '.hero-prev',
//         nextEl: '.hero-next',
//     },
// })

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
$().fancybox({
  selector: '[data-fancybox="gum"]'
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
    0: {
      enabled: false
    },
    769: {
      enabled: true,
      slidesPerView: 'auto',
      spaceBetween: 30
    }
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
var newItemsSwiper = new Swiper('.new-items-list', {
  spaceBetween: 0,
  centeredSlides: true,
  slidesPerView: 'auto',
  breakpoints: {
    768: {
      centeredSlides: false,
      slidesPerView: 4,
      spaceBetween: 30
    }
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

  if (screenSize > md) {
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
  }
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
$('#formSuccessModal').modal({
  fadeDuration: 300
});
$('.media-card').click(function () {
  $('#inventModal').modal({
    fadeDuration: 300
  });
});
$('#codeModal').modal();
$('.toJoinClub').click(function () {
  var modalName = $(this).attr('attr-modal');
  $("#".concat(modalName)).modal({
    fadeDuration: 300
  });
});
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
/* ----------------------------- hero animation ----------------------------- */


function heroBannerAnimation() {
  var heroElements = $('.hero-banner__info > *');
  var heroImage = $('.hero-banner__image');
  gsap.registerPlugin(ScrollTrigger);

  if (screenSize > md) {
    var tl = gsap.timeline();
    tl.from(heroElements, {
      x: -200,
      duration: 0.5,
      opacity: 0,
      stagger: 0.1
    }).from(heroImage, {
      x: 200,
      duration: 0.5,
      opacity: 0,
      delay: -0.3
    });
  }
}

heroBannerAnimation();
/* ----------------------------- restimons fade ----------------------------- */

function slideRestimons() {
  var images = $('.restimons-builder__image img');
  var animationDuration = 1000;
  var delay = 1500;
  var currentIndex = 0;
  var previousIndex = images.length - 1;

  function showNextImage() {
    images.removeClass('active previous');
    $(images[currentIndex]).addClass('active');
    $(images[previousIndex]).addClass('previous');
    previousIndex = currentIndex;
    currentIndex = (currentIndex + 1) % images.length;
    setTimeout(function () {
      $(images[previousIndex]).removeClass('previous');
    }, animationDuration);
  }

  setInterval(showNextImage, delay);
}

slideRestimons();
/* ----------------------------- restimons parallax ----------------------------- */

function restimonsParallax() {
  var info = $('.restimons-builder__info > *').not('.restimons-builder__image');
  var image = $('.restimons-builder__image');
  var blockH = $('.restimons-builder').height();
  var block = $('.restimons-builder');
  console.log(blockH);
  gsap.registerPlugin(ScrollTrigger);

  if (screenSize > md) {
    gsap.from(image, {
      y: -blockH,
      duration: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: block,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: true //markers: true,

      }
    });
    gsap.from(info, {
      x: -100,
      opacity: 0,
      duration: 0.3,
      stagger: 0.2,
      scrollTrigger: {
        trigger: block,
        start: 'top center',
        end: 'bottom bottom' //scrub: true,
        //markers: true,

      }
    });
  }
}

restimonsParallax();
/* ----------------------------- parallax mozaik ---------------------------- */

function initParallaxMozaik() {
  $('.chaykin-mozaik-section').mousemove(function (event) {
    var _$$0$getBoundingClien = $('.chaykin-mozaik-section')[0].getBoundingClientRect(),
        left = _$$0$getBoundingClien.left,
        top = _$$0$getBoundingClien.top;

    var scrollX = window.scrollX || document.documentElement.scrollLeft;
    var scrollY = window.scrollY || document.documentElement.scrollTop;
    var x = event.pageX - (left + scrollX);
    var y = event.pageY - (top + scrollY);
    gsap.to('.chaykin-mozaik__image', {
      '--x': "".concat(x, "px"),
      '--y': "".concat(y, "px"),
      duration: 1,
      ease: 'power1.out'
    });
  });
}

initParallaxMozaik();
/* ------------------------------- MenuCursor ------------------------------- */
// function initMenuCursor() {
//     const navBlock = $('.index-nav')
//     const follower = $('.index-nav-cursor')
//     let mouseX = 0,
//         mouseY = 0
//     let posX = 0,
//         posY = 0
//     $(document).on('mousemove', function (e) {
//         const scrollX = window.scrollX || document.documentElement.scrollLeft
//         const scrollY = window.scrollY || document.documentElement.scrollTop
//         mouseX = e.pageX - scrollX
//         mouseY = e.pageY - scrollY
//     })
//     $('.index-nav').on('mouseenter', function () {
//         follower.addClass('active')
//     })
//     $('.index-nav').on('mouseleave', function () {
//         follower.removeClass('active')
//     })
//     $('.index-nav__item').on('mouseenter', function () {
//         const index = $(this).index()
//         $('.index-nav-cursor img').removeClass('active')
//         $('.index-nav-cursor img').eq(index).addClass('active')
//     })
//     $(window).scroll(function () {
//         $('.index-nav__item').on('mouseenter', function () {
//             const index = $(this).index()
//             $('.index-nav-cursor img').removeClass('active')
//             $('.index-nav-cursor img').eq(index).addClass('active')
//         })
//     })
//     // Бесконечный цикл анимации
//     gsap.to(
//         {},
//         {
//             duration: 0.016, // ~60 FPS
//             repeat: -1,
//             onRepeat: function () {
//                 // Плавное следование хвоста
//                 posX += (mouseX - posX) / 9
//                 posY += (mouseY - posY) / 9
//                 // Обновление позиции хвоста
//                 gsap.set(follower, {
//                     '--x': `${posX}px`,
//                     '--y': `${posY}px`,
//                 })
//             },
//         }
//     )
// }
// initMenuCursor()

/* -------------------------------- new items ------------------------------- */

function initNewItemsAnimation() {
  var items = $('.new-items-list__item');
  var block = $('.new-items-section');
  var title = $('.new-items-section .full-title__image');
  gsap.registerPlugin(ScrollTrigger);

  if (screenSize > md) {
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: block,
        start: 'top bottom',
        end: '80% 80%',
        scrub: true //markers: true,

      }
    });
    tl.from(title, {
      y: 600,
      duration: 0.5
    }).from(items, {
      y: 300,
      duration: 0.5,
      opacity: 0,
      stagger: 0.05,
      ease: 'power2.out'
    });
  }
}

initNewItemsAnimation();

function openPreview() {
  var section = $('.new-items-section');
  var modal = $('.new-items-preview');
  var lastClickX = 0;
  var lastClickY = 0;
  $('.new-items-list__item').on('click', function (e) {
    if (screenSize > lg) {
      e.preventDefault();
      $('.new-items-preview__item').hide();
      $('.new-items-preview__item').eq($(this).index()).show();
      var sectionOffset = section.offset();
      lastClickX = e.pageX - sectionOffset.left;
      lastClickY = e.pageY - sectionOffset.top;
      modal.css('visibility', 'visible');
      gsap.fromTo(modal, {
        clipPath: "circle(0 at ".concat(lastClickX, "px ").concat(lastClickY, "px)"),
        ease: 'none',
        duration: 1
      }, {
        clipPath: "circle(150% at ".concat(lastClickX, "px ").concat(lastClickY, "px)"),
        ease: 'none',
        duration: 1
      });
    }
  });
  $('.new-items-preview__close').on('click', function () {
    console.log(lastClickX, lastClickY);
    gsap.fromTo(modal, {
      clipPath: "circle(150% at ".concat(lastClickX, "px ").concat(lastClickY, "px)"),
      ease: 'none',
      duration: 1
    }, {
      clipPath: "circle(0% at ".concat(lastClickX, "px ").concat(lastClickY, "px)"),
      ease: 'none',
      duration: 1
    });
  });
}

openPreview();
/* ---------------------------- master parallax --------------------------- */

function masterParallax() {
  var block = $('.master-parallax');
  var image = $('.master-parallax__image');
  var title = $('.master-parallax .full-title');
  var titleImg = $('.master-parallax .full-title__image');
  gsap.registerPlugin(ScrollTrigger);

  if (screenSize > md) {
    gsap.from(image, {
      y: -600,
      duration: 1,
      scrollTrigger: {
        trigger: block,
        start: 'top bottom',
        end: 'bottom center',
        scrub: true //markers: true,

      }
    });
    gsap.from(titleImg, {
      y: 300,
      duration: 1,
      scrollTrigger: {
        trigger: title,
        start: 'top bottom',
        end: 'bottom bottom-=200',
        scrub: true //markers: true,

      }
    });
  }
}

masterParallax();
/* ------------------------------ button Remake ----------------------------- */

$('.button').each(function () {
  $(this).html('<span class="button__text">' + $(this).html() + '</span>');
});
/* -------------------------------------------------------------------------- */

/*                                    tabs                                    */

/* -------------------------------------------------------------------------- */

$('.tabs-list__btn').on('click', function () {
  var $this = $(this);
  var index = $this.index();
  var parent = $(this).closest('.tabs-list');
  var leftPos = Math.floor($this.offset().left - parent.offset().left + parent.scrollLeft());
  parent.animate({
    scrollLeft: leftPos
  }, 300);
  $('.tabs-list__btn').removeClass('tabs-list__btn_active');
  $('.tab-content').removeClass('tab-content_active');
  $this.addClass('tabs-list__btn_active');
  $('.tab-content').eq(index).addClass('tab-content_active');
});
/* -------------------------------------------------------------------------- */

/*                              image map details                             */

/* -------------------------------------------------------------------------- */

function captionsInit() {
  var isCaptions = false;
  var $image = $('.work-detail-image');
  $('.work-detail-image-btns__item').on('click', function (e) {
    var id = $(this).data('id');
    var btn = $(this);
    var caption = $('.work-detail-caption__item[data-id="' + id + '"]');
    $('.work-detail-image-btns__item').not(btn).removeClass('open');
    $('.work-detail-caption__item').not(caption).removeClass('open');
    var willOpen = !caption.hasClass('open');
    btn.toggleClass('open', willOpen);
    caption.toggleClass('open', willOpen);

    if (willOpen && $(window).width() > 820) {
      positionCaptionNearButton(btn, caption, $image);
    } else {
      caption.css({
        position: '',
        top: '',
        left: ''
      });
    }
  });
  $('.work-detail-caption__item .button_small').on('click', function (e) {
    e.stopPropagation();
    var caption = $(this).closest('.work-detail-caption__item');
    var id = caption.data('id');
    var btn = $('.work-detail-image-btns__item[data-id="' + id + '"]');
    caption.removeClass('open');
    btn.removeClass('open');
    caption.css({
      position: '',
      top: '',
      left: ''
    });
  });
  $('#hideCaptions').on('click', function () {
    isCaptions = !isCaptions;
    var btnText = $(this).find('.button__text');
    $('.work-detail-image-btns').fadeToggle();
    var isAnyOpen = $('.work-detail-caption__item.open').length > 0;

    if (isAnyOpen) {
      $('.work-detail-caption__item').removeClass('open');
      $('.work-detail-image-btns__item').removeClass('open');
      $('.work-detail-caption__item').css({
        position: '',
        top: '',
        left: ''
      });
    }

    if (isCaptions) {
      btnText.text('Show captions');
    } else {
      btnText.text('Hide captions');
    }
  });
}

function positionCaptionNearButton($btn, $caption, $image) {
  var btnOffset = $btn.offset();
  var parentOffset = $image.offset();
  var top = btnOffset.top - parentOffset.top;
  var left = btnOffset.left - parentOffset.left;
  var parentWidth = $image.width();
  var captionX = left;
  var captionY = top;
  var SHIFT = $caption.width() / 2;

  if (left < SHIFT) {
    captionX = left + SHIFT;
  }

  if (parentWidth - left < SHIFT) {
    captionX = left - SHIFT;
  }

  $caption.css({
    position: 'absolute',
    top: captionY + 'px',
    left: captionX + 'px'
  });
}

captionsInit();
/* -------------------------------------------------------------------------- */

/*                                 datepicker                                 */

/* -------------------------------------------------------------------------- */

new AirDatepicker('#datePicker');
/* -------------------------------------------------------------------------- */

/*                              initGumAnimations                             */

/* -------------------------------------------------------------------------- */

function initGumAnimations() {
  gsap.fromTo('.parallax-banner__img img', {
    yPercent: 0
  }, {
    yPercent: 20,
    duration: 0.3,
    scrollTrigger: {
      trigger: '.parallax-banner',
      //markers: true,
      start: 'bottom 100%',
      end: 'bottom top',
      scrub: true
    }
  });
  $('.parralax-block').each(function () {
    var $block = $(this);
    var $img = $block.find('img');
    gsap.fromTo($img, {
      yPercent: -30
    }, {
      yPercent: 0,
      duration: 0.3,
      scrollTrigger: {
        trigger: $block,
        //markers: true,
        start: 'top 100%',
        end: 'bottom 0',
        scrub: true
      }
    });
  });
  ScrollTrigger.matchMedia({
    '(min-width: 768px)': function minWidth768px() {
      $('.parallax-lines__line').each(function (index) {
        var line = $(this);
        var indexLine = index + 1;
        gsap.fromTo(line, {
          xPercent: indexLine % 2 ? 25 : -25
        }, {
          xPercent: 0,
          duration: 0.3,
          scrollTrigger: {
            trigger: line,
            // markers: true,
            start: 'top 100%',
            end: 'bottom 70%',
            scrub: true
          }
        });
      });
    }
  });
}

function gumResponsiveInit() {
  var windowWidth = $(window).width();
  $('.banner-place').each(function () {
    var $banner = $(this);
    var $imgBlock = $banner.find('.banner-place__img');
    var $container = $banner.find('.banner-place__container');
    var $title = $banner.find('.banner-place__title');

    if (windowWidth <= 768) {
      if (!$imgBlock.find('.banner-place__title').length) {
        $title.appendTo($imgBlock);
      }
    } else {
      if (!$container.find('.banner-place__title').length) {
        $title.prependTo($container);
      }
    }
  });
}

gumResponsiveInit();
/* -------------------------------------------------------------------------- */

/*                              venus animations                              */

/* -------------------------------------------------------------------------- */

splitWords('.split-text-by-word');

function venusAnimations() {
  //hero section
  ScrollTrigger.matchMedia({
    '(min-width: 768px)': function minWidth768px() {
      // gsap.to('.venus-hero__age', {
      //     y: 200,
      //     opacity: 0,
      //     duration: 0.3,
      //     scrollTrigger: {
      //         trigger: document.body,
      //         //markers: true,
      //         start: '0 0',
      //         end: '50% +=50',
      //         scrub: true,
      //     },
      // })
      // gsap.to('.venus-hero__title', {
      //     y: 200,
      //     scale: 1.05,
      //     duration: 0.3,
      //     scrollTrigger: {
      //         trigger: document.body,
      //         //markers: true,
      //         start: '0 0',
      //         end: '50% +=50',
      //         scrub: true,
      //     },
      // })
      // gsap.to('.venus-hero__subtitle', {
      //     y: 250,
      //     scale: 1.05,
      //     duration: 0.3,
      //     scrollTrigger: {
      //         trigger: document.body,
      //         //markers: true,
      //         start: '0 0',
      //         end: '50% +=50',
      //         scrub: true,
      //     },
      // })
      document.querySelectorAll('.venus-gallery__image').forEach(function (img) {
        ScrollTrigger.create({
          trigger: img,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          onUpdate: function onUpdate(self) {
            var centerProgress = 1 - Math.abs(self.progress - 0.5) * 2;
            var minWidth = 70;
            var maxWidth = 100;
            var width = minWidth + (maxWidth - minWidth) * centerProgress;
            img.style.maxWidth = width + '%';
          }
        });
      });
      document.querySelectorAll('.gsap-fade-in-up').forEach(function (block) {
        gsap.fromTo(block, {
          opacity: 0,
          y: 100
        }, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 80%',
            once: true //markers: true,

          }
        });
      }); //animate text-cols

      $('.venus-text-cols').each(function () {
        var items = $(this).find('div').toArray();
        gsap.fromTo(items, {
          opacity: 0,
          y: 100
        }, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: this,
            start: 'top 80%',
            once: true //markers: true,

          }
        });
      }); //animate words

      document.querySelectorAll('.animate-words').forEach(function (title) {
        gsap.fromTo(title.querySelectorAll('.word'), {
          opacity: 0,
          yPercent: 100
        }, {
          opacity: 1,
          yPercent: 0,
          duration: 2,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            once: true //markers: true,

          }
        });
      });
    },
    '(max-width: 768px)': function maxWidth768px() {
      document.querySelectorAll('.venus-gallery__image').forEach(function (img) {
        gsap.from(img.querySelectorAll('img'), {
          yPercent: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true //markers: true,

          }
        });
      });
    }
  }); //hero section

  gsap.fromTo('.venus-hero__bg img', {
    yPercent: 0
  }, {
    yPercent: 30,
    duration: 0.3,
    scrollTrigger: {
      trigger: document.body,
      //markers: true,
      start: '0 0',
      end: '200% +=200vh',
      scrub: true
    }
  }); //animate image type one

  gsap.fromTo('.venus-watch-type-one__bg img', {
    yPercent: -100
  }, {
    yPercent: 0,
    duration: 0.3,
    scrollTrigger: {
      trigger: '.venus-watch-type-one',
      //markers: true,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  }); //venus symbol section

  gsap.fromTo('.venus-symbol__three', {
    yPercent: 100
  }, {
    yPercent: 0,
    duration: 0.3,
    scrollTrigger: {
      trigger: '.venus-symbol__content',
      //markers: true,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
  gsap.fromTo('.venus-symbol__circle-text', {
    rotate: 270
  }, {
    rotate: 0,
    duration: 0.3,
    scrollTrigger: {
      trigger: '.venus-symbol__circle-part',
      //markers: true,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  }); //venus second parallax

  gsap.fromTo('.venus-specification-image__bg img', {
    yPercent: -20
  }, {
    yPercent: 5,
    duration: 0.3,
    scrollTrigger: {
      trigger: '.venus-specification-image',
      //markers: true,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  }); //gallery

  document.querySelectorAll('.gallery__image').forEach(function (img) {
    ScrollTrigger.create({
      trigger: img,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: function onUpdate(self) {
        var centerProgress = 1 - Math.abs(self.progress - 0.5) * 2;
        var minWidth = 70;
        var maxWidth = 100;
        var width = minWidth + (maxWidth - minWidth) * centerProgress;
        img.style.maxWidth = width + '%';
      }
    });
  });
}

venusAnimations();

function venusCollapse() {
  $('.venus-collpase').each(function () {
    var isOpen = false;
    var content = $(this).find('.venus-collpase__content');
    var btn = $(this).find('.venus-collpase__action .button');
    var btnText = btn.find('.button__text');
    btn.click(function () {
      content.toggleClass('open');
      isOpen = !isOpen;
      console.log('====================================');
      console.log(btnText);
      console.log('====================================');
      btnText.html(!isOpen ? 'Читать далее' : 'Свернуть');
    });
  });
}

venusCollapse();
$(window).on('resize', function () {
  gumResponsiveInit();
  venusCollapse();
});
$(document).ready(function () {
  initGumAnimations();
});