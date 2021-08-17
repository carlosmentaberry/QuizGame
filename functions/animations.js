const SlideDownAnimation = (object, speed) => {
    try {
        $(object)
            .hide()
            .slideDown(speed, 'swing')
            .css('opacity', 0.5)
            .animate({ opacity: 1 }, { queue: false, duration: 1000 });
    } catch (error) {
    }
}

const AnimateAdminPage = (message) => {
    $('#admin').hide();
    $("#app").html(message);
    $('.message').animate({
        left: '250px',
        opacity: '0.1',
        height: '150px',
        width: '250px',
    },
        "slow"
    );

    $('.message').animate({
        left: '250px',
        opacity: '1',
        height: '150px',
        width: '250px',
    },
        "slow"
    );
}


const AnimateResponse = (choise) => {
    let fwidth = 0;
    let fheight = 0;
    fwidth = $("#" + choise).outerWidth();
    fheight = $("#" + choise).outerHeight();

    $("#" + choise.toString().replaceAll(" ", "_")).animate({
        height: fheight * 2 + 'px',
        width: fwidth * 2 + 'px',
    },
        "fast"
    );

    $("#" + choise.toString().replaceAll(" ", "_")).animate({
        width: fwidth + "px",
        height: fheight + "px"
    },
        "fast"
    );
}

const animateCountDown = () => {
    (function pulse(back) {
        $('#countdown').animate(
          {
            'font-size': (back) ? '20px' : '35px',
            opacity: (back) ? 1 : 0.5
          }, 400, function () { pulse(!back) });
      })(false);
}