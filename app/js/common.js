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
    });
    
    $(".calculator_price").each(function(){
        $(this).find(".calculator_price__item").slice(0, 6).css({display: 'flex'});
    });
    $(".price_show__link").on('click', function(e){
        e.preventDefault();
         $(this).closest(".calculator_price").find(".calculator_price__item").css({display: 'flex'});
    });
     $(function(){
        $('.form_counter__button.less').click(function () {
                var $input = $(this).parent().find('.form_counter__input');
                var count = parseInt($input.val()) - 1;
                count = count < 1 ? 1 : count;
                $input.val(count);
                $input.change();
                return false;
            });
            $('.form_counter__button.more').click(function () {
                var $input = $(this).parent().find('.form_counter__input');
                $input.val(parseInt($input.val()) + 1);
                $input.change();
                return false;
            });
    });
    
});
