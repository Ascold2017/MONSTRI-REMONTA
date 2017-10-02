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

    //Счетчик и сбор информации
    $(function () {
        //Инпут с итоговой стоимостью за все позиции
        var total_input = $(".price_sum_container .form_counter__input");
        //Стоимость кв.м начальная
        var perM2 = parseFloat($(".home__price span").text());
        //Проверям - существует ли
        if (isNaN(perM2)) {
            console.log(perM2);
            total_input.val(0);

        } else {
            total_input.val(perM2);
        }

        var sumCounter = function ($this, count) {


            //Стоимость одной позиции - инпут
            var price_one = $this.closest(".price__counter").parent().find(".price__price").text();
            //Вычленяем число из текста с помощью регулярных выражений
            var re = /\D+/ig;
            price_one = price_one.replace(re, '');
            //Цена одной позиции (суммарно) - инпут
            var sum_one = $this.closest(".price__counter").parent().find(".price__total .form_counter__input");


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
            
            //Проверка - существует ли цена начальная
            if (!(isNaN(perM2))) {
                total_input.val(perM2);
            } else {
                total_input.val(0);
            }
            //И выводим сумму за все позиции
            total_input.val(parseFloat(total_input.val()) + sum_total);
            total_input.change();
        }
        //Стоимость за все выбранные поля
        var collectOrder = function () {
            var allItems = $(".calculator_price_list .calculator_price__item");
            var inputForSelectItems = $(".calculator_input__hidden");

            var selectInfo = '';
            allItems.each(function () {
                var $this = $(this);
                var selectCount = $this.find(".form_counter__input").val();
                var first = true;
                if (selectCount > 0) {

                    selectInfo +=
                        $this.find(".price__title").text() + ' ' +
                        $this.find(".price__counter .form_counter__input").val() +
                        $this.find(".price__em").text() + ' ' +
                        $this.find(".price__total .form_counter__input").val() + '\n';
                }
                inputForSelectItems.attr('value', selectInfo);
                inputForSelectItems.change();
            })
        }

        $(".form_counter__input").on('keyup', function () {
            $(this).change();
            sumCounter($(this), $(this).val());
            collectOrder();
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
            collectOrder();
            return false;
        });
        //Клик увеличить кол-во по позиции
        $('.form_counter__button.more').click(function () {
            var $input = $(this).parent().find('.form_counter__input');
            var count = 0;
            var currentVal = $input.val();
            if ((currentVal >= 1) & (!($(this).parent().hasClass("zero-one")))) {
                count = parseInt(currentVal) + 1;
            } else {
                count++;
            }
            $input.val(count);
            $input.change();
            sumCounter($(this), count);
            collectOrder();
            return false;
        });

        $(".price_delete__link").on('click', function (e) {
            e.preventDefault();
            $(".form_counter__input").val(0);
            collectOrder();
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
