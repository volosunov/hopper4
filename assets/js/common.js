$(document).ready(function () {

	// Запускаемся и проверяем работу JS
    console.log('ready')
	$('html').addClass('js');

	// Расчёт высоты шапки для корректного расчёта отступа для первого экрана
	headerHeight = parseInt($('.header').css('height'));
	// Отступ у первого экрана
	$('.section__general').css('margin-top',headerHeight+'px');
	$('.section__page').css('margin-top',headerHeight+'px');

	// Плавный скроллинг
	$(".menu a, .scroll, .main_link, .arrow").click(function() {
		$("html, body").animate({
			scrollTop: $($(this).attr("href")).offset().top  - 110 + "px"
		}, {
			duration: 700
		});
		return false;
	});
	if (window.innerWidth < 767) {
		headerHeight = parseInt($('.header').css('height'));
		// Плавный скроллинг
		$(".menu a, .scroll, .main_link, .arrow").click(function() {
			$("html, body").animate({
				scrollTop: $($(this).attr("href")).offset().top  - headerHeight + "px"
			}, {
				duration: 700
			});
			return false;
		});
	}

	// Скрываем детали
	$('.form__box .form__attach').slideToggle();
	// Модуль открытия деталей по кнопке 
	$('.form__box .form__up').on('click',function(){
		$('.form__box .form__attach').slideToggle();
		$(this).toggleClass('active')
	});

	// При изменении состояния поля суммы - открываем детали
	$('.form__inp-cost').on('keyup',function(){
		if ($(this).val() != '') {
			$('.form__detail').slideDown();
		} else {
			$('.form__detail').slideUp();
		}
	});

	// Проверяем на ввод символов в поле суммы
	$('.form__inp-cost').keypress(function(key) {
        if(key.charCode < 48 || key.charCode > 57 ) return false;
    });

	// Активация модальных окон
	$('.popup-show').magnificPopup({
		type: 'inline',

		fixedContentPos: true,
		fixedBgPos: true,

		overflowY: 'auto',

		closeBtnInside: true,
		preloader: false,
		
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in'
	});

	// Закрытие модальных окон
	$('.popup__close, .btn__close').on('click',function(){
		$.magnificPopup.close();
	});	

	// Активация бургерного меню
	$('.burger-button').on('click',function(){
		$('.burger-button').toggleClass('on');
		$('.visible__menu').toggleClass('open');
	});

	// Работа с пунктами меню в бургерном меню
	$('.visible__menu .header__menu a').on('click',function(){
		$('.visible__menu').toggleClass('open');
		$('.burger-button').toggleClass('on')
	});

	// Активация фиксированной шапки
	$(window).scroll(function() {
		if ($(this).scrollTop()>200){
			$("header").addClass('fixed');      
			} else {
			$("header").removeClass('fixed');
		}
	});

	// Активация модуля копирования по кнопкам
	new ClipboardJS('.btn__clipboard');
	new ClipboardJS('.purse__inp');
	new ClipboardJS('.purse__label');

	// Вывод сообщения про успешное копирование в буфер
	$('.purse__inp, .purse__label').on('click',function(){
		tooltip__label = $(this).data('label');
		$(this).closest('.purse__form').find('.tooltip').fadeIn(0);
		$(this).closest('.purse__form').find('.tooltip').text(tooltip__label);
		setTimeout(hiddenTooltip, 2000);
	});
	$('.btn__clipboard').on('click',function(){
		tooltip__label = $(this).data('label');
		$(this).closest('.form__item-purse').find('.tooltip').fadeIn(0);
		$(this).closest('.form__item-purse').find('.tooltip').text(tooltip__label);
		setTimeout(hiddenTooltip, 2000);
	});

	// Функция скрытия тултипа(подсказки)
	function hiddenTooltip() {
		$('.tooltip').fadeOut(0);
	}

	// Активация анимаций нежных на сайте при скроллинге
	window.sr = ScrollReveal();
	sr.reveal('.promo-title', { duration: 1000, mobile: false });
	sr.reveal('.promo-desc', { duration: 1200, delay: 80, mobile: false  });

});

// Прогрессбар при скроллинге
$(window).scroll(function() { 
  var scrollPercent = 100 * $(window).scrollTop() / ($(document).height() - $(window).height()); 
  $('.bar-long').css('width', scrollPercent + "%"); 
});

// Скроллинг
$(window).scroll(function() {
	// расчёт координат
	var WinTop = $(window).scrollTop();
    var docHeight = $(window).height();

    // Анимация шагов
	$('.steps .steps__item').each(function (i) {
		var topIn = $(this).offset().top -docHeight * 0.80 ;
		if (WinTop > topIn) {
			setTimeout(function () {
				$('.steps .steps__item').eq(i).addClass('active');
			}, 300*i);
		}
	});

    // Анимация элементов
	$('.costs .costs__item').each(function (i) {
		var topIn = $(this).offset().top -docHeight * 0.80 ;
		if (WinTop > topIn) {
			setTimeout(function () {
				$('.costs .costs__item').eq(i).addClass('active');
			}, 300*i);
		}
	});

    // Анимация элементов
	$('.boxes .boxes__item').each(function (i) {
		var topIn = $(this).offset().top -docHeight * 0.80 ;
		if (WinTop > topIn) {
			setTimeout(function () {
				$('.boxes .boxes__item').eq(i).addClass('active');
			}, 300*i);
		}
	});

	// Custom select box
	$('.form__inp-select').chosen()

	// Карусель отзывов
	$('.owl-carousel').owlCarousel({
		loop:true,
		nav:false,
		dots: true,
		// margin:50,
		margin:0,
		responsiveClass:true,
		responsive:{
			0:{
				items:1,
			},
			767:{
				items:2,
			}
		}
	})

	// Работа с галерей
	$().fancybox({
		selector : '.owl-item:not(.cloned) a',
		hash   : false,
		thumbs : {
		autoStart : true
		},
		buttons : [
			'zoom',
			'download',
			'close'
		]
	});

});

// Скроллинг
$(window).bind('scroll',function(e){
    parallaxScroll();
});
 
// Функция интересной анимации элементов
function parallaxScroll(){
    var scrolled = $(window).scrollTop();
    $('.image-1').css('top',(0-(scrolled*.25))+'px');
    $('.image-2').css('top',(0-(scrolled*.5))+'px');
    $('.section__cost .pattern').css('top',(0-(scrolled*.1))+'px');
}