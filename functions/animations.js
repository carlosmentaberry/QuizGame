const SlideDownAnimation = (object, speed) => {
    try {
        $(object)
            .hide()
            .slideDown(speed, 'swing')
            .css('opacity', 0.5)
            .animate({ opacity: 1 }, { queue: false, duration: 1000 });
    } catch (error) {
        console.error(error);
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
        "slow",
        function () {
            console.log('fin de la animación');
        }
    );

    $('.message').animate({
        left: '250px',
        opacity: '1',
        height: '150px',
        width: '250px',
    },
        "slow",
        function () {
            console.log('fin de la animación');
        }
    );
}


const AnimateResponse = (choise) => {
    let fwidth = 0;
    let fheight = 0;
    fwidth = $("#" + choise).outerWidth();
    fheight = $("#" + choise).outerHeight();
    console.log(fwidth, fheight);
    
    $("#" + choise.toString().replaceAll(" ", "_")).animate({
        height: fheight * 2 + 'px',
        width: fwidth * 2 + 'px',
    },
        "fast",
        function () {
            console.log('fin de la animación');
        }
    );

    $("#" + choise.toString().replaceAll(" ", "_")).animate({
        width: fwidth + "px",
        height: fheight + "px"
    },
        "fast",
        function () {
            console.log('fin de la animación');
        }
    );
}
