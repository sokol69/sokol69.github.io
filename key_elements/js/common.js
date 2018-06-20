/*Select*/
if ($('.js-select').length > 0) {
	$('.js-select').each( function(i, item) {
		var $this = $(this),
			attr = $this.attr('multiple'),
			settings = {
				placeholder: $this.data('title'),
				csvDispCount: 20,
				floatWidth: 0,
				nativeOnDevice: [
						'Android',
						'BlackBerry',
						'iPhone',
						'iPad',
						'iPod',
						'Opera Mini',
						'IEMobile',
						'Silk'
				],
			};

		if ($this.attr('multiple')) {
			settings.selectAll = true;
			settings.selectAlltext = $this.data('select');
		}

		$this.SumoSelect(settings);
	});
	$('.SumoSelect').each(function(){
		var $select = $(this),
			$wrapper = $select.find('.optWrapper'),
			$caption = $select.find('.CaptionCont');

		$caption.on('click', function(e) {
			if ($wrapper.find('.options li').length > 4) {
				$wrapper.jScrollPane({
					contentWidth: '0px',
					verticalDragMinHeight : 12,
					verticalDragMaxHeight: 12,
					mouseWheelSpeed: 20,
					animateScroll: true
				});
			} 
		});
	});
};

/*Slider*/
if ($('.js-slider__list').length > 0 ) {
	$('.js-slider__list').slick({ 
		centerMode: true, 
		centerPadding: '0',
		slidesToShow: 1,
		variableWidth: true,
		dots: true,
		arrows: true,
		prevArrow: '<button type="button" class="btn-slide btn-prev"></button>',
		nextArrow: '<button type="button" class="btn-slide btn-next"></button>',
		infinite: true,
		rtl: true
	});
};

/*TABS*/
$(document).on('click','.js-mobile-tab-link', function(e) {
	e.preventDefault();
	var $this = $(this),
		$block = $this.closest('.js-tabs');
		$tabLinkBlock = $block.find('.js-mobiletabs');

	$tabLinkBlock.toggleClass('visible');
	$this.toggleClass('active');
});

$(document).on('click','.js-tab-link', function(e) {
	e.preventDefault();
	var $this		= $(this),
		thisText	= $this.text(), 
		classBlock	= $this.data('href'),
		$block		= $this.closest('.js-tabs'),
		$mobileBlock = $block.find('.js-mobile-tab-link'),
		$tabLinkBlock = $block.find('.js-mobiletabs'),
		tabBlock	= $block.find('.js-tab');

	$('.js-tab-link').each(function(){
		$(this).removeClass('-active');
	});

	tabBlock.each(function() {
		$(this).hide();
	});

	$tabLinkBlock.removeClass('visible');
	$this.addClass('-active');
	$('.js-tab__' + classBlock).show();
	$mobileBlock.text(thisText).removeClass('active');
});

/*CallBack form*/
var blockUiOpen = false;

$.fn.center = function () {
	var top = ($(window).height() - this.height()) / 2;
	if (top < 0){
		top = 0; 
	}
	this.css("position","absolute");
	this.css("top", top  + "px");
	return this;
}

$(document).on('click', '.js-show-popup', function(e){
	e.preventDefault();
	var $form = $($(this).attr('href'));

	$.blockUI({ 
		message: $form,
		onOverlayClick: $.unblockUI,
		onBlock: function(){
			$('body').addClass('hidden-overflow');
			blockUiOpen = true;
			$form.addClass('visible');
		},
		onUnblock: function(){
			$('body').removeClass('hidden-overflow');
			blockUiOpen = false;
			$form.removeClass('visible');
		},
		css: { 
			border:0,
			centerY: false,
			position:'fixed',
			padding: 0,
			cursor: 'default',
			left: '0%',
			top: 0,
			right: '0%',
			width:'100%',
			height: '100%',
			marginBottom: '0',
			marginTop: '0',
			background: 'none',
			textAlign: 'left',
		},
			overlayCSS: {
				backgroundColor: 'rgba(155,155,155,0.9)',
				'cursor': 'default'
		},
		focusInput: false
	});
	if (!$form.hasClass('not-center')) {
		$form.center();
	}
});

/*CLOSE FORM*/
$(document).on('click touchstart','.js-close-form', function(e) {
	$.unblockUI();
	$('.popUpForm.visible').removeClass('visible');
	blockUiOpen = false;
	e.preventDefault();
});

$(document).on('click touchstart', function(e) {
	var $target = $(e.target);
	if (!$target.is('input')) {
		if (blockUiOpen && ($target.closest('.popUpForm').length === 0)) {
			$.unblockUI();
			$('.popUpForm.visible').removeClass('visible');
			blockUiOpen = false;
			e.preventDefault();
		}
	}
});

$(document).keyup(function(e) {
	if (e.keyCode == 27) { 
		$.unblockUI();
		$('.popUpForm.visible').removeClass('visible');
		blockUiOpen = false;
	}
});

/*AJAX*/
$('#ajax__btn').click(function() {
	$.ajax({
		url: "./example.html",
		type: "GET",
		crossDomain: true,
		dataType: "html",
		success: function (data) {
			$('.ajax__text').html(data);
			$('#ajax__btn').css('display', 'none');
		}
	});
});

/*card list*/

$(document).on('click','.js-changeCatalogView', function(e){
	e.preventDefault();
	var $this = $(this),
  		thisData = $this.data('view');
      
      $('.js-catalogList').attr('data-view', thisData);
      
      $('.js-changeCatalogView').each(function(){
      	$(this).removeClass('active');
      });
      
      $(this).addClass('active');
});
