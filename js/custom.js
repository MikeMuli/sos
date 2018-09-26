(function() {
	'use strict';

	/*----------------------------------------
		Detect Mobile
	----------------------------------------*/
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};


	/*----------------------------------------
		Animate Scroll
	----------------------------------------*/

	var contentWayPoint = function() {
		var i = 0;
		$('.probootstrap-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('probootstrap-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .probootstrap-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn probootstrap-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft probootstrap-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight probootstrap-animated');
							} else {
								el.addClass('fadeInUp probootstrap-animated');
							}
							el.removeClass('item-animate');
						},  k * 100, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};

	var navbarState = function() {

		var lastScrollTop = 0;
		$(window).scroll(function(){

			var $this = $(this),
				 	st = $this.scrollTop(),
				 	navbar = $('.probootstrap-navbar');

			if ( st > 200 ) {
				navbar.addClass('scrolled');
			} else {
				navbar.removeClass('scrolled awake');
			}

			if ( navbar.hasClass('scrolled') && st > 300 ) {
		   	if (st > lastScrollTop){
		      // if (navbar.hasClass('scrolled')) {
		      	navbar.removeClass('awake');
		      	navbar.addClass('sleep');
		      // }
		   	} else {
		      // if (navbar.hasClass('scrolled')) {
		      	navbar.addClass('awake');
		      	navbar.removeClass('sleep');
		      // }
		   	}
		   	lastScrollTop = st;
		  }

		});
	};

	
	
	
	var stellarInit = function() {
		if( !isMobile.any() ) {
			$(window).stellar();
		}
	};



	// Page Nav
	var clickMenu = function() {

		$('a:not([class="external"])').click(function(event){

			var section = $(this).data('nav-section'),
				navbar = $('.navbar-nav');
				if (isMobile.any()) {
					$('.navbar-toggle').click();
				}
				if ( $('[data-section="' + section + '"]').length ) {
			    	$('html, body').animate({
			        	scrollTop: $('[data-section="' + section + '"]').offset().top
			    	}, 500, 'easeInOutExpo');
			   }

		    event.preventDefault();
		    return false;
		});


	};

	// Reflect scrolling in navigation
	var navActive = function(section) {

		var $el = $('.navbar-nav');
		$el.find('li').removeClass('active');
		$el.each(function(){
			$(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		});

	};

	var navigationSection = function() {

		var $section = $('section[data-section]');
		
		$section.waypoint(function(direction) {
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
	  		offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() - 155; }
		});

	};


	var smoothScroll = function() {
		var $root = $('html, body');

		$('.smoothscroll').click(function () {
			$root.animate({
		    scrollTop: $( $.attr(this, 'href') ).offset().top
			}, 500);
			return false;
		});
	};
	
	var magnificPopupControl = function() {


		$('.image-popup').magnificPopup({
			type: 'image',
			removalDelay: 300,
			mainClass: 'mfp-with-zoom',
			gallery:{
				enabled:true
			},
			zoom: {
				enabled: true, // By default it's false, so don't forget to enable it

				duration: 300, // duration of the effect, in milliseconds
				easing: 'ease-in-out', // CSS transition easing function

				// The "opener" function should return the element from which popup will be zoomed in
				// and to which popup will be scaled down
				// By defailt it looks for an image tag:
				opener: function(openerElement) {
				// openerElement is the element on which popup was initialized, in this case its <a> tag
				// you don't need to add "opener" option if this code matches your needs, it's defailt one.
				return openerElement.is('img') ? openerElement : openerElement.find('img');
				}
			}
		});

		$('.with-caption').magnificPopup({
			type: 'image',
			closeOnContentClick: true,
			closeBtnInside: false,
			mainClass: 'mfp-with-zoom mfp-img-mobile',
			image: {
				verticalFit: true,
				titleSrc: function(item) {
					return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
				}
			},
			zoom: {
				enabled: true
			}
		});


		$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,

      fixedContentPos: false
    });
	};

	function startDoc(){
		$('#bookTourbtn').on('click', function(){
			$(this).addClass('hide');
			$('.filterform').removeClass('hide');
		});

		$('.filterform .closeIcon').on('click', function(){
			$(this).parent().addClass('hide');
			$('#bookTourbtn').removeClass('hide');
		});

		$('.signup-confirmation #popClose').on('click', function(){
			$('.overlayPopup').addClass('hide');
			$(this).parent().addClass('hide');
		});

		$('.filterform button.send-button').on('click', function(e){
			e.preventDefault();
			$('.overlayPopup').removeClass('hide');
			$('.visitation-confirmation').removeClass('hide');
		});

		$('.visitation-confirmation').find('#popClose, #okBtn').on('click', function(){
			$(this).parents('.visitation-confirmation').addClass('hide');
			$('.overlayPopup').addClass('hide');
		});

		$('#popLogin').on('click', function(e){
			e.preventDefault();
			$('.overlayPopup').removeClass('hide');
			$('.signupForm, .signupAcb').removeClass('hide');
			$('.loginForm, .loginAcb').addClass('hide');
			$('.topSwitch a').removeClass('active');
			$('#signupSwitch').addClass('active');
			$('.loginSignup form')[0].reset();
			$('.loginSignup').removeClass('hide');
		});

		$('#loginSwitch').on('click', function(e){
			e.preventDefault();
			$(this).siblings().removeClass('active');
			$(this).addClass('active');
			$('.signupForm, .signupAcb').addClass('hide');
			$('.loginForm, .loginAcb').removeClass('hide');
		});

		$('#signupSwitch').on('click', function(e){
			e.preventDefault();
			$(this).siblings().removeClass('active');
			$(this).addClass('active');
			$('.loginForm, .loginAcb').addClass('hide');
			$('.signupForm, .signupAcb').removeClass('hide');
		});

		$('.popups .overlayPopup').on('click', function(e){
			$('.loginSignup, .visitation-confirmation, .signup-confirmation, .resetPass, .resetPassForm, .resetPassConf, .resetPassOk').addClass('hide');
			$(this).addClass('hide');
		});

		$('.signupAcb .send-button').on('click', function(e){
			e.preventDefault();
			$('.loginSignup').addClass('hide');
			$('.signup-confirmation').removeClass('hide');
		});

		$('.loginAcb .fgtPass').on('click', function(){
			$(this).parents('.loginSignup').addClass('hide');
			$('.resetPass').removeClass('hide');
		});

		$('.resetPass .send-button').on('click', function(e){
			e.preventDefault();
			$('.resetPass').addClass('hide');
			$('.resetPassConf').removeClass('hide');
		});

		$('.resetPassConf').find('#popClose').on('click', function(){
			$(this).parents('.resetPassConf').addClass('hide');
			$('.overlayPopup').addClass('hide');
		});

		$('.resetPassConf').find('#okBtn').on('click', function(){
			$(this).parents('.resetPassConf').addClass('hide');
			$('.resetPassForm').removeClass('hide');
		});

		$('.resetPassForm').find('.send-button').on('click', function(e){
			e.preventDefault();
			$(this).parents('.resetPassForm').addClass('hide');
			$('.resetPassOk').removeClass('hide');
		});

		$('.resetPassOk').find('#restLogin').on('click', function(e){
			e.preventDefault();
			$(this).parents('.resetPassOk').addClass('hide');
			$('.loginSignup').removeClass('hide');
			$('#loginSwitch').trigger('click');
		});

		$('.productsRow').find('.productSubscribe').on('click', function(){
			$('.productsRow').addClass('hide');
			$('.orderRow').removeClass('hide');
		});

		$('.editFx').on('click', function(){
			$(this).addClass('hide');
			$(this).parents('.basicInfo, .privacyInfo, .membershipInfo').find('.send-button').removeClass('hide');
			$(this).parents('.basicInfo, .privacyInfo, .membershipInfo').find('input').removeAttr('disabled');
		});

		$('.basicInfo, .privacyInfo, .membershipInfo').find('.send-button').on('click', function(e){
			e.preventDefault();
			$(this).parents('.basicInfo, .privacyInfo, .membershipInfo').find('.editFx').removeClass('hide');
			$(this).parents('.basicInfo, .privacyInfo, .membershipInfo').find('.send-button').addClass('hide');
			$(this).parents('.basicInfo, .privacyInfo, .membershipInfo').find('input').attr('disabled','disabled');
		});

		/* Switches in User Profile */
		$('#profileTap').on('click', function(){
			$('.profileDiv').removeClass('hide');
			$('.creditDiv').addClass('hide');
			$('.facilitiesDiv').addClass('hide');
			$(this).parent().siblings().children('a').removeClass('active');
			$(this).addClass('active');
		});

		$('#creditTap').on('click', function(){
			$('.profileDiv').addClass('hide');
			$('.creditDiv').removeClass('hide');
			$('.facilitiesDiv').addClass('hide');
			$(this).parent().siblings().children('a').removeClass('active');
			$(this).addClass('active');
		});

		$('#facilitiesTap').on('click', function(){
			$('.profileDiv').addClass('hide');
			$('.creditDiv').addClass('hide');
			$('.facilitiesDiv').removeClass('hide');
			$(this).parent().siblings().children('a').removeClass('active');
			$(this).addClass('active');
		});

		$('.creditDiv .tabs #tab1').on('click', function(){
			$(this).siblings().removeClass('active');
			$(this).addClass('active');
			$('.creditDiv .tabsContent .tabTopUpCred').removeClass('hide');
			$('.creditDiv .tabsContent .tabCredHistory, .creditDiv .tabsContent .tabInvoiceHistory').addClass('hide');
		});

		$('.creditDiv .tabs #tab2').on('click', function(){
			$(this).siblings().removeClass('active');
			$(this).addClass('active');
			$('.creditDiv .tabsContent .tabCredHistory').removeClass('hide');
			$('.creditDiv .tabsContent .tabTopUpCred, .creditDiv .tabsContent .tabInvoiceHistory').addClass('hide');
		});

		$('.credOptionList .credOption').on('click', function() {
			$(this).siblings().removeClass('active');
			$(this).addClass('active');
		});

		$('.facilitiesDiv .facBookTab #conTab').on('click', function() {
			$(this).siblings().removeClass('active');
			$(this).addClass('active');
			$('.facBookCont .convContent').removeClass('hide');
			$('.facBookCont .rmContent').addClass('hide');
		});

		$('.facilitiesDiv .facBookTab #hisTab').on('click', function() {
			$(this).siblings().removeClass('active');
			$(this).addClass('active');
			$('.facBookCont .convContent').addClass('hide');
			$('.facBookCont .rmContent').removeClass('hide');
		});

		$('.credhistTable .send-button').on('click', function(e){
			e.preventDefault();
			$('.credhistTable tr').each(function(){
				if(!$(this).hasClass('totalRow')){
					$(this).addClass('hide');
				}
			});
			$('.summaryTableDiv').removeClass('hide');
		});

		$('.creditDiv .tabs #tab3').on('click', function(){
			$(this).siblings().removeClass('active');
			$(this).addClass('active');
			$('.creditDiv .tabsContent .tabInvoiceHistory').removeClass('hide');
			$('.creditDiv .tabsContent .tabTopUpCred, .creditDiv .tabsContent .tabCredHistory').addClass('hide');
		});

		$('.facBookCont .rmFifTabs #tabs1').on('click', function(){
			$(this).siblings().removeClass('active');
			$(this).addClass('active');
			$('.rmFifTabContentUpcoming').removeClass('hide');
			$('.rmFifTabContentPast').addClass('hide');
		});

		$('.facBookCont .rmFifTabs #tabs2').on('click', function(){
			$(this).siblings().removeClass('active');
			$(this).addClass('active');
			$('.rmFifTabContentUpcoming').addClass('hide');
			$('.rmFifTabContentPast').removeClass('hide');
		});

		var accItem = document.getElementsByClassName('accordionItem');
	    var accHD = document.getElementsByClassName('accordionItemHeading');
	    var i;
	    for (i = 0; i < accHD.length; i++) {
	        accHD[i].addEventListener('click', toggleItem, false);
	    }
	    function toggleItem() {
	        var itemClass = this.parentNode.className;
	        for (i = 0; i < accItem.length; i++) {
	            accItem[i].className = 'accordionItem close';
	        }
	        if (itemClass == 'accordionItem close') {
	            this.parentNode.className = 'accordionItem open';
	        }
	    }

      $('.timerange').on('click', function(e) {
	    e.stopPropagation();
	    var input = $(this).find('.timePicked');

	    var now = new Date();
	    var hours = now.getHours();
	    var period = "PM";
	    if (hours < 12) {
	      period = "AM";
	    } else {
	      hours = hours - 11;
	    }
	    var minutes = now.getMinutes();

	    var range = {
	      from: {
	        hour: hours,
	        minute: minutes,
	        period: period
	      },
	      to: {
	        hour: hours,
	        minute: minutes,
	        period: period
	      }
	    };

	    if (input.val() !== "") {
	      var timerange = input.val();
	      var matches = timerange.match(/([0-9]{2}):([0-9]{2}) (\bAM\b|\bPM\b)-([0-9]{2}):([0-9]{2}) (\bAM\b|\bPM\b)/);
	      if( matches.length === 7) {
	        range = {
	          from: {
	            hour: matches[1],
	            minute: matches[2],
	            period: matches[3]
	          },
	          to: {
	            hour: matches[4],
	            minute: matches[5],
	            period: matches[6]
	          }
	        }
	      }
	    };
	    console.log(range);

	    var html = '<div class="timerangepicker-container">'+
	      '<div class="timerangepicker-from">'+
	      '<label class="timerangepicker-label">From:</label>' +
	      '<div class="timerangepicker-display hour">' +
	          '<span class="increment icon icon-arrow-up"></span>' +
	          '<span class="value">'+('0' + range.from.hour).substr(-2)+'</span>' +
	          '<span class="decrement icon icon-arrow-down"></span>' +
	      '</div>' +
	      ':' +
	      '<div class="timerangepicker-display minute">' +
	          '<span class="increment icon icon-arrow-up"></span>' +
	          '<span class="value">'+('0' + range.from.minute).substr(-2)+'</span>' +
	          '<span class="decrement icon icon-arrow-down"></span>' +
	      '</div>' +
	      ':' +
	      '<div class="timerangepicker-display period">' +
	          '<span class="increment icon icon-arrow-up"></span>' +
	          '<span class="value">PM</span>' +
	          '<span class="decrement icon icon-arrow-down"></span>' +
	      '</div>' +
	      '</div>' +
	      '<div class="timerangepicker-to">' +
	      '<label class="timerangepicker-label">To:</label>' +
	      '<div class="timerangepicker-display hour">' +
	          '<span class="increment icon icon-arrow-up"></span>' +
	          '<span class="value">'+('0' + range.to.hour).substr(-2)+'</span>' +
	          '<span class="decrement icon icon-arrow-down"></span>' +
	      '</div>' +
	      ':' +
	      '<div class="timerangepicker-display minute">' +
	          '<span class="increment icon icon-arrow-up"></span>' +
	          '<span class="value">'+('0' + range.to.minute).substr(-2)+'</span>' +
	          '<span class="decrement icon icon-arrow-down"></span>' +
	      '</div>' +
	      ':' +
	      '<div class="timerangepicker-display period">' +
	          '<span class="increment icon icon-arrow-up"></span>' +
	          '<span class="value">PM</span>' +
	          '<span class="decrement icon icon-arrow-down"></span>' +
	      '</div>' +
	      '</div>' +
	    '</div>';

	    $(html).insertAfter(this);
	    $('.timerangepicker-container').on(
	      'click',
	      '.timerangepicker-display.hour .increment',
	      function(){
	        var value = $(this).siblings('.value');
	        value.text(
	          increment(value.text(), 12, 1, 2)
	        );
	      }
	    );

	    $('.timerangepicker-container').on(
	      'click',
	      '.timerangepicker-display.hour .decrement',
	      function(){
	        var value = $(this).siblings('.value');
	        value.text(
	          decrement(value.text(), 12, 1, 2)
	        );
	      }
	    );

	    $('.timerangepicker-container').on(
	      'click',
	      '.timerangepicker-display.minute .increment',
	      function(){
	        var value = $(this).siblings('.value');
	        value.text(
	          increment(value.text(), 59, 0 , 2)
	        );
	      }
	    );

	    $('.timerangepicker-container').on(
	      'click',
	      '.timerangepicker-display.minute .decrement',
	      function(){
	        var value = $(this).siblings('.value');
	        value.text(
	          decrement(value.text(), 12, 1, 2)
	        );
	      }
	    );

	    $('.timerangepicker-container').on(
	      'click',
	      '.timerangepicker-display.period .increment, .timerangepicker-display.period .decrement',
	      function(){
	        var value = $(this).siblings('.value');
	        var next = value.text() == "PM" ? "AM" : "PM";
	        value.text(next);
	      }
	    );
	  });

	  $(document).on('click', e => {

	    if(!$(e.target).closest('.timerangepicker-container').length) {
	      if($('.timerangepicker-container').is(":visible")) {
	        var timerangeContainer = $('.timerangepicker-container');
	        if(timerangeContainer.length > 0) {
	          var timeRange = {
	            from: {
	              hour: timerangeContainer.find('.value')[0].innerText,
	              minute: timerangeContainer.find('.value')[1].innerText,
	              period: timerangeContainer.find('.value')[2].innerText
	            },
	            to: {
	              hour: timerangeContainer.find('.value')[3].innerText,
	              minute: timerangeContainer.find('.value')[4].innerText,
	              period: timerangeContainer.find('.value')[5].innerText
	            },
	          };

	          timerangeContainer.parent().find('input').val(
	            timeRange.from.hour+":"+
	            timeRange.from.minute+" "+    
	            timeRange.from.period+"-"+
	            timeRange.to.hour+":"+
	            timeRange.to.minute+" "+
	            timeRange.to.period
	          );
	          timerangeContainer.remove();
	        }
	      }
	    }
	    
	  });

	  function increment(value, max, min, size) {
	    var intValue = parseInt(value);
	    if (intValue == max) {
	      return ('0' + min).substr(-size);
	    } else {
	      var next = intValue + 1;
	      return ('0' + next).substr(-size);
	    }
	  }

	  function decrement(value, max, min, size) {
	    var intValue = parseInt(value);
	    if (intValue == min) {
	      return ('0' + max).substr(-size);
	    } else {
	      var next = intValue - 1;
	      return ('0' + next).substr(-size);
	    }
	  }
	}

	$(function(){
		contentWayPoint();
		navbarState();
		stellarInit();
		clickMenu();
		navigationSection();
		magnificPopupControl();
		smoothScroll();
		startDoc();
	});

})();