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
        centerPadding: 60,
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
            $(this).find(".calculator_price__item").slice(0, 6).addClass("active");
        });
        $(".price_show__link").on('click', function (e) {
            e.preventDefault();
            $(this).closest(".calculator_price").find(".calculator_price__item").addClass("active");
        });
    })

    //Счетчик
    $(function () {


        var sumCounter = function ($this, count) {

            //Стоимость одной позиции - инпут
            var price_one = $this.closest(".price__counter").parent().find(".price__price").text();
            //Вычленяем число из текста с помощью регулярных выражений
            var re = /\D+/ig;
            price_one = price_one.replace(re, '');
            //Цена одной позиции (суммарно) - инпут
            var sum_one = $this.closest(".price__counter").parent().find(".price__total .form_counter__input");
            //Инпут с итоговой стоимостью за все позиции
            var total_input = $this.closest(".price__counter").parent().closest(".calculator_form").find(".price_sum_container .form_counter__input");
            //Все инпуты по всем позициям - итоговые цены
            var sum_inputs = $this.closest(".price__counter").parent().closest(".calculator_form").find(".price__total .form_counter__input");
            //Меняем сумму на текущей позиции
            sum_one.val(count * price_one);
            sum_one.change();
            //Подсчитываем сумму за все позиции
            var sum_total = 0;
            sum_inputs.each(function (input, val) {
                sum_total += parseFloat($(val).val());
            })
            //И выводим ее
            total_input.val(sum_total);
            total_input.change();
        }
        $(".form_counter__input").on('keyup', function () {
            $(this).change();
            sumCounter($(this), $(this).val());
        })
        //Клик уменьшить кол-во
        $('.form_counter__button.less').click(function () {

            //Уменьшаем кол-во в счетчике по позиции
            var $input = $(this).parent().find('.form_counter__input');
            var count = parseInt($input.val()) - 1;
            count = count < 0 ? 0 : count;
            $input.val(count);
            $input.change();
            sumCounter($(this), count);
            return false;
        });
        //Клик увеличить кол-во по позиции
        $('.form_counter__button.more').click(function () {
            var $input = $(this).parent().find('.form_counter__input');
            var count = parseInt($input.val()) + 1;
            $input.val(count);
            $input.change();
            sumCounter($(this), count);
            return false;
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

});
