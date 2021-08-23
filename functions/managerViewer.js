const StartGame = () => {
  questionNumber = 0;
  CreateQuestions();
  EndGame();
  $('#app').html("");
  SetActiveNavItem("home");
  
  SignUp();
}

const SetActiveNavItem = (item) => {
  $('#home, #admin, #about, #profile').attr('class', 'nav-link');
  $('#' + item).attr('class', 'nav-link active');
}

const goToHomePage = () => {
  SetActiveNavItem("home");
  window.location.replace("#home");
  getHomePage();
}

const GetParticipant = () => {
  participant = JSON.parse(getFromSessionStorage('participant'));
  if (participant != undefined && participant != null) {
    $("#userName").text(participant.name.toString().toLowerCase());
    CheckRole();
    return true;
  } else {
    $('#admin').hide();
    return false;
  }
  return false;
}
const SignUp = () => {
  if (getFromSessionStorage('participant') == undefined) {
    LOGIN_FORM_HTML();
    jQuery.noConflict();
    $('#exampleModal').modal('show');
  } else {
    SetScore();
    CheckRole();
    ChooseDifficulty();
  }

}

const SaveCredentials = () => {
  jQuery.noConflict();
  $('#exampleModal').modal('hide');
  let name = $('[name="name"]')[0].value.toString().toLowerCase();
  let age = $('[name="age"]')[0].value;
  let sex = $('[name="sex"]')[0].value;
  let role = 'player';
  if (name != undefined || name != '') {
    if (name.toString().toLowerCase() == "admin") {
      role = 'admin';
      $('#admin').show();
    }
    participant = new Participant(name.toString().toLowerCase(), age, sex, role);
    saveToSessionStorage('participant', JSON.stringify(participant))
    SetScore();

    $('.modal-backdrop').remove();
  } else {
    EndGame();
  }
  if (getFromSessionStorage('participant') != undefined) {
    ChooseDifficulty();
  }
}

const CheckRole = () => {
  if (participant.role == "admin") {
    $('#admin').show();
    return "admin";
  } else {
    $('#admin').hide();
    return "player";
  }
}

const ShowQuestion = () => {
  progressPorcentage = questionNumber * 100 / game.maxScore;
  questionNumber += 1;
  var html = " ";
  game.currentQuestion = game.questions.pop();
  if (game.currentQuestion != undefined) {
    correctAnswer = game.currentQuestion.correctAnswer;
    if (isMobile.any()) {
      html = GET_HTML_MOBILE();
    } else {
      html = GET_HTML_WEB();
    }
    changedQuestion = true;

    countDownStarted = false;
    clearInterval(timer);
    cuentaRegresiva(difficulty);
  } else {
    let porc = getPorcentage(game.score, game.maxScore);
    clearInterval(timer);
    let width = "min-width: 70%;";
    if (isMobile.any()) {
      width = "min-width: 90%;max-height: 100%;";
    }
    if (porc < 40) {
      html = GAME_RESULT_HTML(looser, width, porc);
    }
    if (porc > 41 && porc < 70) {
      html = GAME_RESULT_HTML(looseSoso, width, porc);
    }
    if (porc > 71 && porc < 85) {
      html = GAME_RESULT_HTML(winner, width, porc);
    }
    if (porc > 85) {
      html = GAME_RESULT_HTML(Best, width, porc);
    }
    $('#app').html(html);
  }
  $('#app').html(html);
}

const getButtonClass = (a) => {
  let classname = "btn btn-outline-dark";
  switch (a.toLowerCase()) {
    case "negro":
      classname = "btn btn-dark";
      break;
    case "rojo":
      classname = "btn btn-danger";
      break;
    case "blanco":
      classname = "btn btn-outline-dark";
      break;
    case "verde":
      classname = "btn btn-success";
      break;
    case "azul":
      classname = "btn btn-primary";
      break;
    case "amarillo":
      classname = "btn btn-warning";
      break;
  }
  let button = `<input type="button" class="${classname}" id='${a.replaceAll(" ", "_")}' name=${a} onClick="validateResponse('${a.replaceAll(" ", "_")}')" value= '${a}' style="min-width: 200px" />`;

  return button;
}

const validateResponse = (choise) => {

  clearInterval(timer);
  changedQuestion = true;
  let correctAnswer = game.currentQuestion.correctAnswer.toString().replaceAll(" ", "_").replaceAll("&","and");
  game.currentQuestion.possibleAnswers.forEach(x => $("#" + x.toString().replaceAll(" ", "_").replaceAll("&","and")).attr("disabled", true));
  
  let element = `#${choise}`;
  
  timerProgressPorcentage = 0;
  paintTimerProgress();
  if (choise == correctAnswer) {
    showProgressAnswer(true);
    score++;
    game.score = score;
    SetScore();
    document.getElementById(choise).className = "btn btn-success";
    try {
      AnimateResponse(choise);
    } catch (error) {
    }
  } else {
    showProgressAnswer(false);

    if (choise && choise.length > 1) {
      document.getElementById(choise).className = "btn btn-danger";
    }

    document.getElementById(correctAnswer).className = "btn btn-success";
    try {
      AnimateResponse(correctAnswer);
    } catch (error) {
    }
  }

  setTimeout(() => {
    ShowQuestion();
  }, 1000);
}

const cuentaRegresiva = (difficulty) => {

  let seconds = 0;
  let totalSeconds = 0;
  if (!countDownStarted) {
    switch (difficulty) {
      case "hard":
        seconds = 10;
        break;
      case "medium":
        seconds = 15;
        break;
      case "easy":
        seconds = 20;
        break;
    }
    totalSeconds = seconds;
    timer = null;
  }
  timerProgressPorcentage = 1;
  secs = 1;
  if (timer == null) {
    countDownStarted = true;
    timer = setInterval(function () {
      timerProgressPorcentage = secs * 100 / totalSeconds;
      $("#progressbarTimer").attr("style", "width: " + timerProgressPorcentage + "%");
      if (seconds <= 0) {
        clearInterval(timer);
        validateResponse("");
        countDownStarted = false;
        cuentaRegresiva(difficulty);
      } else {
        if (!changedQuestion) {
          countDownStarted = false;
          clearInterval(timer);
          cuentaRegresiva(difficulty);
        }
      }
      if ($('#countdown') != null) {
        $('#countdown').html(seconds + ' segundos');
      }

      if (!isMobile.any()) {
        animateCountDown();
      }

      $('#countdown').css('color', getColor(seconds));
      paintTimerProgress();
      seconds -= 1;
      secs += 1;
    }, 1000);
  }
}

const showProgressAnswer = (value) => {
  if(value){
    $("#progressbarTimer").attr("class", "progress-bar progress-bar-striped bg-success");
  }else{
    $("#progressbarTimer").attr("class", "progress-bar progress-bar-striped bg-danger");
  }
}

const paintTimerProgress = () => {
  if(timerProgressPorcentage == 0 || timerProgressPorcentage == 100){
    $("#progressbarTimer").attr("class", "progress-bar progress-bar-striped bg-danger");
  }
  if(timerProgressPorcentage > 0 && timerProgressPorcentage <= 15){
    console.log(timerProgressPorcentage);
    $("#progressbarTimer").attr("class", "progress-bar progress-bar-striped bg-success");
  }
  if(timerProgressPorcentage > 15 && timerProgressPorcentage <= 35){
    $("#progressbarTimer").attr("class", "progress-bar progress-bar-striped");
  }
  if(timerProgressPorcentage > 35 && timerProgressPorcentage <= 65){
    $("#progressbarTimer").attr("class", "progress-bar progress-bar-striped bg-info");
  }
  if(timerProgressPorcentage > 65 && timerProgressPorcentage <= 85){
    $("#progressbarTimer").attr("class", "progress-bar progress-bar-striped bg-warning");
  }
  if(timerProgressPorcentage > 85){
    $("#progressbarTimer").attr("class", "progress-bar progress-bar-striped bg-danger");
  }
}
const getColor = (seconds) => {
  if (parseInt(seconds) > 5) {
    return 'black';
  } else {
    return 'red';
  }
}

const EndGame = () => {
  game = undefined;
  score = 0;
  SetScore();
  getHomePage();
}

const SetScore = () => {
  let html = "";
  if (participant != undefined && participant != undefined) {
    html = SET_SCORE_HTML(participant.name, score);
  } else {
    html = SET_SCORE_HTML(nullParticipant.profile, 0);
  }
  $('#userName').html(html);
}

const ShowRandomQuestion = () => {
  let id = 0;
  let i = 0
  exit = true;
  let quest;
  while (exit) {
    id = randomInteger(1, CreateQuestions().length).toString();
    quest = questions.filter(x => x.id == id);
    if (game != undefined && game.questions != undefined) {
      if (!game.questions.includes(quest)) {
        exit = false;
      }
    }
    if (i == 100) { exit = false; }
    i++;
  }
  return quest;
}


const ChooseDifficulty = () => {
  let width = style = "min-width: 70%;";
  if (isMobile.any()) {
    width = "min-width: 90%;";
  }

  $('#app').html(DIFFICULTY_SELECTOR_HTML(width));
  SlideDownAnimation('#difficulty', 500);
}

const ChooseTopic = () => {
  let width = style = "min-width: 70%;";
  if (isMobile.any()) {
    width = "min-width: 90%;";
  }

  $('#app').html(TOPIC_SELECTOR_HTML(width));
  SlideDownAnimation('#topic', 500);
}