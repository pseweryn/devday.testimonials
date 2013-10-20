/* Author:

*/

$(function () {
    $('.pic').magnificPopup({
        delegate: 'a',
		type: 'image',
        gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		}
    });
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
            $reviews.find('.review.' + cl + '').show();
        }
        $h.addClass('lightBlue');
    })
}); 



