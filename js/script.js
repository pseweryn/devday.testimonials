/* Author:

*/

$(function () {
    var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
    var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
    var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
    var is_safari = navigator.userAgent.indexOf("Safari") > -1;
    var is_mobile = document.body.clientWidth < 768;

    //var offsetnote = is_chrome || is_explorer ? 0 : 78;
    var $main = $('#main');
    var $sections = $main.children('div.section');
    var $close = $('.close');
    var current = 0;
    var $curr = "";
    var $next = "";
    var isAnimating = false;
    var endCurr = false;
    var endNext = false;
    var animEndEventNames = {
        'WebkitAnimation': 'webkitAnimationEnd',
        'OAnimation': 'oAnimationEnd',
        'msAnimation': 'MSAnimationEnd',
        'animation': 'animationend'
    };
    // animation end event name
    var animEndEventName = animEndEventNames[Modernizr.prefixed('animation')];
    // support css animations
    var support = Modernizr.cssanimations;

    function dirtyTopHack() {
        if (is_chrome || is_explorer || is_safari) {
            $('.section').css('top', '0');
        }
    }

    function setSectionClasses() {
        $sections.each(function () {
            var $section = $(this);
            $section.data('originalClassList', $section.attr('class'));
        });

        $sections.eq(current).removeClass().addClass('large-12 columns alpha60 section').addClass('section-current');
    }

    function setArrowClasses(ind) {
        $('.arrowBack').removeClass().addClass('arrowBack icon bg' + ind + 'B');
        $('.arrow').removeClass().addClass('arrow icon bg' + ind + 'A');
    }

    function setCloseClasses(ind) {
        $('#closeBack').removeClass().addClass('icon closeC' + ind + '');
    }

    function hideHeaderElems() {
        $('.logoContainer > div').not('.close').css('visibility', '');
        $('#closeBack').removeClass().addClass('icon');
        $('.closeFront').fadeOut();
    }

    function initLightbox() {
        $('.pic').magnificPopup({
            delegate: 'a',
            type: 'image',
            gallery: {
                enabled: true,
                navigateByImgClick: true
            }
        });
    }

    function tilesClick() {

        $('.tileContainer > div').click(function () {
            if (isAnimating) {
                return false;
            }
            var tile_ind = $(this).attr('data-index');
            $('.logoContainer > div').not('.close').css('visibility', 'hidden');
            $('#closeBack').addClass('closeC' + tile_ind + '');
            setArrowClasses(tile_ind);
            openSection('top', tile_ind);
        })
    }

    function closeClick() {
        $close.click(function () {
            if (isAnimating) {
                return false;
            }
            $('.arrowBack').removeClass().addClass('arrowBack');
            $('.arrow').removeClass().addClass('arrow'); ;
            openSection('close', 0);
        })
    }

    function filtersClick() {
        $('.filters h4').click(function () {
            $('.filters h4').removeClass('lightBlue');
            var $h = $(this);
            var $reviews = $h.parent().next();
            if ($h.hasClass('all')) {
                $reviews.find('.review').show();
            } else {
                var cl = $h.attr('class');
                $reviews.find('.review').hide();
                $reviews.find('.review.' + cl + '').show();
            }
            $h.addClass('lightBlue');
        })
    }

    function formRadioChange() {
        $('input[type="radio"]').change(function () {
            if ($(this).is(':checked')) {
                $('input[type="radio"]').not($(this)).prop('checked', false);
                setIconDivBackground($(this).parent().prev());
            }
        })
    }

    function formIconClick() {
        $('.f-ico').click(function () {
            var $clicked = $(this);
            var $radio = $clicked.next().find('input[type="radio"]');
            $radio.prop('checked', true);
            $('input[type="radio"]').not($radio).prop('checked', false);
            setIconDivBackground($clicked);
        })
    }

    function setIconDivBackground($div) {
        $div.css('background-color', 'rgb(116, 192, 67)');
        $('.f-ico').not($div).css('background-color', '#868686');
    }

    function arrowClick() {
        $('.arrowContainer').click(function () {
            if (isAnimating) {
                return false;
            }
            var $a = $(this);
            var $parent = $a.parent();
            var $currentSection = $('#main').find('.section-current');
            if ($a.hasClass('left')) {
                var $prev = $currentSection.prev();
                var prev_ind = $prev.attr('data-index');
                if ($prev.hasClass('alpha60')) {
                    prev_ind = 4;
                }
                setCloseClasses(prev_ind);
                setArrowClasses(prev_ind);
                openSection('left', prev_ind);
            }
            else {
                var $nextSection = $currentSection.next();
                var next_ind = $nextSection.attr('data-index');
                if (!next_ind) {
                    next_ind = 1;
                }
                setCloseClasses(next_ind);
                setArrowClasses(next_ind);
                openSection('right', next_ind);
            }
        })
    }

    function openSection(animation, index) {

        isAnimating = true;

        $curr = $sections.eq(current);
        current = index;

        $next = $sections.eq(current).addClass('section-current'),
		outClass = '', inClass = '';

        if (index == 0) {
            hideHeaderElems();
        }
        else {
            $('.closeFront').delay(800).fadeIn('slow');
        }

        switch (animation) {

            case 'close':
                outClass = 'rotateFoldBottom';
                inClass = 'rotateUnfoldTop';
                break;
            case 'top':
                outClass = 'rotateFoldTop';
                inClass = 'rotateUnfoldBottom';
                break;
            case 'right':
                outClass = 'rotateFoldLeft';
                inClass = 'rotateUnfoldRight';
                break;
            case 'left':
                outClass = 'rotateFoldRight';
                inClass = 'rotateUnfoldLeft';
                break;
        }

        $curr.addClass(outClass).bind(animEndEventName, onInAnimation);
        $next.addClass(inClass).bind(animEndEventName, onOutAnimation);

        if (!support) {
            onEndAnimation($curr, $next);
        }

    }

    function onInAnimation() {

        endCurr = true;
        if (endNext) {
            onEndAnimation($curr, $next);
        }

        $curr.unbind(animEndEventName, onInAnimation);
    }

    function onOutAnimation() {

        endNext = true;
        if (endCurr) {
            onEndAnimation($curr, $next);
        }

        $next.unbind(animEndEventName, onOutAnimation);
    }

    function onEndAnimation($outsection, $insection) {
        endCurr = false;
        endNext = false;
        resetSection($outsection, $insection);
        isAnimating = false;
    }

    function noAnimation() {
        isAnimating = true;
        endCurr = true;
        endNext = true;
        endCurr = false;
        endNext = false;
        resetSection($curr, $next);
        isAnimating = false;
    }

    function resetSection($outsection, $insection) {
        $outsection.attr('class', $outsection.data('originalClassList'));
        $insection.attr('class', $insection.data('originalClassList') + ' section-current');
    }

    function reloadClick() {
        $('.reload').click(function () {
            $('.f-msg').show();
            $('.f-confirmation').hide();
        })
    }

    function sendButtonClick() {
        $('.button').click(function () {
            $('#env').addClass('env-animating').addClass('moveFromBottomFade');

            setTimeout(function () {
                $('#env').addClass('moveToRightFade');
                $('.f-msg').hide();
                $('.f-confirmation').show();
            }, 300)

            setTimeout(function () {
                $('#env').removeClass().addClass('large-12 small-12');
            }, 600)
        })
    }

    function textareaFocus() {
        $("textarea")
          .focus(function () {
              if (this.value === this.defaultValue) {
                  this.value = '';
              }
          })
          .blur(function () {
              if (this.value === '') {
                  this.value = this.defaultValue;
              }
          });
    }

    function init() {

        dirtyTopHack();
        setSectionClasses();

        closeClick();
        filtersClick();
        formIconClick();
        arrowClick();
        tilesClick();
        sendButtonClick();
        reloadClick();

        formRadioChange();
        textareaFocus();

        initLightbox();
    }

    init();
}); 



