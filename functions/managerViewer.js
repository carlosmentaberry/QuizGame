const StartGame = () => {
  EndGame();
  $('#app').html("");
  SetActiveNavItem("home");
  console.log("starting game");
  
  SignUp();
}

const SetActiveNavItem = (item) => {
  $('#home, #admin, #about, #profile').attr('class', 'nav-link');
  $('#' + item).attr('class', 'nav-link active');
}

const GetParticipant = () => {
  participant = JSON.parse(getFromSessionStorage('participant'));
  console.log("getFromSessionStorage('participant')");
  console.log(getFromSessionStorage('participant'));
  console.log("GetParticipant");
  console.log(participant);
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
  console.log("signing up participant");
  if (getFromSessionStorage('participant') == undefined ) {
    console.log("no participant");
    LOGIN_FORM_HTML();
    jQuery.noConflict();
    $('#exampleModal').modal('show');
  } else {
    console.log("participant logged");
    SetPuntaje();
    CheckRole();
    ChooseDifficulty();
  }

}

const SaveCredentials = () => {
  jQuery.noConflict();
  $('#exampleModal').modal('hide');
  console.log("saving credentials");
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
    SetPuntaje();

    $('.modal-backdrop').remove();
  } else {
    EndGame();
  }
  console.log('getFromSessionStorage(participant): ' + getFromSessionStorage('participant'));
  if (getFromSessionStorage('participant') != undefined) {
    ChooseDifficulty();
  }
}

const CheckRole = () => {
  console.log("checking role");
  if (participant.role == "admin") {
    $('#admin').show();
    return "admin";
  } else {
    $('#admin').hide();
    return "player";
  }
}

const ShowQuestion = () => {
  console.log("getting question");
  var html = " ";
  console.log("PREGUNTAS RESTANTES: " + juego.preguntas.length);
  juego.currentQuestion = juego.preguntas.pop();
  console.log(juego.currentQuestion);
  if (juego.currentQuestion != undefined) {
    correctAnswer = juego.currentQuestion.correctAnswer;
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
    let porc = getPorcentage(juego.puntaje, juego.maximoPuntaje);
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
    if (porc > 71) {
      html = GAME_RESULT_HTML(winner, width, porc);
    }
    $('#app').html(html);
  }
  $('#app').html(html);
}

const getButtonClass = (a) => {
  let classname = "btn btn-outline-dark";
  console.log("a: " + a);
  switch (a.toLowerCase()) {
    case "negro":
      classname = "btn btn-dark";
      break;
    case "rojo":
      classname = "btn btn-danger";
      break;
    case "blanco":
      classname = "btn btn-light";
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
  console.log(button);
  return button;
}

const validateResponse = (choise) => {

  clearInterval(timer);
  changedQuestion = true;
  console.log('juego.currentQuestion.possibleAnswers: ');
  let correctAnswer = juego.currentQuestion.correctAnswer.toString().replaceAll(" ", "_");
  console.log(Array.from(juego.currentQuestion.possibleAnswers));
  juego.currentQuestion.possibleAnswers.forEach(x => $("#" + x.toString().replaceAll(" ", "_")).attr("disabled", true));
  console.log('choise: ' + choise);

  let element = `#${choise}`;
  console.log(element);

  if (choise == correctAnswer) {
    puntaje++;
    juego.puntaje = puntaje;
    SetPuntaje();
    document.getElementById(choise).className = "btn btn-success";
    try {
      AnimateResponse(choise);
    } catch (error) {
      console.error(error);
    }
  } else {

    if (choise && choise.length > 1) {
      document.getElementById(choise).className = "btn btn-danger";
    }

    console.log("correctAnswer: " + correctAnswer);
    document.getElementById(correctAnswer).className = "btn btn-success";
    try {
      AnimateResponse(correctAnswer);
    } catch (error) {
      console.error(error);
    }
  }

  setTimeout(() => {
    console.log("PREGUNTAS RESTANTES: " + juego.preguntas.length);
    ShowQuestion();
  }, 1000);
}

const cuentaRegresiva = (difficulty) => {

  let seconds = 0;

  if (!countDownStarted) {
    console.log("countDownStarted: " + countDownStarted);
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
    timer = null;
  }
  if (timer == null) {
    console.log("timer == null");
    countDownStarted = true;
    timer = setInterval(function () {
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
      if (document.getElementById('countdown') != null) {
        document.getElementById('countdown').innerHTML = seconds + ' segundos';
      }

      if (!isMobile.any()) {
        (function pulse(back) {
          $('#countdown').animate(
            {
              'font-size': (back) ? '20px' : '35px',
              opacity: (back) ? 1 : 0.5
            }, 400, function () { pulse(!back) });
        })(false);
      }

      $('#countdown').css('color', getColor(seconds));
      seconds -= 1;
    }, 1000);
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
  console.log("Ending game");  
  juego = undefined;
  puntaje = 0;
  SetPuntaje();
  getHomePage();
}

const SetPuntaje = () => {
  console.log("SetPuntaje");  
  let html = "";
  if (participant != undefined && participant != undefined) {
    html = `${participant.name.toString().toLowerCase()} 
    <span class="badge rounded-pill bg-success">
      ${puntaje}
    </span>
  </button>`;
  } else {
    html = `Profile
    <span class="badge rounded-pill bg-success">
      0 
    </span>
  </button>`
  }
  $('#userName').html(html);
}

const ShowRandomQuestion = () => {
  console.log("ShowRandomQuestion");
  let id = 0;
  let i = 0
  exit = true;
  let quest;
  while (exit) {
    id = randomInteger(1, CreateQuestions().length).toString();
    console.log(id);
    quest = questions.filter(x => x.id == id);
    console.log(quest);
    if (juego != undefined && juego.preguntas != undefined) {
      console.log('if(juego != undefined && juego.preguntas != undefined){');
      console.log(juego.preguntas);
      if (!juego.preguntas.includes(quest)) {
        exit = false;
      }
    }
    if (i == 100) { exit = false; }
    i++;
    console.log(i);
  }
  return quest;
}


const SetActiveDifficultyOptions = (item) => {
  $('#hard, #medium, #easy').attr('class', 'list-group-item list-group-item-action');
  $('#' + item).attr('class', 'list-group-item list-group-item-action active');
  difficulty = item;
  ChooseTopic();
}


const ChooseDifficulty = () => {
  let width = style = "min-width: 70%;";
  if (isMobile.any()) {
    width = "min-width: 90%;";
  }
  console.log("ChooseDifficulty");

  $('#app').html(TOPIC_SELECTOR_HTML(width));
  SlideDownAnimation('#difficulty', 500);
}

const ChooseTopic = () => {
  let width = style = "min-width: 70%;";
  if (isMobile.any()) {
    width = "min-width: 90%;";
  }
  console.log("ChooseTopic");

  $('#app').html(DIFFICULTY_SELECTOR_HTML(width));
  SlideDownAnimation('#topic', 500);
}