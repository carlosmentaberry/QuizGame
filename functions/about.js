const About = () => {
  SetActiveNavItem("about");
}

const getAboutPage = () => {
  SetActiveNavItem("about");
  $("#app").html(ABOUT_PAGE_HTML());
  AnimateAboutPage();
}

const AnimateAboutPage = () => {

  $('#aboutText').animate({
    left: '250px',
    opacity: '0.1',
    height: "toggle"
  },
    "slow",
    function () {
      console.log('fin de la animación');
    }
  );

  $('#aboutText').animate({
    left: '250px',
    opacity: '1',
    height: "toggle"
  },
    "slow",
    function () {
      console.log('fin de la animación');
    }
  );
}