const About = () => {
    SetActiveNavItem("about");
}

const getAboutPage = () => {
    let html = "<h1 id='aboutText'>App desarrollada por Carlos Mentaberry</h1>";
    $("#app").html(html);
    AnimateAboutPage();
}

const AnimateAboutPage = () => {
  
    $('#aboutText').animate({
      left: '250px',
      opacity: '0.1',
      height: "toggle"
      },
      "slow",
      function (){
        console.log('fin de la animación');
      }
    );
    
    $('#aboutText').animate({
      left: '250px',
      opacity: '1',
      height: "toggle"
      },
      "slow",
      function (){
        console.log('fin de la animación');
      }
    );
  }