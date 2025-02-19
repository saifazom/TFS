!function ($) {

    // =-=-=-=-=-=-=-=-=-=
    // Hamburger Menu
    // =-=-=-=-=-=-=-=-=-=
    let header = document.getElementById('header');
    let myButton = document.querySelector('.s-hamburger-menu-btn');
    let hamburgerMenu = document.querySelector('.s-hamburger-menu');

    jQuery(myButton).click(function(){
        $(header).toggleClass("open");
        $(myButton).toggleClass("open");
        $(hamburgerMenu).fadeToggle();
    });

    jQuery('.s-hamburger-menu__nav a').hover(
        function(){ 
			jQuery('.s-hamburger-menu__nav a').addClass('active'); 
			jQuery(this).removeClass('active');
		},function(){ 
			jQuery('.s-hamburger-menu__nav a').removeClass('active'); 
		}
	);

    // =-=-=-=-=-=-=-=-=-=
    // Sicky Header 
    // =-=-=-=-=-=-=-=-=-=
    jQuery(window).scroll(function(){
        if ($(window).scrollTop() >= 5) {
            $(myButton).addClass('fixed');
            $(header).addClass('fixed');
        }else {
            $(myButton).removeClass('fixed');
            $(header).removeClass('fixed');
        }
    });
    
    // =-=-=-=-=-=-=-=-=-=
    // Slick Testimonial
    // =-=-=-=-=-=-=-=-=-=
    
    jQuery('.js-testimonials').slick({
        fade: true,
        autoplay: false,
        prevArrow: jQuery('#testimonial-prev'),
        nextArrow: jQuery('#testimonial-next'),
        dots: false,
        autoplaySpeed: 4000,
        speed: 600,
        useCSS: false,
        cssEase: 'linear',
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: false,
        infinite: true,
        pauseOnDotsHover: false,
        pauseOnFocus: false,
        pauseOnHover: false,
        touchMove: true
    });

    // =-=-=-=-=-=-=-=-=-=
    // Scroller
    // =-=-=-=-=-=-=-=-=-=

    jQuery('.js-scroll-btn').click(function(e) {
        e.preventDefault();
    
        var $handler = $(this);
        var target = $handler.attr('href');
    
        if ($(target).length) {
            var headerHeight = jQuery('#header').outerHeight(); // Header height dynamically নেয়া
    
            jQuery('html, body').animate({
                scrollTop: $(target).offset().top - headerHeight // Header height অনুযায়ী adjust করা
            });
        }
    });
    
    
    jQuery('.js-scroll-top-btn').click(function() {
        $('html, body').animate({
            scrollTop: 0
        });
        return false;
    });
    

    // =-=-=-=-=-=-=-=-=-=
    // Counter
    // =-=-=-=-=-=-=-=-=-=

    $(window).scroll(startCounter);

    function startCounter() {
        const oTop = $("#stat-counter").offset().top - window.innerHeight;

        if ($(window).scrollTop() > oTop) {
            $(window).off("scroll", startCounter);

            $(".coun-item").each(function () {
                var $this = $(this);
                var countTo = $this.attr("data-count");

                $({ Counter: 0 }).animate({ Counter: countTo }, {
                    duration: 2000,
                    easing: "swing",
                    step: function () {
                        $this.text(Math.ceil(this.Counter));
                    }
                });
            });
        }
    }

    // =-=-=-=-=-=-=-=-=-=
    // Load Animation
    // =-=-=-=-=-=-=-=-=-=
    var wow = new WOW({
            boxClass:     'wow',      // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset:       0,          // distance to the element when triggering the animation (default is 0)
            mobile:       true,       // trigger animations on mobile devices (default is true)
            live:         true,       // act on asynchronously loaded content (default is true)
            callback:     function(box) {
            // the callback is fired every time an animation is started
            // the argument that is passed in is the DOM node being animated
            },
            scrollContainer: null,    // optional scroll container selector, otherwise use window,
            resetAnimation: true,     // reset animation on end (default is true)
        }
    );
    wow.init();

}(window.jQuery);
