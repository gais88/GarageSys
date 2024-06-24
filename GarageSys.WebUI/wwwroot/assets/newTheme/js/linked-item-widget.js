"use strict";

jQuery(window).on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/marketum_linked_item.default', function ($scope) {
        $scope.find('.marketum_linked_item_widget').each(function () {
            let container = jQuery(this).find('.marketum_linked_item_wrapper'),
                cont_width = container.width(),
                cont_height = container.height();

            container.find('.marketum_linked_item_up_title').width(cont_height).height(cont_width);
        });
    });

    // ------------------------------- //
    // ------ Price Item Widget ------ //
    // ------------------------------- //
    elementorFrontend.hooks.addAction('frontend/element_ready/marketum_price_item.default', function ($scope) {
        $scope.find('.marketum_best_offer_yes').each(function () {
            let container = jQuery(this),
                cont_width = container.width(),
                cont_height = container.height();

            container.find('.marketum_best_offer_container').width(cont_height)/*.height(cont_width)*/;
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
});