;
"use strict";
$(document).ready(function () {
    // Пользовательские функции 
    $(".mobile_menu__link.toggle").on('click', function (e) {
        e.preventDefault();
        $(".mobile_menu_list").slideToggle();
    });
    $(".home_slider").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
        arrows: false,
        centerMode: true,
        variableWidth: true,
        responsive: [
            
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                },
            },
            
        ],
    })
});
