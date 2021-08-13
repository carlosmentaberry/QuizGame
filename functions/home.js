const Home = () => {
    SetActiveNavItem("home");
    $('#btnQuestions').show();
}


const getHomePage = () => {
    let html = `<button onclick="StartGame()" id="btnQuestions" class="btn btn-primary">Jugar</button>`;
    
    $("#app").html(html);
    if(juego != undefined){
      ShowQuestion();
    }else{
      AnimateHomePage();
    }
}

const AnimateHomePage = () => {
  
    $('#btnQuestions').animate({
      left: '250px',
      opacity: '0.1',
      height: '150px',
      width: '250px',
      },
      "slow",
      function (){
        console.log('fin de la animación');
      }
    );
    
    $('#btnQuestions').animate({
      left: '250px',
      opacity: '1',
      height: '48px',
      width: '78px',
      },
      "slow",
      function (){
        console.log('fin de la animación');
      }
    );
  }