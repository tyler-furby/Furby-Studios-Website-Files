var createBouncyButtons = (function() {
    function createButton(el) {
        var pathEl = el.querySelector('path');
        var spanEl = el.querySelector('span');

        function hover() {
            anime.remove([pathEl, spanEl]);
            anime({
                targets: pathEl,
                d: 'M10,10 C10,10 50,7 90,7 C130,7 170,10 170,10 C170,10 172,20 172,30 C172,40 170,50 170,50 C170,50 130,53 90,53 C50,53 10,50 10,50 C10,50 8,40 8,30 C8,20 10,10 10,10 Z',
                elasticity: 700,
                offset: 0
            });
            anime({
                targets: spanEl,
                scale: 1.15,
                duration: 800,
                offset: 0
            });
        }

        function down() {
            anime.remove([pathEl, spanEl]);
            anime({
                targets: pathEl,
                d: 'M10,10 C10,10 50,9.98999977 90,9.98999977 C130,9.98999977 170,10 170,10 C170,10 170.009995,20 170.009995,30 C170.009995,40 170,50 170,50 C170,50 130,50.0099983 90,50.0099983 C50,50.0099983 10,50 10,50 C10,50 9.98999977,40 9.98999977,30 C9.98999977,20 10,10 10,10 Z',
                elasticity: 700,
                offset: 0
            });
            anime({
                targets: spanEl,
                scale: 1,
                duration: 800,
                offset: 0
            });
        }
        el.onmouseenter = hover;
        el.onmousedown = down;
        el.onmouseleave = down;
    }

    var buttonEls = document.querySelectorAll('.button');

    for (var i = 0; i < buttonEls.length; i++) {
        var el = buttonEls[i];
        createButton(el);
    }

})();

var logoAnimation = (function() {

    var logoEl = document.querySelector('.logo-animation');
    var pathEls = document.querySelectorAll('.logo-animation path:not(.icon-curve)');
    var innerWidth = window.innerWidth;
    var maxWidth = 740;
    var logoScale = innerWidth <= maxWidth ? innerWidth / maxWidth : 1;
    var logoTimeline = anime.timeline({
        autoplay: false
    });

    logoEl.style.transform = 'translateY(50px) scale(' + logoScale + ')';

    for (var i = 0; i < pathEls.length; i++) {
        var el = pathEls[i];
        el.setAttribute('stroke-dashoffset', anime.setDashoffset(el));
    }

    logoTimeline
        .add({
            targets: '.icon',
            opacity: {
                value: 1,
                duration: 10,
                delay: 0,
                easing: 'linear'
            },
            translateY: {
                value: 60,
                duration: 800
            },
            delay: 800,
            offset: 0
        })
        .add({
            targets: '.icon-line',
            strokeDashoffset: [{
                value: [anime.setDashoffset, anime.setDashoffset],
                duration: 0
            }, {
                value: 0,
                duration: 900,
                easing: 'easeInOutQuart'
            }],
            strokeWidth: {
                value: [8, 2],
                delay: 300,
                duration: 900,
                easing: 'easeInQuad'
            },
            stroke: {
                value: ['#F4D8CD', function(el) {
                    return anime.getValue(el, 'stroke');
                }],
                duration: 800,
                delay: 100,
                easing: 'easeInQuad'
            },
            offset: 0
        })
        .add({
            targets: ['.icon-text path', '.icon-text polygon'],
            translateY: [50, 0],
            opacity: {
                value: [0, 1],
                duration: 100,
                easing: 'linear'
            },
            delay: function(el, i, t) {
                return 850 + (i * 20);
            },
            offset: 0
        })
        .add({
            targets: ['.logo-animation', '.description', '.button', '.credits'],
            translateY: [50, 0],
            scale: 1,
            opacity: 1,
            easing: 'easeOutExpo',
            delay: function(el, i, l) {
                return i * 80;
            },
            offset: '-=250'
        })
        .add({
            targets: '.version',
            innerHTML: parseFloat(anime.version, 10),
            duration: 2500,
            easing: 'easeOutCubic',
            begin: function(a) {
                a.animatables[0].target.classList.add('highlighted');
            },
            update: function(a) {
                var value = a.animatables[0].target.innerHTML;
                value = parseFloat(value).toFixed(1);
                a.animatables[0].target.innerHTML = value;
            },
            complete: function(a) {
                a.animatables[0].target.classList.remove('highlighted');
            },
            offset: '-=500'
        })
        .add({
            targets: '.date',
            innerHTML: function() {
                var d = new Date();
                return d.getFullYear();
            },
            round: 1,
            duration: 2500,
            easing: 'easeOutCubic',
            begin: function(a) {
                a.animatables[0].target.classList.add('highlighted');
            },
            complete: function(a) {
                a.animatables[0].target.classList.remove('highlighted');
            },
            offset: '-=2000'
        });


    function init() {
        document.body.classList.add('ready');
        // logoTimeline.seek(4700);
        logoTimeline.play();
    }

    return {
        init: init
    };

})();

window.onload = function() {
    logoAnimation.init();
    fireworks.setCanvasSize();
};
