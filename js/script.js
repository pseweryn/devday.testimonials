/* Author:

*/

$(function () {

    function hideCloseIcon() {
        $('.logoContainer > div').not('.close').css('visibility', '');
        $('#closeBack').removeClass().addClass('icon');
        $('.closeFront').hide();
    }

    //TODO: ugly! refactor soon!
    function getCindex($cube) {
        if ($cube.hasClass('c0')) {
            return 0;
        }
        else if ($cube.hasClass('c1')) {
            return 1;
        }
        else if ($cube.hasClass('c2')) {
            return 2;
        }
        else if ($cube.hasClass('c3')) {
            return 3;
        }
        return 0;
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
        $('.tileContainer > div').each(function (i) {
            $(this).click(function () {
                var $cube = $('.cube.c' + i + '');
                $cube.slideDown('fast', function () {
                    $('.alpha60').hide();
                    $('.logoContainer > div').not('.close').css('visibility', 'hidden');
                    $('#closeBack').addClass('closeC' + i + '');
                    $('.closeFront').show();
                });
            })
        })
    }

    function closeClick() {
        $('.close').click(function () {
            $('.cube').hide();
            $('.alpha60').show();
            hideCloseIcon();
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
            var $cubes = $('.cube');
            $parent.hide();
            if ($a.hasClass('left')) {
                var $prev = $parent.prev();
                //var pcIndex = $cubes.indexOf($prev);
                if ($prev.hasClass('alpha60')) {
                    hideCloseIcon();
                } else {
                    $('#closeBack').removeClass().addClass('icon').addClass('closeC' + getCindex($prev) + '');
                }
                $prev.show();
            }
            else {
                var $next = $parent.next();
                //var ncIndex = $cubes.indexOf($next);
                if ($next.hasClass('cube')) {
                    $('#closeBack').removeClass().addClass('icon').addClass('closeC' + getCindex($next) + '');
                    $next.show();
                } else {
                    $('.alpha60').show();
                    hideCloseIcon();
                }
            }
        })
    }

    function init() {
        closeClick();
        filtersClick();
        formRadioChange();
        formIconClick();
        arrowClick();
        tilesClick();
        initLightbox();
    }

    init();
}); 



