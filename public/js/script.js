var owlWrap = $('.owl-wrapper');

if (owlWrap.length > 0) {

    if (jQuery().owlCarousel) {
        owlWrap.each(function(){

            var carousel= $(this).find('.owl-carousel'),
                dataNum = $(this).find('.owl-carousel').attr('data-num'),
                dataNum2,
                dataNum3;

            if ( dataNum == 1 ) {
                dataNum2 = 1;
                dataNum3 = 1;
            } else if ( dataNum == 2 ) {
                dataNum2 = 2;
                dataNum3 = dataNum - 1;
            } else {
                dataNum2 = dataNum - 1;
                dataNum3 = dataNum - 2;
            }

            carousel.owlCarousel({
                autoPlay: 10000,
                navigation : true,
                items : dataNum,
                itemsDesktop : [1199,dataNum2],
                itemsDesktopSmall : [991,dataNum3],
                itemsTablet : [768, dataNum3],
            });

        });
    }
}