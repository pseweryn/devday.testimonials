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
    var $pages = $main.children('div.page');
    var $close = $('.close');
    var current = 0;
    var $currPage = "";
    var $nextPage = "";
    var isAnimating = false;
    var endCurrPage = false;
    var endNextPage = false;
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
            $('.page').css('top', '0');
        }
    }

    function setPageClasses() {
        $pages.each(function () {
            var $page = $(this);
            $page.data('originalClassList', $page.attr('class'));
        });

        $pages.eq(current).removeClass().addClass('large-12 columns overlay alpha60 page').addClass('page-current');
    }

    function hideCloseIcon() {
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
            var tile_ind = $(this).attr('data-index');
            $('.logoContainer > div').not('.close').css('visibility', 'hidden');
            $('#closeBack').addClass('closeC' + tile_ind + '');

            if (isAnimating) {
                return false;
            }
            openPage('top', tile_ind);
        })
    }

    function closeClick() {
        $close.click(function () {
            if (isAnimating) {
                return false;
            }
            openPage('close', 0);
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
            }
        })
    }

    function formIconClick() {
        $('.f-ico').click(function () {
            var $radio = $(this).next().find('input[type="radio"]');
            $radio.prop('checked', true);
            $('input[type="radio"]').not($radio).prop('checked', false);
        })
    }

    function arrowClick() {
        $('.arrowContainer').click(function () {
            var $a = $(this);
            var $parent = $a.parent();
            if ($a.hasClass('left')) {
                var $prev = $parent.prev();
                var prev_ind = $prev.attr('data-index');
                if ($prev.hasClass('alpha60')) {
                    openPage('close', 0);
                    hideCloseIcon();
                } else {
                    $('#closeBack').removeClass().addClass('icon').addClass('closeC' + prev_ind + '');
                    openPage('left', prev_ind);
                }

            }
            else {
                var $next = $parent.next();
                var next_ind = $next.attr('data-index');
                if (!next_ind) {
                    openPage('close', 0);
                    hideCloseIcon();
                } else {
                    $('#closeBack').removeClass().addClass('icon').addClass('closeC' + next_ind + '');
                    openPage('right', next_ind);
                }
            }
        })
    }

    function openPage(animation, index) {

        $currPage = $pages.eq(current);
        current = index;

        $nextPage = $pages.eq(current).addClass('page-current'),
		outClass = '', inClass = '';

        if (index == 0) {

            hideCloseIcon();
            //$("#page_main").scrollTop(offsetnote);

        }
        else {

            //$nextPage.scrollTop(offsetnote);
            $('.closeFront').delay(800).fadeIn('slow');

        }

        if (isAnimating) {
            return false;
        }

        isAnimating = true;

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

        $currPage.addClass(outClass).bind(animEndEventName, onInAnimation);
        $nextPage.addClass(inClass).bind(animEndEventName, onOutAnimation);

        if (!support) {
            onEndAnimation($currPage, $nextPage);
        }

    }

    function onInAnimation() {

        endCurrPage = true;
        if (endNextPage) {
            onEndAnimation($currPage, $nextPage);
        }

        $currPage.unbind(animEndEventName, onInAnimation);
    }

    function onOutAnimation() {

        endNextPage = true;
        if (endCurrPage) {
            onEndAnimation($currPage, $nextPage);
        }

        $nextPage.unbind(animEndEventName, onOutAnimation);
    }

    function onEndAnimation($outpage, $inpage) {
        endCurrPage = false;
        endNextPage = false;
        resetPage($outpage, $inpage);
        isAnimating = false;
    }

    function noAnimation() {
        isAnimating = true;
        endCurrPage = true;
        endNextPage = true;
        endCurrPage = false;
        endNextPage = false;
        resetPage($currPage, $nextPage);
        isAnimating = false;
    }

    function resetPage($outpage, $inpage) {
        $outpage.attr('class', $outpage.data('originalClassList'));
        $inpage.attr('class', $inpage.data('originalClassList') + ' page-current');
    }

    function init() {

        dirtyTopHack();
        setPageClasses();

        closeClick();
        filtersClick();
        formIconClick();
        arrowClick();
        tilesClick();

        formRadioChange();

        initLightbox();
    }

    init();
}); 



