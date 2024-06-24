"use strict";

jQuery(window).on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/marketum_video.default', function ($scope) {
        let button = $scope.find('.marketum_video_trigger_button'),
            video_popup = $scope.find('.marketum_video_container'),
            video_container = $scope.find('.marketum_video_wrapper'),
            close_popup_layer = $scope.find('.marketum_close_popup_layer'),
            video_src = jQuery(video_container).attr('data-src'),
            video_height,
            video_width,
            k = 16/9;

        button.fancybox();

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