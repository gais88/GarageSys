"use strict";

function initFloatPlaceholderInput() {
    const inputs = [
        '.widget_search input[placeholder]:not([placeholder=""])',
        '.wp-block-search input[placeholder]:not([placeholder=""])',
        '.wpforms-form input[placeholder]:not([placeholder=""])',
        '.wpforms-form textarea[placeholder]:not([placeholder=""])',
        '.wpcf7-form input[placeholder]:not([placeholder=""])',
        '.wpcf7-form textarea[placeholder]:not([placeholder=""])',
        '.woocommerce input[placeholder]:not([placeholder=""]):not([type=number])',
        '.woocommerce textarea[placeholder]:not([placeholder=""])',
        '.post-comments-wrapper input[placeholder]:not([placeholder=""])',
        '.post-comments-wrapper textarea[placeholder]:not([placeholder=""])',
        '.mc4wp-form input[placeholder]:not([placeholder=""])',
        '.mc4wp-form textarea[placeholder]:not([placeholder=""])',
        '.site-search input[placeholder]:not([placeholder=""])',
        '.consultum-no-result-search-form input[placeholder]:not([placeholder=""])',
        '.post-password-form input[placeholder]:not([placeholder=""])'
    ];
    const $inputs = jQuery(inputs.join(', '));
    $inputs.each(function() {
        if(jQuery(this)[0].name == 'coupon_code' && jQuery(this).parents('td.actions').length || jQuery(this)[0].name == 'min_price' || jQuery(this)[0].name == 'max_price') {
            return;
        }
        if(!jQuery(this).parent('.input-floating-wrap').length) {
            jQuery(this).wrap('<span class="input-floating-wrap"></span>');
            let placeholder = jQuery(this).attr('placeholder');
            jQuery(this).after('<span class="floating-placeholder">' + placeholder + '</span>');
        }
    });
}

// ---------------------- //
// --- Document Ready --- //
// ---------------------- //
jQuery(document).ready(function () {
    // Parallax
    background_image_parallax(jQuery('[data-parallax="scroll"]'), 0.7);

    // aside dropdown
    function asideDropdown() {
        let dropdown = jQuery('.marketum_aside_dropdown');

        if (!dropdown.length) return;

        let trigger = jQuery('.marketum_side_panel_button');
        let	close = jQuery('.marketum_aside_dropdown_close');

        trigger.on('click', function(){
            dropdown.addClass('active');
            trigger.addClass('is-active');
        });

        close.on('click', function(){
            dropdown.removeClass('active');
            trigger.removeClass('is-active');
        });

        jQuery(document).on('click', function(event) {
            if (jQuery(event.target).closest('.marketum_side_panel_button, .marketum_aside_dropdown_inner').length) return;
            dropdown.removeClass('active');
            trigger.removeClass('is-active');
            event.stopPropagation();
        });
    }

    asideDropdown();

    initFloatPlaceholderInput();

    function menuMobile() {
        let dropdown = jQuery('.marketum_menu_mobile_container');

        let trigger = jQuery('.marketum_menu_trigger');
        let	close = jQuery('.marketum_menu_mobile_close');

        trigger.on('click', function(){
            dropdown.addClass('marketum_menu_mobile_active');
            trigger.addClass('is-active');
        });

        close.on('click', function(){
            dropdown.removeClass('marketum_menu_mobile_active');
            trigger.removeClass('is-active');
        });

        jQuery(document).on('click', function(event) {
            if (jQuery(event.target).closest('.marketum_menu_trigger, .marketum_menu_mobile_container').length) return;
            dropdown.removeClass('marketum_menu_mobile_active');
            trigger.removeClass('is-active');
            event.stopPropagation();
        });
    }

    menuMobile();

    // Background Image CSS From JS
    if (jQuery('.marketum_js_bg_image').length) {
        jQuery('.marketum_js_bg_image').each(function(){
            jQuery(this).css('background-image', 'url('+jQuery(this).attr('data-background')+')');
        });
    }

    // Background Color CSS From JS
    if (jQuery('.marketum_js_bg_color').length) {
        jQuery('.marketum_js_bg_color').each(function(){
            jQuery(this).css('background-color', jQuery(this).attr('data-bg-color'));
        });
    }

    // Min Height CSS From JS
    if (jQuery('.marketum_js_min_height').length) {
        jQuery('.marketum_js_min_height').each(function(){
            jQuery(this).css('min-height', jQuery(this).attr('data-min-height')+'px');
        });
    }

    jQuery('.elementor-widget-wp-widget-search .search-form .search-form-icon').each(function () {
        jQuery(this).html('<svg class="icon"><svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.19 0a8.19 8.19 0 016.47 13.212l5.04 5.04a1.024 1.024 0 11-1.448 1.448l-5.04-5.04A8.19 8.19 0 118.19 0zm0 2.048a6.143 6.143 0 100 12.285 6.143 6.143 0 000-12.285z"/></svg></svg>');
    });

    // Tilt
    jQuery('.tilt-effect').tilt({
        maxTilt:        23,
        perspective:    2e3,
        easing:         "cubic-bezier(.22,.61,.36,1)"
    });

    // Tilt alter
    document.addEventListener("mousemove", parallax);
    function parallax(e){
        var moving_value = -10;
        jQuery('.tilt-part img').each(function(){
            var x = (e.clientX * moving_value) / 250;
            var y = (e.clientY * moving_value) / 250;
            moving_value = moving_value + 4;
            jQuery(this).css({
                'transform': 'translate(' + x + 'px, ' + y + 'px)'
            }).attr('data-value', moving_value);
        });
    }
});

// ------------------- //
// --- Window Load --- //
// ------------------- //
jQuery(window).on('load', function () {
    let window_width = jQuery(window).width();

    jQuery('body').css('opacity', '1');

    // Preloader
    setTimeout(function () {
        jQuery('.marketum_preloader_container').addClass('invisible');
    }, 500);

    setTimeout(function () {
        jQuery('.marketum_preloader_container').css('display', 'none');
    }, 1200);

    jQuery('.marketum_header_search_button, .marketum_menu_mobile_search').on('click', function () {
        jQuery('.marketum_header_search_overlay').addClass('visible');
        jQuery('.marketum_header_search_container').addClass('active');
    });

    jQuery('.marketum_header_search_overlay').on('click', function () {
        jQuery(this).removeClass('visible');
        jQuery('.marketum_header_search_container').removeClass('active');
    });

    jQuery('.marketum_header_search_close_button').on('click', function () {
        jQuery('.marketum_header_search_overlay').removeClass('visible');
        jQuery('.marketum_header_search_container').removeClass('active');
    });

    // Back to Top
    var marketum_scrollTrigger = 600, // px
        marketum_backToTop = function () {
            var marketum_scrollTop = jQuery(window).scrollTop();
            if (marketum_scrollTop > marketum_scrollTrigger) {
                jQuery('.marketum_back_to_top_button').addClass('show');
            } else {
                jQuery('.marketum_back_to_top_button').removeClass('show');
            }
        };
    marketum_backToTop();
    jQuery(window).on('scroll', function () {
        marketum_backToTop();
    });
    jQuery('.marketum_back_to_top_button').on('click', function (e) {
        e.preventDefault();
        jQuery('html,body').animate({
            scrollTop: 0
        }, 200);
    });

    jQuery('.elementor-widget-shortcode .sbi_photo').each(function () {
        let image_width = jQuery(this).width();

        jQuery(this).height(image_width);
    });


    jQuery('.marketum_menu_mobile_wrapper .marketum_mobile_menu li.menu-item-has-children > a').on('click', function () {
        jQuery(this).parent().toggleClass('open');
        jQuery(this).parent().children('.sub-menu').stop().slideToggle(300);
    });


    jQuery('.marketum_menu_mobile_wrapper > ul .menu-item-has-children > a').each(function () {
        jQuery(this).on('click', function (event) {
            event.preventDefault();
        });
    });

    if (window_width < 769) {
        jQuery('.marketum_portfolio_slider_widget').each(function () {
            let navigation = jQuery(this).find('.marketum_slider_navigation_container').detach();

            jQuery(this).find('.marketum_slider_slick').after(navigation);
        });

        jQuery('.marketum_time_line_widget').each(function () {
            let navigation = jQuery(this).find('.marketum_slider_navigation_container').detach();

            jQuery(this).find('.marketum_slider_slick').after(navigation);
        });
    }

    jQuery('input[type="submit"]').each(function () {
        jQuery(this).wrap('<span class="warketum_submit_button"></span>');
    });

    if (window_width >= 992) {
        jQuery('.cursor').each(function () {
            const cursor = jQuery(this);
            const slider = cursor.parents('.elementor-column').find('.elementor-image');

            function showViewCursor(event) {
                cursor.css('left', event.clientX-5).css('top', event.clientY-5);
            }

            slider.mousemove(showViewCursor);

            slider.mouseleave(function(e) {
                if(!jQuery('body').hasClass('elementor-editor-active')) {
                    slider.find('a').css({cursor: 'auto'});
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
                    slider.find('a').css({cursor: 'none'});
                    cursor.show();
                    setTimeout(function() {
                        cursor.addClass('active');
                    }, 10);
                }
            });
        });
    }
});

// --------------------- //
// --- Window Resize --- //
// --------------------- //
jQuery(window).on('resize', function () {
    let window_width = jQuery(window).width();

    // Parallax
    background_image_parallax(jQuery('[data-parallax="scroll"]'), 0.7);

    if (window_width < 769) {
        jQuery('.marketum_portfolio_slider_widget').each(function () {
            let navigation = jQuery(this).find('.marketum_slider_navigation_container').detach();

            jQuery(this).find('.marketum_slider_slick').after(navigation);
        });

        jQuery('.marketum_time_line_widget').each(function () {
            let navigation = jQuery(this).find('.marketum_slider_navigation_container').detach();

            jQuery(this).find('.marketum_slider_slick').after(navigation);
        });
    } else {
        jQuery('.marketum_portfolio_slider_widget').each(function () {
            let navigation = jQuery(this).find('.marketum_slider_navigation_container').detach();

            jQuery(this).find('.marketum_timeline_heading_and_buttons_part .col-lg-5').append(navigation);
        });

        jQuery('.marketum_time_line_widget').each(function () {
            let navigation = jQuery(this).find('.marketum_slider_navigation_container').detach();

            jQuery(this).find('.marketum_timeline_heading_and_buttons_part .col-lg-5').append(navigation);
        });
    }
});

// --------------------- //
// --- Window Scroll --- //
// --------------------- //
jQuery(window).on('scroll', function () {
    let header = jQuery('header.marketum_sticky_header_container'),
        scroll_position = jQuery(window).scrollTop();

    if (header.is('.marketum_sticky_header_off')) {} else {
        if (scroll_position > 200) {
            header.addClass('active');
        } else {
            header.removeClass('active');
        }
    }

    if (header.is('.marketum_transparent_header_off')) {} else {
        if (scroll_position > 1) {
            header.addClass('color_bg_on');
        } else {
            header.removeClass('color_bg_on');
        }
    }
});

jQuery('a[href="#"]').on('click', function(event){
    event.preventDefault();
});

jQuery('.marketum_sidebar .widget_nav_menu ul li.menu-item-has-children a').on('click', function () {
    jQuery(this).parent().toggleClass('open');
    jQuery(this).next().slideToggle(300);
});

jQuery('.footer_widget.widget_nav_menu ul li.menu-item-has-children a').on('click', function () {
    jQuery(this).parent().toggleClass('open');
    jQuery(this).next().slideToggle(300);
});

function background_image_parallax(object, multiplier){
    if ( object.length > 0 ) {
        multiplier = typeof multiplier !== 'undefined' ? multiplier : 0.5;
        multiplier = 1 - multiplier;
        var doc = jQuery(document);
        object.css({
            'background-attatchment': 'fixed'
        });
        jQuery(window).scroll(function () {
            if (jQuery(window).width() >= 992) {
                var from_top = doc.scrollTop() - object.offset().top,
                    bg_css = 'center ' + (multiplier * from_top) + 'px';
                object.css({
                    'background-position': bg_css
                });
            } else {
                object.css({
                    'background-position': ''
                });
            }
        });
    }
}