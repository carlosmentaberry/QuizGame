const StartGame = () => {
  EndGame();
  $('#app').html("");
  SetActiveNavItem("home");
  console.log("starting game");

  SignUp();
}

const ChooseDifficulty = () => {
  console.log("ChooseDifficulty");
  let html = `
  <div class="row row-cols-1 row-cols-md-3 g-4">
  <div class="col">
    <div class="card h-100 text-center">
      <div class="card-header bg-light">
      <h3 class="card-title">ELEGIR DIFICULTAD</h3>
      </div>
      <div class="card-body">
        <div class="list-group">
          <a href="#" id="hard" onClick="SetActiveDifficultyOptions('hard')" class="list-group-item list-group-item-action">hard</a>
          <a href="#" id="medium" onClick="SetActiveDifficultyOptions('medium')" class="list-group-item list-group-item-action">medium</a>
          <a href="#" id="easy" onClick="SetActiveDifficultyOptions('easy')" class="list-group-item list-group-item-action active">easy</a>
        </div>
      </div>
      <div class="card-footer">
      <small class="text-muted">hard - 10 preguntas (10 segundos por respuesta)</small><br/>
      <small class="text-muted">medium - 5 preguntas (15 segundos por respuesta)</small><br/>
      <small class="text-muted">easy - 3 preguntas (20 segundos por respuesta)</small>
      </div>
    </div>
  </div>
</div>
  `;
  $('#app').html(html);
}

const ChooseTopic = () => {
  console.log("ChooseDifficulty");
  let html = `
  <div class="row row-cols-1 row-cols-md-3 g-4">
  <div class="col">
    <div class="card h-100 text-center">
      <div class="card-header bg-light">
      <h3 class="card-title">ELEGIR TEMA</h3>
      </div>
      <div class="card-body">
        <div class="list-group">
          <a href="#" id="Arte" onClick="SetActiveTopic('Arte')" class="list-group-item list-group-item-action">Arte</a>
          <a href="#" id="Cultura_General" onClick="SetActiveTopic('Cultura_General')" class="list-group-item list-group-item-action">Cultura General</a>
          <a href="#" id="Deporte" onClick="SetActiveTopic('Deporte')" class="list-group-item list-group-item-action">Deporte</a>
          <a href="#" id="Geografia" onClick="SetActiveTopic('Geografia')" class="list-group-item list-group-item-action">Geografia</a>
          <a href="#" id="random" onClick="SetActiveTopic('random')" class="list-group-item list-group-item-action active">Random</a>
        </div>
      </div>
      <div class="card-footer">
      <small class="text-muted">random - responderás preguntas de todas las categorías</small>
      </div>
    </div>
  </div>
</div>
  `;
  $('#app').html(html);
}

const SetActiveTopic = (item) => {
  $('#Arte, #Cultura_General, #sport, #geography, #random').attr('class', 'list-group-item list-group-item-action');
  $('#' + item).attr('class', 'list-group-item list-group-item-action active');
  console.log("creating game");
  topic = item;
  setUpNewGame();
}

const setUpNewGame = () => {
  juego = new Juego(questions, 0, difficulty, topic);
  console.log("participante registrado");
  console.log('JUEGO: ');
  console.log(juego);
  console.log('PREGUNTAS: ');
  console.log(juego.preguntas);
  ShowQuestion();
}

const SetActiveDifficultyOptions = (item) => {
  $('#hard, #medium, #easy').attr('class', 'list-group-item list-group-item-action');
  $('#' + item).attr('class', 'list-group-item list-group-item-action active');
  difficulty = item;
  ChooseTopic();
}


const SetActiveNavItem = (item) => {
  $('#home, #admin, #about, #profile').attr('class', 'nav-link');
  $('#' + item).attr('class', 'nav-link active');
  $('#btnQuestions').hide();
}

const GetParticipant = () => {
  participant = JSON.parse(sessionStorage.getItem('participant'));
  if (participant != undefined) {
    $("#userName").text(participant.name.toString().toLowerCase());
    CheckRole();
    return true;
  } else {
    $('#admin').hide();
    return false;
  }
}
const SignUp = () => {
  console.log("signing up participant");
  if (sessionStorage.getItem('participant') == undefined) {
    console.log("no participant");
    createSignUpForm();
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
    sessionStorage.setItem('participant', JSON.stringify(participant))
    SetPuntaje();

    $('.modal-backdrop').remove();
  } else {
    EndGame();
  }
  console.log('sessionStorage.getItem(participant): ' + sessionStorage.getItem('participant'));
  if (sessionStorage.getItem('participant') != undefined) {
    ChooseDifficulty();
  }
  $('#btnQuestions').show();

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

const ShowAllQuestions = () => {

  console.log("getting question");
  var quests = "";
  let q = questions;
  quests += `
  ${q.map(a =>
    `<br/><br/>
    <div class="list-group">
      <a href="#" class="list-group-item list-group-item-action">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">${a.id} - ${a.question}</h5>
          <small class="text-muted">Topic: ${a.topic}</small>
        </div>
        Options: 
        <p class="mb-1">${a.possibleAnswers}</p>
        
        <img src=${a.image} width="150px" height="150px" alt=${q.topic}><br/>
        <small class="text-muted">Correct answer: ${a.correctAnswer}</small>
      </a>
    </div>`).join('')
    }`
  $('#app').html(quests);
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
      html = getHtmlMobile();
    } else {
      html = getHtmlWeb();
    }
    changedQuestion = true;
    
    countDownStarted = false;
    clearInterval(timer);
    cuentaRegresiva(difficulty);
  } else {
    let porc = getPorcentage();
    clearInterval(timer);
    if (porc < 40) {
      html = `
      <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col">
        <div class="card h-100 text-center">
          <div class="card-header bg-light">
          <h3 class="card-title">${porc}% - PERDISTE :'(</h3>
          </div>
          <div class="card-body">
          <img src="https://media1.tenor.com/images/e51a9bd7a012907e85135e3185d4c4c1/tenor.gif?itemid=10852716" alt="burro" width="150" style="padding: 2% 0;">
            <br/>
            <small class="text-muted"><p>Mejor suerte para la proxima!!</p></small>
          </div>
          <div class="card-footer bg-light">
            <div class="btn-group-vertical btn-group-lg btn-block" role="group">
            <button onclick="StartGame()" id="btnQuestions" class="btn btn-primary">Jugar de nuevo</button>
             </div>
          </div>
        </div>
      </div>
    </div>
      `;
    }
    if (porc > 41 && porc < 70) {
      html = `
      <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col">
        <div class="card h-100 text-center">
          <div class="card-header bg-light">
          <h3 class="card-title">${porc}% - PERDISTE :'(</h3>
          </div>
          <div class="card-body">
          <img src="https://estaticos.muyinteresante.es/uploads/images/article/5536592a70a1ae8d775df846/dia-del-mono.jpg" alt="primate" width="150" style="padding: 2% 0;">
            <br/>
            <small class="text-muted"><p>Puedes hacerlo mejor!!</p></small>
          </div>
          <div class="card-footer bg-light">
            <div class="btn-group-vertical btn-group-lg btn-block" role="group">
            <button onclick="StartGame()" id="btnQuestions" class="btn btn-primary">Jugar de nuevo</button>
             </div>
          </div>
        </div>
      </div>
    </div>
      `;
    }
    if (porc > 71) {
      html = `
      <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col">
        <div class="card h-100 text-center">
          <div class="card-header bg-light">
          <h3 class="card-title">${porc}% - Ganaste :D</h3>
          </div>
          <div class="card-body">
          <img src="https://mymodernmet.com/wp/wp-content/uploads/2021/01/boston-dynamics-do-you-love-me-robot-dance-02.gif" alt="robot" width="150" style="padding: 2% 0;">
            <br/>
            <small class="text-muted"><p>Brillante!!</p></small>
          </div>
          <div class="card-footer bg-light">
            <div class="btn-group-vertical btn-group-lg btn-block" role="group">
            <button onclick="StartGame()" id="btnQuestions" class="btn btn-primary">Jugar de nuevo</button>
             </div>
          </div>
        </div>
      </div>
    </div>
      `;
    }
  }

  $('#app').html(html);
}

const getHtmlMobile = () => {
  let html = `
  <div class="row row-cols-1 row-cols-md-3 g-4">
    <div class="col">
      <div class="card h-100 text-center">
        <div class="card-header bg-light">
        <h3 class="card-title">${juego.currentQuestion.question}</h3>
        </div>
        <div class="card-body">
        <div id="countdown" style="min-height: 70px;"><br/></div>
          <img src=${juego.currentQuestion.image} width="150px" height="150px" alt=${juego.currentQuestion.topic}>
          <br/>
          <small class="text-muted">Category: ${juego.currentQuestion.topic.replaceAll("_", " ")}</small>
        </div>
        <div class="card-footer bg-light">
          <p class="card-text">Elegir una opción:</p>
          <div class="btn-group-vertical btn-group-lg btn-block" role="group">
             ${shuffle(juego.currentQuestion.possibleAnswers).map(a => `
              <input type="button" class="btn btn-outline-dark" id='${a.replaceAll(" ", "_")}' name=${a} onClick="validateResponse('${a.replaceAll(" ", "_")}')" value= '${a}' style="min-width: 200px" />`).join('')
    }
           </div>
        </div>
      </div>
    </div>
  </div>
<br/>
<button type="button" id="endGame" onclick="EndGame();" class="btn btn-danger btn-block">Finalizar juego</button>
`;
  return html;
}
const getHtmlWeb = () => {
  let html = `
  <div class="row row-cols-1 row-cols-md-3 g-4">
    <div class="col">
      <div class="card h-100">
        <div class="card-header bg-light text-center">
        <h3 class="card-title">${juego.currentQuestion.question}</h3>
        </div>
        <div class="card-body text-center">
        <div id="countdown" style="min-height: 70px;"><br/></div>
          <img src=${juego.currentQuestion.image} width="150px" height="150px" alt=${juego.currentQuestion.topic}>
          <br/>
          <small class="text-muted">Category: ${juego.currentQuestion.topic.replaceAll("_", " ")}</small>
        </div>
        <div class="card-footer bg-light text-center">
          <p class="card-text">Elegir una opción:</p>
          <div class="btn-group" role="group">
             ${shuffle(juego.currentQuestion.possibleAnswers).map(a =>
    `<br/><br/>
              <input type="button" class="btn btn-outline-dark" id='${a.replaceAll(" ", "_")}' name=${a} onClick="validateResponse('${a.replaceAll(" ", "_")}')" value= '${a}' style="min-width: 200px" />`).join('')
    }
           </div>
        </div>
      </div>
    </div>
  </div>
<br/>
<div class="text-center">
  <button type="button" id="endGame" onclick="EndGame();" class="btn btn-danger">Finalizar juego</button>
</div>
`;
  return html;
}



const shuffle = (array) => {
  var currentIndex = array.length, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

const getPorcentage = () => {
  console.log("juego.puntaje: " + juego.puntaje);
  console.log("juego.maximoPuntaje: " + juego.maximoPuntaje);
  let porcent = juego.puntaje * 100 / juego.maximoPuntaje;
  console.log("porcentaje: " + porcent);
  return Math.trunc(porcent * 100) / 100;
}

const validateResponse = (choise) => {

  clearInterval(timer);
  changedQuestion = true;
  console.log('juego.currentQuestion.possibleAnswers: ');
  let correctAnswer = juego.currentQuestion.correctAnswer.toString().replaceAll(" ", "_");
  console.log(Array.from(juego.currentQuestion.possibleAnswers));
  juego.currentQuestion.possibleAnswers.forEach(x => $("#" + x.toString().replaceAll(" ", "_")).attr("disabled", true));


  $('#btnQuestions').html("Proxima pregunta");
  $('#btnQuestions').show();
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
    timer=null;
  }
  if(timer == null){
    console.log("timer == null");
    countDownStarted = true;
    timer = setInterval(function(){
      if (seconds <= 0) {
        clearInterval(timer);
        validateResponse("");
        countDownStarted = false;
        cuentaRegresiva(difficulty);
      }else{
        if (!changedQuestion) {
          countDownStarted = false;
          clearInterval(timer);
          cuentaRegresiva(difficulty);
        }
      }
      document.getElementById('countdown').innerHTML = seconds + ' segundos';
      if(!isMobile.any())
      {
        (function pulse(back) {
          $('#countdown').animate(
              {          
                  'font-size': (back) ? '20px' : '35px',
                  opacity: (back) ? 1 : 0.2
              }, 400, function(){pulse(!back)});
          })(false);
      }
      $('#countdown').css('color', getColor(seconds));
      seconds -= 1;
    }, 1000);
  }
}
const getColor = (seconds) => {
  if(parseInt(seconds) > 5){
    return 'black';
  }else{
    return 'red';
  }
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

const saveToLocalStorage = (name, value) => {
  localStorage.clear();
  localStorage.setItem(name.toString().toLowerCase(), value);
}

const EndGame = () => {
  juego = undefined;
  puntaje = 0;
  SetPuntaje();
  let html = `<button onclick="StartGame()" id="btnQuestions" class="btn btn-primary">Jugar</button>`;
  $('#app').html(html);
}

const SetPuntaje = () => {
  let html = "";
  if (participant != undefined) {
    html = `${participant.name.toString().toLowerCase()} 
    <span class="badge rounded-pill bg-success">
      ${puntaje}
    </span>
  </button>`
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

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createSignUpForm = () => {
  console.log("createSignUpForm");
  let html = `

    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <form id="formValidate" class="needs-validation" novalidate>
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Register new participant</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-row">
                        <div class="col-md-6 mb-3">
                            <label for="participant-name">Name</label>
                            <input type="text" class="form-control" id="participant-name" name="name" required>
                            <div class="invalid-feedback">Please enter a name</div>
                            <div class="valid-feedback">Looks good!</div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="participant-age">Age</label>
                            <input type="text" class="form-control" id="participant-age" name="age" required>
                            <div class="invalid-feedback">Please enter an age</div>
                            <div class="valid-feedback">Looks good!</div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="participant-sex">Sex</label>
                            <select class="custom-select" id="participant-sex" name="sex" required>
                                <option selected disabled value="">Choose...</option>
                                <option>Masculino</option>
                                <option>Femenino</option>
                                <option>Otro</option>
                            </select>
                            <div class="invalid-feedback">Please enter a sex</div>
                            <div class="valid-feedback">Looks good!</div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button id="btnSubmit" type="submit" class="btn btn-primary" data-dismiss="modal" data-backdrop="false">Register</button>
                </div>
            </div>
        </div>
      </form>
    </div>
    <script>
      $(function () {
        $("#btnSubmit").on("click", function (e) {
            var form = $("#formValidate")[0];
            var isValid = form.checkValidity();
            if (!isValid) {
                e.preventDefault();
                e.stopPropagation();
            }else{
              SaveCredentials();
            }
            form.classList.add('was-validated');
            return false; // For testing only to stay on this page
        });
      });
    </script>
    `;
  $('#app').html(html);
}

const getDefaultPage = () => {
  return '<p class="message">Nothing to See Here :)</p>';
}