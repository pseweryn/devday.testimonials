/* Author:

*/

$(function () {
    $('.tileContainer > div').each(function (i) {
        $(this).click(function () {
            var $cube = $('.cube.c' + i + '');
            if ($cube.is(":visible")) {
                $cube.slideUp('fast');
            } else {
                $cube.slideDown('fast');
                $('.closeBack').addClass('closeC' + i + '');
            }
        })
    })
}); 



