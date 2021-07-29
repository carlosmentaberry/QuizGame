const Admin = () => {
  SetActiveNavItem("admin");
}

const AddQuestions = () => {
  let question = new Pregunta(6, 'Geografia', '¿Cuál es la capital de Mongolia?', 'Ulan Bator', ['El Cairo', 'Ulan Bator', 'Luanda', 'Nairobi']);
  AddQuestion(question);
}


const CreateQuestion = () => {
  console.log("creating question");
  jQuery.noConflict();
  $('#addquestionmodal').modal('hide');
  let id = questions.length + 1;

  let topic = $('[name="topic"]')[0].value;
  let quest = $('[name="question"]')[0].value;
  let answer = $('[name="answer"]')[0].value;

  let possibleanswers = $('[name="possibleanswers"]')[0].value.toString().split(';');
  let question = new Pregunta(id, topic, quest, answer, possibleanswers);
  console.log(question);
  AddQuestion(question);
}

const BorrarPreguntas = () => {
  localStorage.clear();
}

const CerrarSesion = () => {
  sessionStorage.clear();
  location.reload();
}


const createNewQuestionForm = () => {
  console.log("createNewQuestionForm");
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

    `

  $('#app').html(html);
}

const showModal = () => {
  createNewQuestionForm();
  jQuery.noConflict();
  $('#addquestionmodal').modal('show');
}

const getAdminPage = () => {
  let html = "";
  if (participant != undefined && participant.role != undefined) {
    if (participant.role == "admin") {
      $('#admin').show();
      html = `<button onclick="showModal()" class="btn btn-primary">Agregar una pregunta</button>
              <button onclick="ShowAllQuestions()" class="btn btn-primary">Mostrar preguntas</button>
              <button onclick="BorrarPreguntas()" class="btn btn-primary">Borrar Preguntas (clean localstorage)</button>
              <button onclick="CerrarSesion()" class="btn btn-primary">Cerrar Sessión (clean sessionstorage)</button>`;
      $("#app").html(html);
    } else {
      AnimatePage();
    }
  } else {
    AnimatePage();
  }
}

const AnimatePage = () => {
  $('#admin').hide();
  html = getDefaultPage();
  $("#app").html(html);


  $('.message').animate({
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
  
  $('.message').animate({
    left: '250px',
    opacity: '1',
    height: '150px',
    width: '250px',
    },
    "slow",
    function (){
      console.log('fin de la animación');
    }
  );
}