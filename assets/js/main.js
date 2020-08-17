"use strict";
function initComparisons() {
    var x, i;
    x = document.getElementsByClassName("img-comp-overlay");
    for (i = 0; i < x.length; i++) {
        compareImages(x[i]);
    }
    function compareImages(img) {
        var slider,
            img,
            clicked = 0,
            w,
            h;
        w = img.offsetWidth;
        h = img.offsetHeight;
        img.style.width = w / 2 + "px";
        slider = document.createElement("DIV");
        slider.setAttribute("class", "img-comp-slider");
        img.parentElement.insertBefore(slider, img);
        slider.style.top = h / 2 - slider.offsetHeight / 2 + "px";
        slider.style.left = w / 2 - slider.offsetWidth / 2 + "px";
        slider.addEventListener("mousedown", slideReady);
        window.addEventListener("mouseup", slideFinish);
        slider.addEventListener("touchstart", slideReady);
        window.addEventListener("touchcancel", slideFinish);

        function slideReady(e) {
            e.preventDefault();
            clicked = 1;
            window.addEventListener("mousemove", slideMove);
            window.addEventListener("touchmove", slideMove);
        }
        function slideFinish() {
            clicked = 0;
        }
        function slideMove(e) {
            var pos;
            if (clicked == 0) return false;
            pos = getCursorPos(e);
            if (pos < 0) pos = 0;
            if (pos > w) pos = w;
            slide(pos);
        }

        function getCursorPos(e) {
            var a,
                x = 0;
            e = e || window.event;
            a = img.getBoundingClientRect();
            x = e.pageX - a.left;
            x = x - window.pageXOffset;
            return x;
        }
        function slide(x) {
            img.style.width = x + "px";
            slider.style.left = img.offsetWidth - slider.offsetWidth / 2 + "px";
        }
    }
}

initComparisons();

// Плавное появление
const animItems = document.querySelectorAll('.anim-items');

if (animItems.length > 0) {
    window.addEventListener("scroll", animOnScroll);

    function animOnScroll() {
        for (let i = 0; i < animItems.length; i++) {
            const animItem = animItems[i];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;
            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }
            if (pageYOffset > animItemOffset - animItemPoint && pageYOffset < animItemOffset + animItemHeight) {
                animItem.classList.add('_active');
            } else {
                if (!animItem.classList.contains("anim-no-hide")) {
                    animItem.classList.remove('_active');
                }
            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft
        };
    }
    setTimeout(animOnScroll, 300);
}

let acc = document.querySelectorAll(".faq__question");
let i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        let panel = this.nextElementSibling;

        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
} // Менять цвет SVG картинки


$('img.img-svg').each(function () {
    var $img = $(this);
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');
    $.get(imgURL, function (data) {
        var $svg = $(data).find('svg');

        if (typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass + ' replaced-svg');
        }

        $svg = $svg.removeAttr('xmlns:a');

        if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
        }

        $img.replaceWith($svg);
    }, 'xml');
});
let burgerSpan = document.querySelector('.header-top__burger');
let headerMenu = document.querySelector('.header-menu');

function showMenu() {
    headerMenu.classList.toggle('show-menu');
    burgerSpan.classList.toggle('burger-active-after');
    burgerSpan.classList.toggle('burger-active-before');
    burgerSpan.classList.toggle('burger-active-span');
} // console.log(burgerSpan);


burgerSpan.addEventListener("click", showMenu); // обработка формы

$(function () {
    document.getElementById('ajax-contact-form').addEventListener('submit', function (evt) {
        var http = new XMLHttpRequest(),
            f = this;
        var th = $(this);
        evt.preventDefault();
        http.open("POST", "contact.php", true);

        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                location = http.responseURL;
                console.log(location); // alert(http.responseURL);

                if (http.responseText.indexOf(f.nameFF.value) == 0) {
                    // очистить поля формы, если в ответе первым словом будет имя отправителя (nameFF)
                    th.trigger("reset");
                }
            }
        };

        http.onerror = function () {
            alert('Ошибка, попробуйте еще раз');
        };

        http.send(new FormData(f));
    }, false);
}); // якорное меню

function anchorMenu(event) {
    event.preventDefault();
    let id = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({
        scrollTop: top
    }, 1000);
};
$("#menu").on("click", "a", anchorMenu);
$("#footer-menu").on("click", "a", anchorMenu);
$('.header-content__button').on("click", anchorMenu);