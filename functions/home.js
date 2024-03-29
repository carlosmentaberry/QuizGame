const Home = () => {
  getHomePage();
}

const getHomePage = () => {
  SetActiveNavItem("home");
  let width = style = "min-width: 15%;";
  if (isMobile.any()) {
    width = "width: 100%;";
  }
  $("#app").html(HOME_PAGE_HTML(width));
  if (game != undefined) {
    ShowQuestion();
  } else {
    SlideDownAnimation('#homeDiv', 900);
  }
}

const SetActiveTopic = (item) => {
  $('#Arte, #Ciencia, #Musica, #Cultura_General, #Deporte, #Geografia, #Todas').attr('class', 'list-group-item list-group-item-action');
  $('#' + item).attr('class', 'list-group-item list-group-item-action active');
  
  if(item == "Todas"){
    topic = "random";
  }else{
    topic = item;
  }

  setTimeout(() => {
    setUpNewGame();
  }, 300);
}

const SetActiveDifficultyOptions = (item) => {
  difficulty = "";
  $('#hard, #medium, #easy').attr('class', 'list-group-item list-group-item-action');
  $('#' + item).attr('class', 'list-group-item list-group-item-action active');
  difficulty = item;
  setTimeout(() => {
    ChooseTopic();
  }, 300);
}

const setUpNewGame = () => {
  console.log(topic);
  game = new Game(questions, 0, difficulty, topic);
  ShowQuestion();
}

