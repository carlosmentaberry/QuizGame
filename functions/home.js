const Home = () => {
  SetActiveNavItem("home");
  getHomePage();
}

const getHomePage = () => {
  console.log("getting home");
  $("#app").html(HOME_PAGE_HTML());
  if (juego != undefined) {
    console.log("juego != undefined");
    ShowQuestion();
  } else {
    console.log("juego == undefined");
    SlideDownAnimation('#homeDiv', 900);
  }
}

const SetActiveTopic = (item) => {
  $('#Arte, #Cultura_General, #sport, #geography, #random').attr('class', 'list-group-item list-group-item-action');
  $('#' + item).attr('class', 'list-group-item list-group-item-action active');
  console.log("creating game");
  console.log("topic: " + item);
  topic = item;
  setUpNewGame();
}

const setUpNewGame = () => {
  console.log("questions");
  console.log(questions);
  juego = new Juego(questions, 0, difficulty, topic);
  console.log("participante registrado");
  console.log('JUEGO: ');
  console.log(juego);
  console.log('PREGUNTAS: ');
  console.log(juego.preguntas);
  ShowQuestion();
}

