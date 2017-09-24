;
"use strict";
$(document).ready(function () {
    // Пользовательские функции 
    //Мобильное меню
    $(".mobile_menu__link.toggle").on('click', function (e) {
        e.preventDefault();
        $(".mobile_menu_list").slideToggle();
    });
    //Слайдерна главной странице
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
    //Lazy load выпадающий список
    $(function () {
        $(".calculator_price").each(function () {
            $(this).find(".calculator_price__item").slice(0, 6).css({
                display: 'flex'
            });
        });
        $(".price_show__link").on('click', function (e) {
            e.preventDefault();
            $(this).closest(".calculator_price").find(".calculator_price__item").css({
                display: 'flex'
            });
        });
    })

    //Счетчик
    $(function () {
        $('.form_counter__button.less').click(function () {
            var price = $(this).closest(".price__counter").parent().find(".price__price").text();
            var sum = $(this).closest(".price__counter").parent().find(".price__total .form_counter__input");
            console.log(sum);
            console.log(price);
            var $input = $(this).parent().find('.form_counter__input');
            var count = parseInt($input.val()) - 1;
            count = count < 1 ? 1 : count;
            $input.val(count);
            sum.val(count * price);
            sum.change();
            $input.change();
            return false;
        });
        $('.form_counter__button.more').click(function () {
            var price = $(this).closest(".price__counter").parent().find(".price__price").text();
            var sum = $(this).closest(".price__counter").parent().find(".price__total .form_counter__input");
            var $input = $(this).parent().find('.form_counter__input');
            var count = parseInt($input.val()) + 1;
             sum.val(count * price);
             $input.val(count);
            sum.change();
            $input.change();
            return false;
        });
    });
    //Адаптивность прайс листа
    $(function () {
        var title_em = $(".calculator_price__item.title .price__em:eq(0)").text() + ':  ';
        var title_price = $(".calculator_price__item.title .price__price:eq(0)").text() + ':  ';

        //Добавляет подписи
        var appendTitles = function (first) {
            if (($(window).width() <= '630') & (first)) {
                console.log('!ok');
                $(".calculator_price__item:not(.title)").each(function () {
                    $(this).find(".price__em").prepend(title_em);
                    $(this).find(".price__price").prepend(title_price);
                    $(".calculator_price__item.title  .price__counter:eq(0)").clone().prependTo($(this).find(".price__counter"));
                    $(".calculator_price__item.title  .price__total:eq(0)").clone().prependTo($(this).find(".price__total"));
                   
                });
            }
        }
        //Удаляет подписи
        var deleteTitles = function (first) {
            if (($(window).width() > '630') & (!first)) {
                console.log('ok!');
                $(".calculator_price__item:not(.title)").each(function () {
                    var text = $(this).find(".price__em").text();
                    text = text.replace(title_em, '');
                    $(this).find(".price__em").text(text);

                    text = $(this).find(".price__price").text();
                    text = text.replace(title_price, '');
                    $(this).find(".price__price").text(text);
                    
                    $(this).find(".price__counter").remove(".price__counter .price__counter");
                    $(this).find(".price__total").remove(".price__total .price__total");

                });
            }
        }
        //Вызываем при загрузке странице
        appendTitles(true);
        deleteTitles(true);
        //И по ресайзу
        var first = false;
        window.onresize = function () {
            if ($(window).width() <= '630') {
                appendTitles(first);
                first = false;
            } else {

                deleteTitles(first);
                first = true;
            }
        }
    });

});
