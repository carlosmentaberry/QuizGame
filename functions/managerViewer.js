const StartGame = () => {
  $('#app').html("");
  SetActiveNavItem("home");
  console.log("starting game");
  SignUp();
  if (sessionStorage.getItem('participant') != undefined) {
    console.log("creating game");
    juego = new Juego(questions, 0, "hard");
    juego.preguntas = [];
    console.log("participante registrado");
    $('#app').html(ShowQuestion());
  }
  $('#btnQuestions').show();
}

const SetActiveNavItem = (item) => {
  $('#home, #admin, #about, #profile').attr('class', 'nav-link');
  $('#' + item).attr('class', 'nav-link active');
  $('#btnQuestions').hide();
}

const GetParticipant = () => {
  participant = JSON.parse(sessionStorage.getItem('participant'));
  if (participant != undefined) {
    $("#userName").text(participant.name);
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
  }
}

const SaveCredentials = () => {
  jQuery.noConflict();
  $('#exampleModal').modal('hide');
  console.log("saving credentials");
  let name = $('[name="name"]')[0].value;
  let age = $('[name="age"]')[0].value;
  let sex = $('[name="sex"]')[0].value;
  let role = 'player';
  if (name == "admin") {
    role = 'admin';
    $('#admin').show();
  }

  participant = new Participant(name, age, sex, role);
  sessionStorage.setItem('participant', JSON.stringify(participant))
  SetPuntaje();

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
  var questions = " ";
  let q = ShowRandomQuestion()[0];
  juego.preguntas.push(q);
  let correctAnswer = q.correctAnswer;
  questions += `
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col">
        <div class="card h-100">
          <div class="card-header bg-light">
            <h5 class="card-title">Pregunta nro: ${q.id}</h5>
          </div>
          <div class="card-body">
            <h3 class="card-title">${q.question}</h3>
            <img src=${q.image} width="150px" height="150px" alt=${q.topic}>
            <br/>
            <small class="text-muted">Category: ${q.topic}</small>
          </div>
          <div class="card-footer bg-light">
            <p class="card-text">Elegir una opción:</p>
            <div class="btn-group" role="group">
               ${q.possibleAnswers.map(a =>
                `<br/><br/>
                <input type="button" class="btn btn-outline-dark" id='${a}' name=${a} onClick="validateResponse('${a}', '${correctAnswer}')" value= '${a}' />`).join('')
               }
             </div>
          </div>
        </div>
      </div>
    </div>
  <br/>
  <button type="button" id="btnQuestion" onclick="ShowQuestion();" class="btn btn-primary">Next Question</button>
  <button type="button" id="endGame" onclick="EndGame();" class="btn btn-primary">Finalizar juego</button>
        `
  return questions;
}

const validateResponse = (choise, correctAnswer) => {

  $('#btnQuestions').html("Proxima pregunta");
  $('#btnQuestions').show();
  console.log('choise: ' + choise);
  console.log('correctAnswer: ' + correctAnswer);

  let element = `#${choise}`;
  console.log(element);
  console.log(correctAnswer);

  if (choise == correctAnswer) {
    puntaje++;
    SetPuntaje();
    document.getElementById(choise).className = "btn btn-success";
    $(element).attr('class', 'btn btn-success');
  } else {
    document.getElementById(choise).className = "btn btn-danger";
    $(element).attr('class', 'btn btn-danger');
  }
}

const saveToLocalStorage = (name, value) => {
  localStorage.clear();
  localStorage.setItem(name, value);
}

const EndGame = () => {
  juego = undefined;
  puntaje = 0;
  SetPuntaje();
}

const SetPuntaje = () => {
  let html = "";
  if(participant != undefined){
    html = `${participant.name} 
    <span class="badge rounded-pill bg-success">
      ${puntaje}
    </span>
  </button>`
  }else{
    html = `Profile
    <span class="badge rounded-pill bg-success">
      0 
    </span>
  </button>`
  }
  $('#userName').html(html);
}

const ShowRandomQuestion = () => {
  let id = 0;
  let i = 0
  exit = true;
  let quest;
  while(exit){
    id = randomInteger(1, CreateQuestions().length).toString();
    console.log(id);
    quest = questions.filter(x => x.id == id);
    console.log(quest);
    if(juego != undefined && juego.preguntas != undefined){
      console.log('if(juego != undefined && juego.preguntas != undefined){');
      console.log(juego.preguntas);
      if(!juego.preguntas.includes(quest)){
        exit = false;
      }
    }
    if(i == 100){ exit = false; }
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
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Register new participant</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
            <div class="form-group">
              <label for="participant-name" class="col-form-label">Name:</label>
              <input type="text" class="form-control" id="participant-name" name="name" required>
            </div>
            <div class="form-group">
              <label for="participant-age" class="col-form-label">Age:</label>
              <input type="text" class="form-control" id="participant-age" name="age" required>
            </div>
            <div class="form-group">
              <label for="participant-sex" class="col-form-label">Sex:</label>
              <input type="text" class="form-control" id="participant-sex" name="sex" required>
            </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" onclick="SaveCredentials();" class="btn btn-primary">Register</button>
          </div>
        </div>
      </div>
    </div>

    
    `
  $('#app').html(html);
}


const getDefaultPage = () => {
  return '<p class="message">Nothing to See Here :)</p>';
}