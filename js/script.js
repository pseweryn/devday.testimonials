/* Author:

*/

$(function () {
    $('.tileContainer > div').each(function (i) {
        $(this).click(function () {
            var $cube = $('.cube.c' + i + '');
            if ($cube.is(":visible")) {
                $cube.slideUp('fast');
            } else {
                $cube.slideDown('fast', function () {
                    $('#closeBack').addClass('closeC' + i + '');
                    $('.closeFront').show();
                });
            }
        })
    })
    $('.close').click(function () {
        $('.cube').hide();
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
            $reviews.find('.review.'+ cl + '').show();
        }
        $h.addClass('lightBlue');
    })
}); 



