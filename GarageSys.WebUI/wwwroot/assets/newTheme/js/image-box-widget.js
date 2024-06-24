"use strict";

jQuery(window).on('elementor/frontend/init', function () {

    // ------------------------------ //
    // ------ Image Box Widget ------ //
    // ------------------------------ //
    elementorFrontend.hooks.addAction('frontend/element_ready/marketum_image_box.default', function ($scope) {
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
    // ------ Services Widget ------ //
    // ----------------------------- //
    elementorFrontend.hooks.addAction('frontend/element_ready/marketum_services.default', function ($scope) {
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

    // ---------------------------- //
    // ------ Careers Widget ------ //
    // ---------------------------- //
    elementorFrontend.hooks.addAction('frontend/element_ready/marketum_careers.default', function ($scope) {
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

    // -------------------------- //
    // ------ Cases Widget ------ //
    // -------------------------- //
    elementorFrontend.hooks.addAction('frontend/element_ready/marketum_cases.default', function ($scope) {
        jQuery(window).on('scroll', function () {
            $scope.find('.marketum_motion_effect_on').each(function () {
                let container_top = jQuery(this).offset().top,
                    visible_area_top = jQuery(window).scrollTop(),
                    visible_area_bottom = visible_area_top + (jQuery(window).height());

                if (container_top < visible_area_bottom) {
                    jQuery(this).addClass('visible');
                }
            });
        });
    });
});