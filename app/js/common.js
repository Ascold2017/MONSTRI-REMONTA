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
    $(function () {
        var first = true;
        var slickI = function () {

            $(".home_slider").slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                //infinite: false,
                dots: false,
                arrows: false,
                centerMode: true,
                centerPadding: 60,
                variableWidth: true

            });
        };

        if ($(window).width() <= '900') {

            slickI();
            first = false;
        }

        $(window).resize(function () {
            if (($(window).width() <= 900) & (first)) {

                slickI();

                first = false;
            } else {
                if ((!first) & ($(document).width() > '900')) {
                    $(".home_slider").slick('unslick');
                    first = true;
                }
            }
        });



    });

    //Lazy load выпадающий список
    $(function () {
        $(".calculator_price").each(function () {
            $(this).find(".calculator_price__item").slice(0, 6).addClass("active");
        });
        $(".price_show__link").on('click', function (e) {
            e.preventDefault();
            $(this).closest(".calculator_price").find(".calculator_price__item").slice(6, this.length).toggleClass("active");
        });
    })

    //Счетчик 
    $(function () {

        $(".form_counter__input").on('keyup', function () {
            $(this).change();
        });

        //Клик уменьшить кол-во
        $('.form_counter__button.less').click(function () {
            //Уменьшаем кол-во в счетчике по позиции
            var $input = $(this).parent().find('.form_counter__input');
            var count = parseInt($input.val()) - 1;
            count = count < 0 ? 0 : count;
            $input.val(count);
            $input.change();
            return false;
        });
        //Клик увеличить кол-во по позиции
        $('.form_counter__button.more').click(function () {
            var $input = $(this).parent().find('.form_counter__input');
            var count = 0;
            var currentVal = $input.val();
            count = parseInt(currentVal) + 1;
            $input.val(count);
            $input.change();
            return false;
        });

        $(".form_counter__input.hidden").on('click', function () {
            var $this = $(this);
            $this.parent().toggleClass("check");
            if ($this.is(':checked')) {
                $this.attr('value', '1');
            } else {
                $this.attr('value', '0');
            }
            $this.change();
        });


        $(".price_delete__link").on('click', function (e) {
            e.preventDefault();
            $(".form_counter__input").val(0);
        })
    });

    //Адаптивность прайс листа
    $(function () {

        //Добавляет подписи
        var appendTitles = function (first) {
            if (($(window).width() <= '630') & (first)) {
                $(".calculator_price__item:not(.title)").each(function () {
                    $(".calculator_price__item.title  .price__em:eq(0)").clone().prependTo($(this).find(".price__em"));
                    $(".calculator_price__item.title  .price__price:eq(0)").clone().prependTo($(this).find(".price__price"));
                    $(".calculator_price__item.title  .price__counter:eq(0)").clone().prependTo($(this).find(".price__counter"));
                    $(".calculator_price__item.title  .price__total:eq(0)").clone().prependTo($(this).find(".price__total"));

                });
            }
        }
        //Удаляет подписи
        var deleteTitles = function (first) {
            if (($(window).width() > '630') & (!first)) {
                $(".calculator_price__item:not(.title)").each(function () {
                    $(this).find(".price__em").remove(".price__em .price__em");
                    $(this).find(".price__price").remove(".price__price .price__price");
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

    //Выбор дома
    $(function () {
        var building_input = $('.bulding_hidden__input');
        $(".building__item").on('click', function () {
            $(this).find(".building__img").addClass("active").parent().siblings().find(".building__img").removeClass("active");
            var value = $(this).find(".building__title").text()
            building_input.val(value);
            building_input.attr('value', value);
            building_input.change();
        })
    });
    //Лампочки
    $(function () {
        $(".header_menu__item").on('click', function () {
            $(this).find(".header_menu__link")[0].click();
        })
    });
   
});
