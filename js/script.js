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
}); 



