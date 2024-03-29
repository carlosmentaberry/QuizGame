let HOME_PAGE_HTML = (width) => {
  let html = `
<div id="homeDiv" class="jumbotron" style="min-width: 100%;">
  <h1 class="display-4">Hola!</h1>
  <p class="lead">Este es un juego de preguntas y respuestas!</p>
  <hr class="my-4">
  <p>Dale jugar y divertite un rato!</p>
</div>

<div class="btn-group-vertical btn-group-lg btn-block" role="group">
  <button onclick="StartGame()" id="btnQuestions" class="btn btn-primary" style="${width};height: 50px;">Jugar</button>
</div>

`;
return html;
}

let ABOUT_PAGE_HTML = () => {
  let html = `
  <div id="aboutDiv" class="alert alert-secondary" role="alert">
  <h4 class="alert-heading">Trivia</h4>
  <hr>
  <p>Camada: 16805 - Profesor: Harold Reyes</p>
  <p>Fecha: junio-agosto de 2021</p>
  <p>Dev: Carlos Mentaberry</p>
  <p>Perfil profesional: <a target="_blank" href="https://www.linkedin.com/in/carlos-mentaberry/">LinkedIn</a></p>
  <p>Repositorio: <a target="_blank" href="https://github.com/carlosmentaberry/QuizGame">github</a></p>
  <hr>
  <p class="mb-0">Proyecto final - Curso Javascript</p>
</div>

<div class="btn-group-vertical btn-group-lg btn-block" role="group">
<button onclick="goToHomePage();" id="btnQuestions" style="height: 50px;" class="btn btn-primary">Jugar</button> 
 </div>
  `;
  return html;
}

const GAME_RESULT_HTML = (resultData, width, porc) => {
  let html = `
  <div class="row row-cols-1 row-cols-md-3 g-4" style="${width}">
      <div class="col">
        <div class="card h-100 text-center">
          <div class="card-header bg-light">
          <h3 class="card-title">${porc}% - ${resultData.title}</h3>
          </div>
          <div class="card-body">
          <h5 class="card-title">${resultData.subtitle}</h5>
          <img src=${resultData.img.path} alt=${resultData.img.path} width=${resultData.img.width} style=${resultData.img.style}>
            <br/>
            <br/>
            <ul class="list-group list-group-flush">
              <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  <p class="card-text">User</p>
                  <span class="badge badge-light badge-pill">${participant.name}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Age
                  <span class="badge badge-light badge-pill">${participant.age}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                Sex
                  <span class="badge badge-light badge-pill">${participant.sex}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                Role
                  <span class="badge badge-light badge-pill">${participant.role}</span>
                </li>
              </ul>
              <li class="list-group-item"><small class="text-muted">Dificultad: ${difficulty} - Puntaje: ${score}</small></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-group-vertical btn-group-lg btn-block" role="group" style="margin: 10px 0px 0px 0px">
    <button onclick="StartGame()" id="btnQuestions" style="height: 50px;" class="btn btn-primary">Jugar de nuevo</button>
    </div>`;
  return html;
}

const GET_HTML_MOBILE = () => {
  let html = `
        <div class="d-flex justify-content-center flex-column">
        <div class="row row-cols-1 row-cols-md-3 g-4">
          <div class="col">
            <div class="card h-100 text-center">
              <div class="card-header bg-light">
              <h5 class="card-title">${game.currentQuestion.question}</h5>
              </div>
              <div class="progress">
                <div id="progressbarTimer" class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style="width: ${timerProgressPorcentage.toString()}%" aria-valuenow="${timerProgressPorcentage.toString()}" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div class="card-body">
              <div id="countdown" style="min-height: 20px;"></div>
                <img src=${game.currentQuestion.image} width="130px" height="130px" alt=${game.currentQuestion.topic}>
                <br/>
                <small class="text-muted">Category: ${game.currentQuestion.topic.replaceAll("_", " ")}</small>
              </div>
              <div class="card-footer bg-light">
                <p class="card-text">Elegir una opción:</p>
                <div class="btn-group-vertical btn-group-lg btn-block" role="group">
                   ${shuffleArray(game.currentQuestion.possibleAnswers).map(a => `
                   ${getButtonClass(a)}`).join('')
                  }
                 </div>
              </div>
              <div class="progress">
                <div id="progressbar" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: ${progressPorcentage.toString()}%" aria-valuenow="${progressPorcentage.toString()}" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
          </div>
        </div>
      <br/>
      <button type="button" id="endGame" onclick="EndGame();" style="height: 50px;" class="btn btn-danger btn-block">Finalizar juego</button>
      </div>
      `;
  return html;
}

const GET_HTML_WEB = () => {
  let width = style = "min-width: 70%;";
  if (isMobile.any()) {
    width = "min-width: 90%;";
  }
  let html = `
    <div class="d-flex justify-content-center flex-column" style="${width}">
    <div class="row row-cols-1 row-cols-md-3 g-4 d-flex justify-content-center">
      <div class="col">
        <div class="card h-100">
          <div class="card-header bg-light text-center">
          <h3 class="card-title">${game.currentQuestion.question}</h3>
          </div>
          <div class="progress">
            <div id="progressbarTimer" class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style="width: ${timerProgressPorcentage.toString()}%" aria-valuenow="${timerProgressPorcentage.toString()}" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <div class="card-body text-center">
          <div id="countdown" style="min-height: 70px;"><br/></div>
            <img src=${game.currentQuestion.image} width="150px" height="150px" alt=${game.currentQuestion.topic}>
            <br/>
            <small class="text-muted">Category: ${game.currentQuestion.topic.replaceAll("_", " ")}</small>
          </div>
          <div class="card-footer bg-light text-center">
            <p class="card-text">Elegir una opción:</p>
            <div class="btn-group" role="group">
               ${shuffleArray(game.currentQuestion.possibleAnswers).map(a =>
                `<br/><br/>
                  ${getButtonClass(a)}`).join('')
                }
             </div>
          </div>
          <div class="progress">
            <div id="progressbar" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: ${progressPorcentage}%" aria-valuenow="${progressPorcentage}" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      </div>
    </div>
    <br/>
    <button type="button" id="endGame" onclick="EndGame();" style="height: 50px;" class="btn btn-danger">Finalizar juego</button>
  </div>`;
  return html;
}

const LOGIN_FORM_HTML = () => {
  let html = `
  
      <div class="modal fade" id="exampleModal"data-backdrop="static" tabindex="-1" role="dialog" data-keyboard="false" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
              return false; 
          });
        });
      </script>
      `;
  $('#app').html(html);
}

const TOPIC_SELECTOR_HTML = (width) => {
  let html = `
  <div id="topic" class="row row-cols-1 row-cols-md-3 g-4" style="${width}">
  <div class="col">
    <div class="card h-100 text-center">
      <div class="card-header bg-light">
      <h3 class="card-title">ELEGIR TEMA</h3>
      </div>
      <div class="card-body">
        <div class="list-group">
        ${getTopics(questions).map(t => 
          `<a href="#" id="${t}" onClick="SetActiveTopic('${t}')" class="list-group-item list-group-item-action">${getTopicQuantity(t)}</a>
        `).join(' ')}
        </div>
      </div>
      <div class="card-footer">
      <small class="text-muted">random - responderás preguntas de todas las categorías</small>
      </div>
    </div>
  </div>
</div>
  `;
  return html;
}


let DIFFICULTY_SELECTOR_HTML = (width) => {
  let html = `
  <div id="difficulty" class="row row-cols-1 row-cols-md-3 g-4 " style="${width}">
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
  return html;
}



ADMIN_PAGE_HTML = (width) => {
  let html = `
  <div id="adminDiv" class="justify-content-center flex-column" style="${width}">
    <div class="row row-cols-1 row-cols-md-3 g-4 d-flex justify-content-center">
      <div class="col">
        <div class="card h-100">
          <div class="card-header bg-light text-center">
          <h3 class="card-title">Administrar</h3>
          </div>
          <div class="card-body text-center">
          <p class="card-text">Elegir una acción:</p>
          <div class="align-content-center flex-wrap">
            <input type="button" class="btn btn-outline-dark" style="${width}" id="addQuestionButton" onClick="showModal()" value="Agregar una pregunta" style="min-width: 200px" />
            <input type="button" class="btn btn-outline-dark" style="${width}" id="showQuestionsButton" onClick="ShowAllQuestions()" value="Mostrar preguntas" style="min-width: 200px" />
            <input type="button" class="btn btn-outline-dark" style="${width}"  id="deleteQuestionsButton" onClick="BorrarPreguntas()" value="Borrar Preguntas (clean localstorage)" style="min-width: 200px" />
            <input type="button" class="btn btn-outline-dark" style="${width}" id="logOffButton" onClick="CerrarSesion()" value="Cerrar Sessión (clean sessionstorage)" style="min-width: 200px" />
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="btn-group-vertical btn-group-lg btn-block" role="group">
  <button onclick="goToHomePage();" id="btnQuestions" style="height: 50px;margin: 10px 0px 0px 0px" class="btn btn-primary">Jugar</button> 
   </div>
  `;
  return html;
}


GET_QUESTIONS_LIST_HTML_WEB = () => {
  let html = `
  <div id="questionsDiv" class="card text-center">
    <div class="card-header">
      <h5 class="card-title">Filtro</h5>
    </div>
    <div class="d-flex justify-content-center card-body">
      ${getTopics(questions).map(t => 
        `<div class="custom-control custom-radio">
            <input type="radio" id="${t}" onclick="filterQuestions('${t}')" name="customRadio"
              class="custom-control-input">
            <label class="custom-control-label" for="${t}" style="margin: 0px 100px 0px 0px;">${getTopicQuantity(t)}</label>
        </div>
      `).join(' ')}
    </div>
    <div class="card-footer text-muted"><small class="text-muted">Filtro por categoría</small></div>
  </div>
  <div class="list-group" id="divFilteredQuestions"></div>
  `;
  return html;
}

GET_QUESTIONS_LIST_HTML_MOBILE = () => {
  let html = `
  <div id="questionsDiv" class="card text-center" style="min-width: 90%">
    <div class="card-header">
      <h5>Filtro</h5>
    </div>
    <div class="card-body d-flex flex-wrap">
      ${getTopics(questions).map(t => 
        `<div class="custom-control custom-radio">
          <input type="radio" id="${t}" onclick="filterQuestions('${t}')" name="customRadio"
            class="custom-control-input">
          <label class="custom-control-label" for="${t}" style="margin: 0px 100px 0px 0px;">${getTopicQuantity(t)}</label>
        </div>`).join(' ')}
    </div>
    <div class="card-footer text-muted"><small class="text-muted">Filtro por categoría</small></div>
  </div>
  <br/>
  <div class="list-group" id="divFilteredQuestions"></div>
  `;
  return html;
}

GET_FILTERED_QUESTIONS_LIST_HTML = () => {
  let html = `
  ${filteredQuestions.map(a =>
    `<br/>
    <div class="list-group">
      <a href="" class="list-group-item list-group-item-action">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">${a.id} - ${a.question}</h5>
          <small class="text-muted">Topic: ${a.topic}</small>
        </div>
        Options: 
        <p class="mb-1">${a.possibleAnswers}</p>
        
        <img src=${a.image} width="150px" height="150px" alt=${a.topic}><br/>
        <small class="text-muted">Correct answer: ${a.correctAnswer}</small>
      </a>
    </div>`).join(' ')
    }`;
  return html;
}

GET_FILTERED_QUESTIONS_LIST_HTMLMOBILE = () => {
  let html = `
  ${filteredQuestions.map(a =>
    `<div class="list-group text-center">
      <a href="" class="list-group-item list-group-item-action">
        <div class="text-center">
          <h5 class="mb-1">${a.id} - ${a.question}</h5>
        </div>
        Options: 
        <p class="mb-1">${a.possibleAnswers}</p>
        
        <img src=${a.image} width="150px" height="150px" alt=${a.topic}><br/>
        <div class="d-flex w-100 justify-content-between">
        <small class="text-muted">Correct answer: ${a.correctAnswer}</small>
        <small class="text-muted">Topic: ${a.topic}</small>
        </div>
      </a>
      <br/>
    </div>`).join(' ')
    }`;
  return html;
}

CREATE_QUESTION_ADMIN_PAGE_HTML = () => {
  let html = `
    <div class="modal" id="addquestionmodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add question</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
        <p>Completar todos los campos para agregar una pregunta</p>
          <form>
          <div class="container">
          <div class="input-group mb-3">
            <span class="input-group-text" id="topic">Categoría</span>
            <input type="text" class="form-control" placeholder="ingresar categoría" aria-label="ingresar categoría" aria-describedby="basic-addon1" name="topic" required >
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="question">Pregunta</span>
            <input type="text" class="form-control" placeholder="ingresar pregunta" aria-label="ingresar pregunta" aria-describedby="basic-addon1" name="question" required >
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="answer">Respuesta correcta</span>
            <input type="text" class="form-control" placeholder="ingresar respuesta correcta" aria-label="ingresar respuesta correcta" aria-describedby="basic-addon1" name="answer" required >
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="possibleanswers">Respuestas posibles</span>
            <input type="text" class="form-control" placeholder="Ingresar respuestas posibles separadas por coma ','" aria-label="Ingresar respuestas posibles separadas por coma ','" aria-describedby="basic-addon1" name="possibleanswers" required >
          </div>

          </div>
          </form>
        </div>
        <div class="modal-footer">
	  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" onclick="CreateQuestion()" class="btn btn-primary">Add</button>
        </div>
      </div>
    </div>
  </div>
    `;
  return html;
}



const GET_PROFILE_PAGE_HTML = (p, score) => {
  return `<div id="profileDiv" class="card text-center" style="min-width: 90%;">
  <div class="card-header">
  <h5 class="card-title">Profile info</h5>
  </div>
  <div class="card-body">
    <ul class="list-group">
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <p class="card-text">User</p>
        <span class="badge badge-secondary badge-pill">${p.name}</span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        Age
        <span class="badge badge-secondary badge-pill">${p.age}</span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
      Sex
        <span class="badge badge-secondary badge-pill">${p.sex}</span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
      Role
        <span class="badge badge-secondary badge-pill">${p.role}</span>
      </li>
    </ul>
  </div>
  <div class="card-footer text-muted">
      Puntaje: ${score}
  </div>
  </div>
  
  <div class="btn-group-vertical btn-group-lg btn-block" role="group">
  <button onclick="goToHomePage();" id="btnQuestions" style="height: 50px;margin: 10px 0px 0px 0px" class="btn btn-primary">Jugar</button> 
   </div>
  `;
}

SET_SCORE_HTML = (name, score) => {
  let html = `${name} 
  <span class="badge rounded-pill bg-success">
    ${score}
  </span>`
  return html;
}


const GET_NOTHING_TO_SEE_HERE_HTML = () =>{
  return `<div id="nothingHereDiv" class="card text-center" style="min-width: 90%;">
            <div class="card-body">
            Nothing to See Here :)
            </div>
          </div>
    <div class="btn-group-vertical btn-group-lg btn-block" role="group">
    <button onclick="goToHomePage();" id="btnQuestions" style="height: 50px;margin: 10px 0px 0px 0px" class="btn btn-primary">Jugar</button> 
    </div>
  `;
}
