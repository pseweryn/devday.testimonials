/* Author:

*/

$(function () {
    $('.pic').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
            enabled: true,
            navigateByImgClick: true
        }
    });
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
    $('.close').click(function () {
        $('.cube').hide();
        $('.alpha60').show();
        $('.logoContainer > div').not('.close').css('visibility', '');
        $('#closeBack').removeClass().addClass('icon');
        $('.closeFront').hide();
    })

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
}); 



