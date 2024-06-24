"use strict";

jQuery(window).on('elementor/frontend/init', function () {
    function customCursor($scope) {
        if($scope.find('.custom_cursor_active').length > 0 && jQuery(window).width() >= 992) {

            function showCustomCursor(event) {
                const cursor = jQuery('.cursor_drag', $scope);
                cursor.css('left', event.clientX-5).css('top', event.clientY-5);
            }
            var slider = $scope.find('.marketum_slider_slick'),
                slider_link = slider.find('a');

            slider.mousemove(showCustomCursor);

            slider.mouseleave(function(e) {
                if(!jQuery('body').hasClass('elementor-editor-active')) {
                    const cursor = jQuery('.cursor_drag', $scope);
                    $scope.css({cursor: 'auto'});
                    cursor.removeClass('active');
                    setTimeout(function() {
                        if(!cursor.hasClass('active')) {
                            cursor.hide();
                        }
                    }, 300);
                }
            });

            slider.mouseenter(function(e) {
                if(!jQuery('body').hasClass('elementor-editor-active')) {
                    const cursor = jQuery('.cursor_drag', $scope);
                    $scope.css({cursor: 'none'});
                    cursor.show();
                    setTimeout(function() {
                        cursor.addClass('active');
                    }, 10);
                }
            });

            if ($scope.find('.marketum_linked_item_slider_widget')) {} else {
                slider_link.mouseenter(function (e) {
                    if(!jQuery('body').hasClass('elementor-editor-active')) {
                        const cursor = jQuery('.cursor_drag', $scope);
                        $scope.css({cursor: 'auto'});
                        cursor.removeClass('active');
                        setTimeout(function() {
                            if(!cursor.hasClass('active')) {
                                cursor.hide();
                            }
                        }, 300);
                    }
                });

                slider_link.mouseleave(function (e) {
                    if(!jQuery('body').hasClass('elementor-editor-active')) {
                        const cursor = jQuery('.cursor_drag', $scope);
                        $scope.css({cursor: 'none'});
                        cursor.show();
                        setTimeout(function() {
                            cursor.addClass('active');
                        }, 10);
                    }
                });
            }
        }
    }

    // --------------------------- //
    // ------ Awards Widget ------ //
    // --------------------------- //
    elementorFrontend.hooks.addAction('frontend/element_ready/marketum_awards.default', customCursor);
    elementorFrontend.hooks.addAction('frontend/element_ready/marketum_awards.default', function ($scope) {
        let causesSlider = $scope.find('.marketum_slider_slick'),
            slider_options = causesSlider.data('slider-options'),
            dots_container = $scope.find('.marketum_slider_arrows');

        if (!causesSlider.length) return;

        $scope.find('.marketum_offset_container').width(jQuery(window).width());

        causesSlider.on('init', function (event, slick) {
            $scope.find('.slick-dots li').each(function () {
                jQuery(this).prepend('<svg aria-hidden="true" class="marketum_progress" width="70" height="70" viewBox="0 0 70 70"><path class="marketum_progress__path" d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z" pathLength="1"></path></svg>');
            });
        });

        causesSlider.slick({
            pauseOnHover: slider_options['pauseOnHover'],
            autoplay: slider_options['autoplay'],
            autoplaySpeed: slider_options['autoplaySpeed'],
            speed: slider_options['speed'],
            infinite: slider_options['infinite'],
            cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
            touchThreshold: 100,
            rtl: slider_options['rtl'],
            slidesToShow: slider_options['slides_to_show'],
            arrows: false,
            dots: slider_options['nav'],
            appendDots: dots_container,
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }]
        });
    });

    // ---------------------------------- //
    // ------ Blog Carousel Widget ------ //
    // ---------------------------------- //
    elementorFrontend.hooks.addAction('frontend/element_ready/marketum_blog_slider.default', customCursor);
    elementorFrontend.hooks.addAction('frontend/element_ready/marketum_blog_slider.default', function ($scope) {
        let causesSlider = $scope.find('.marketum_slider_slick'),
            slider_options = causesSlider.data('slider-options'),
            dots_container = $scope.find('.marketum_slider_arrows'),
            prev = $scope.find('.marketum_causes_slider_navigation_container .marketum_prev'),
            next = $scope.find('.marketum_causes_slider_navigation_container .marketum_next');

        if (!causesSlider.length) return;

        $scope.find('.marketum_offset_container').width(jQuery(window).width());

        causesSlider.slick({
            pauseOnHover: slider_options['pauseOnHover'],
            autoplay: slider_options['autoplay'],
            autoplaySpeed: slider_options['autoplaySpeed'],
            speed: slider_options['speed'],
            infinite: slider_options['infinite'],
            cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
            touchThreshold: 100,
            rtl: slider_options['rtl'],
            slidesToShow: 3,
            arrows: false,
            dots: true,
            appendDots: dots_container,
            responsive: [{
                breakpoint: 1025,
                settings: {
                    slidesToShow: 2,
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }]
        });
    });

    // ----------------------------------- //
    // ------ Gallery Slider Widget ------ //
    // ----------------------------------- //
    elementorFrontend.hooks.addAction('frontend/element_ready/marketum_gallery_slider.default', function ($scope) {
        let causesSlider = $scope.find('.marketum_slider_slick'),
            slider_options = causesSlider.data('slider-options'),
            dots_container = $scope.find('.marketum_slider_arrows'),
            prev = $scope.find('.marketum_causes_slider_navigation_container .marketum_prev'),
            next = $scope.find('.marketum_causes_slider_navigation_container .marketum_next');

        if (!causesSlider.length) return;

        $scope.find('.marketum_offset_container').width(jQuery(window).width());

        causesSlider.slick({
            pauseOnHover: slider_options['pauseOnHover'],
            autoplay: slider_options['autoplay'],
            autoplaySpeed: slider_options['autoplaySpeed'],
            speed: slider_options['speed'],
            infinite: slider_options['infinite'],
            cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
            touchThreshold: 100,
            rtl: slider_options['rtl'],
            slidesToShow: 4,
            arrows: false,
            dots: true,
            appendDots: dots_container,
            responsive: [{
                breakpoint: 1025,
                settings: {
                    slidesToShow: 2,
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }]
        });
    });

    // -------------------------------------- //
    // ------ Services Carousel Widget ------ //
    // -------------------------------------- //
    elementorFrontend.hooks.addAction('frontend/element_ready/marketum_services_slider.default', customCursor);
    elementorFrontend.hooks.addAction('frontend/element_ready/marketum_services_slider.default', function ($scope) {
        let causesSlider = $scope.find('.marketum_slider_slick'),
            slider_options = causesSlider.data('slider-options'),
            dots_container = $scope.find('.marketum_slider_arrows'),
            prev = $scope.find('.marketum_causes_slider_navigation_container .marketum_prev'),
            next = $scope.find('.marketum_causes_slider_navigation_container .marketum_next');

        if (!causesSlider.length) return;

        $scope.find('.marketum_offset_container').width(jQuery(window).width());

        causesSlider.on('init', function (event, slick) {
            $scope.find('.slick-dots li').each(function () {
                jQuery(this).prepend('<svg aria-hidden="true" class="marketum_progress" width="70" height="70" viewBox="0 0 70 70"><path class="marketum_progress__path" d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z" pathLength="1"></path></svg>');
            });
        });

        causesSlider.slick({
            pauseOnHover: slider_options['pauseOnHover'],
            autoplay: slider_options['autoplay'],
            autoplaySpeed: slider_options['autoplaySpeed'],
            speed: slider_options['speed'],
            infinite: slider_options['infinite'],
            cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
            touchThreshold: 100,
            rtl: slider_options['rtl'],
            slidesToShow: slider_options['slidesToShow'],
            arrows: false,
            dots: true,
            appendDots: dots_container,
            responsive: [{
                breakpoint: 1367,
                settings: {
                    slidesToShow: 3,
                }
            }, {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 2,
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }]
        });

        jQuery(window).on('scroll', function () {
            $scope.find('.marketum_motion_effect_on').each(function () {
                let container_top = jQuery(this).offset().top,
                    visible_area_top = jQuery(window).scrollTop(),
                    visible_area_bottom = visible_area_top + (jQuery(window).height() - 100);

                if (container_top < visible_area_bottom) {
                    jQuery(this).addClass('visible');
                }
            });
        });
    });

    // ----------------------------- //
    // ------ Timeline Widget ------ //
    // ----------------------------- //
    elementorFrontend.hooks.addAction('frontend/element_ready/marketum_work_steps.default', customCursor);
    elementorFrontend.hooks.addAction('frontend/element_ready/marketum_work_steps.default', function ($scope) {
        let causesSlider = $scope.find('.marketum_slider_slick'),
            slider_options = causesSlider.data('slider-options'),
            dots_container = $scope.find('.marketum_slider_arrows'),
            prev = $scope.find('.marketum_causes_slider_navigation_container .marketum_prev'),
            next = $scope.find('.marketum_causes_slider_navigation_container .marketum_next');

        if (!causesSlider.length) return;

        $scope.find('.marketum_offset_container').width(jQuery(window).width());

        causesSlider.on('init', function (event, slick) {
            $scope.find('.slick-dots li').each(function () {
                jQuery(this).prepend('<svg aria-hidden="true" class="marketum_progress" width="70" height="70" viewBox="0 0 70 70"><path class="marketum_progress__path" d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z" pathLength="1"></path></svg>');
            });
        });

        causesSlider.slick({
            pauseOnHover: slider_options['pauseOnHover'],
            autoplay: slider_options['autoplay'],
            autoplaySpeed: slider_options['autoplaySpeed'],
            speed: slider_options['speed'],
            infinite: slider_options['infinite'],
            cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
            touchThreshold: 100,
            rtl: slider_options['rtl'],
            slidesToShow: 3,
            arrows: false,
            dots: true,
            appendDots: dots_container,
            responsive: [{
                breakpoint: 1025,
                settings: {
                    slidesToShow: 2,
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }]
        });

        jQuery(window).on('scroll', function () {
            $scope.find('.marketum_motion_effect_on').each(function () {
                let container_top = jQuery(this).offset().top,
                    visible_area_top = jQuery(window).scrollTop(),
                    visible_area_bottom = visible_area_top + (jQuery(window).height() - 100);

                if (container_top < visible_area_bottom) {
                    jQuery(this).addClass('visible');
                }
            });
        });
    });

    // ------------------------------------ //
    // ------ Projects Slider Widget ------ //
    // ------------------------------------ //
    elementorFrontend.hooks.addAction('frontend/element_ready/marketum_projects_slider.default', customCursor);
    elementorFrontend.hooks.addAction('frontend/element_ready/marketum_projects_slider.default', function ($scope) {
        let causesSlider = $scope.find('.marketum_slider_slick'),
            slider_options = causesSlider.data('slider-options'),
            dots_container = $scope.find('.marketum_slider_arrows');

        if (!causesSlider.length) return;

        $scope.find('.marketum_offset_container').width(jQuery(window).width());

        causesSlider.on('init', function (event, slick) {
            $scope.find('.slick-dots li').each(function () {
                jQuery(this).prepend('<svg aria-hidden="true" class="marketum_progress" width="70" height="70" viewBox="0 0 70 70"><path class="marketum_progress__path" d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z" pathLength="1"></path></svg>');
            });
        });

        causesSlider.slick({
            pauseOnHover: slider_options['pauseOnHover'],
            autoplay: slider_options['autoplay'],
            autoplaySpeed: slider_options['autoplaySpeed'],
            speed: slider_options['speed'],
            infinite: slider_options['infinite'],
            cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
            touchThreshold: 100,
            centerMode: true,
            rtl: slider_options['rtl'],
            slidesToShow: 3,
            arrows: false,
            dots: true,
            appendDots: dots_container,
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }]
        });
    });

    // ----------------------------------------- //
    // ------ Linked Item Carousel Widget ------ //
    // ----------------------------------------- //
    elementorFrontend.hooks.addAction('frontend/element_ready/marketum_linked_item_slider.default', customCursor);
    elementorFrontend.hooks.addAction('frontend/element_ready/marketum_linked_item_slider.default', function ($scope) {
        let causesSlider = $scope.find('.marketum_slider_slick'),
            slider_options = causesSlider.data('slider-options'),
            dots_container = $scope.find('.marketum_slider_arrows'),
            prev = $scope.find('.marketum_causes_slider_navigation_container .marketum_prev'),
            next = $scope.find('.marketum_causes_slider_navigation_container .marketum_next'),
            status = $scope.find('.marketum_slider_counter'),
            current_cont = status.find('.marketum_current_slide'),
            all_cont = status.find('.marketum_all_slides'),
            indicator = status.find('.marketum_separator');

        if (!causesSlider.length) return;

        causesSlider.on('init', function (event, slick) {
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

        causesSlider.on('init afterChange', function (event, slick, currentSlide) {
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

        $scope.find('.marketum_offset_container').width(jQuery(window).width());

        causesSlider.slick({
            pauseOnHover: slider_options['pauseOnHover'],
            autoplay: slider_options['autoplay'],
            autoplaySpeed: slider_options['autoplaySpeed'],
            speed: slider_options['speed'],
            infinite: slider_options['infinite'],
            cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
            touchThreshold: 100,
            rtl: slider_options['rtl'],
            slidesToShow: 4,
            slidesToScroll: 4,
            arrows: false,
            dots: true,
            appendDots: dots_container,
            responsive: [{
                breakpoint: 1025,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }]
        });
    });
});
