let HOME_PAGE_HTML = () => {
  let html = `
<div id="homeDiv" class="jumbotron" style="min-width: 100%;">
  <h1 class="display-4">Hola!</h1>
  <p class="lead">Este es un juego de preguntas y respuestas!</p>
  <hr class="my-4">
  <p>Dale jugar y divertite un rato!</p>
  <p class="lead"><button onclick="StartGame()" id="btnQuestions" style="width: 250px;height: 70px;" class="btn btn-primary">Jugar</button>
  </p>
</div>`;
return html;
}

let ABOUT_PAGE_HTML = () => {
  let html = "<h1 id='aboutText'>App desarrollada por Carlos Mentaberry</h1>";
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
              <li class="list-group-item"><small class="text-muted">Dificultad: ${difficulty} - Puntaje: ${puntaje}</small></li>
            </ul>
          </div>
          <div class="card-footer bg-light">
            <div class="btn-group-vertical btn-group-lg btn-block" role="group">
            <button onclick="StartGame()" id="btnQuestions" class="btn btn-primary">Jugar de nuevo</button>
             </div>
          </div>
        </div>
      </div>
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
              <h3 class="card-title">${juego.currentQuestion.question}</h3>
              </div>
              <div class="card-body">
              <div id="countdown" style="min-height: 20px;"><br/></div>
                <img src=${juego.currentQuestion.image} width="150px" height="150px" alt=${juego.currentQuestion.topic}>
                <br/>
                <small class="text-muted">Category: ${juego.currentQuestion.topic.replaceAll("_", " ")}</small>
              </div>
              <div class="card-footer bg-light">
                <p class="card-text">Elegir una opción:</p>
                <div class="btn-group-vertical btn-group-lg btn-block" role="group">
                   ${shuffleArray(juego.currentQuestion.possibleAnswers).map(a => `
                   ${getButtonClass(a)}`).join('')
    }
                 </div>
              </div>
            </div>
          </div>
        </div>
      <br/>
      <button type="button" id="endGame" onclick="EndGame();" class="btn btn-danger btn-block">Finalizar juego</button>
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
               ${shuffleArray(juego.currentQuestion.possibleAnswers).map(a =>
    `<br/><br/>
      ${getButtonClass(a)}`).join('')
    }
             </div>
          </div>
        </div>
      </div>
    </div>
    <br/>
    <button type="button" id="endGame" onclick="EndGame();" class="btn btn-danger">Finalizar juego</button>
  </div>`;
  return html;
}

const LOGIN_FORM_HTML = () => {
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
                console.log("saving credentials");
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

const DIFFICULTY_SELECTOR_HTML = (width) => {
  let html = `
  <div id="topic" class="row row-cols-1 row-cols-md-3 g-4" style="${width}">
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
  return html;
}


let TOPIC_SELECTOR_HTML = (width) => {
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
  `;
  return html;
}


GET_QUESTIONS_LIST_HTML = (q) => {
  let html = `
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



const GET_PROFILE_PAGE_HTML = (p, width, puntaje) => {
  return `<div class="card text-center" style="${width}">
  <div class="card-header">
  <h5 class="card-title">Profile info</h5>
  </div>
  <div class="card-body">
    <ul class="list-group">
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <p class="card-text">User</p>
        <span class="badge badge-light badge-pill">${p.name}</span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        Age
        <span class="badge badge-light badge-pill">${p.age}</span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
      Sex
        <span class="badge badge-light badge-pill">${p.sex}</span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
      Role
        <span class="badge badge-light badge-pill">${p.role}</span>
      </li>
    </ul>
  </div>
  <div class="card-footer text-muted">
      Puntaje: ${puntaje}
  </div>
  </div>
  
  <div class="card-footer bg-light">
  <div class="btn-group-vertical btn-group-lg btn-block" role="group">
  <button onclick="getHomePage()" id="btnQuestions"class="btn btn-primary">Jugar</button> 
   </div>
</div>
  
  `;
}