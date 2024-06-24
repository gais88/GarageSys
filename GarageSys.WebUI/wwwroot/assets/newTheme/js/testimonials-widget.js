"use strict";

jQuery(window).on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/marketum_testimonials.default', function ($scope) {
        let testimonials = $scope.find('.marketum_slider_slick'),
            slider_options = testimonials.data('slider-options'),
            dots_container = $scope.find('.marketum_slider_arrows'),
            prev = $scope.find('.marketum_causes_slider_navigation_container .marketum_prev'),
            next = $scope.find('.marketum_causes_slider_navigation_container .marketum_next'),
            status = $scope.find('.marketum_slider_counter'),
            current_cont = status.find('.marketum_current_slide'),
            all_cont = status.find('.marketum_all_slides'),
            indicator = status.find('.marketum_separator');

        testimonials.on('init', function (event, slick) {
            let i, n, width;
            
            for (i = 0; i < slick.slideCount; i++) {
                n = i + 1;
                width = 100 / slick.slideCount;

                indicator.append('<span id="indicator_' + n + '" style="width: ' + width + '%;"></span>');
            }

            $scope.find('.slick-dots li').each(function () {
                jQuery(this).prepend('<svg aria-hidden="true" class="marketum_progress" width="70" height="70" viewBox="0 0 70 70"><path class="marketum_progress__path" d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z" pathLength="1"></path></svg>');
            });
        });

        testimonials.on('init afterChange', function (event, slick, currentSlide) {
            let i = (currentSlide ? currentSlide : 0) + 1,
                n, b;

            if (i < 10) {
                n = '0';
            } else {
                n = '';
            }

            if (slick.slideCount < 10) {
                b = '0';
            } else {
                b = '';
            }

            current_cont.text(n + i);
            all_cont.text(b + slick.slideCount);
            indicator.find('.current').removeClass('current');
            indicator.find('#indicator_' + i + '').addClass('current');
        });

        testimonials.slick({
            fade: slider_options['fade'],
            pauseOnHover: slider_options['pauseOnHover'],
            autoplay: slider_options['autoplay'],
            autoplaySpeed: slider_options['autoplaySpeed'],
            speed: slider_options['speed'],
            infinite: slider_options['infinite'],
            cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
            touchThreshold: 100,
            rtl: slider_options['rtl'],
            slidesToShow: slider_options['slidesToShow'],
            // prevArrow: prev,
            // nextArrow: next,
            arrows: false,
            dots: true,
            appendDots: dots_container,
            adaptiveHeight: true,
            responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }],
        });

        jQuery(window).on('scroll', function () {
            $scope.find('.marketum_motion_effect_on').each(function () {
                let container_top = jQuery(this).offset().top,
                    visible_area_top = jQuery(window).scrollTop(),
                    visible_area_bottom = visible_area_top + (jQuery(window).height());

                if (container_top < visible_area_bottom) {
                    jQuery(this).find('.marketum_testimonials_wrapper').addClass('visible');
                }
            });
        });
    });
});