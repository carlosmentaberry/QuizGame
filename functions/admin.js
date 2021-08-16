const Admin = () => {
  SetActiveNavItem("admin");
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
  $('#app').html(CREATE_QUESTION_ADMIN_PAGE_HTML());
}

const showModal = () => {
  createNewQuestionForm();
  jQuery.noConflict();
  $('#addquestionmodal').modal('show');
}

const getAdminPage = () => {
  SetActiveNavItem("admin");
  let width = style = "min-width: 70%;margin: 5px;";
  if (isMobile.any()) {
    width = "min-width: 100%;margin: 5px;";
  }
  if (participant != undefined && participant.role != undefined) {
    if (participant.role == "admin") {
      $('#admin').show();
      
      $("#app").html(ADMIN_PAGE_HTML(width));
      SlideDownAnimation('#adminDiv', 500);
    } else {
      AnimateAdminPage(getDefaultPage());
    }
  } else {
    AnimateAdminPage(getDefaultPage());
  }
}

const ShowAllQuestions = () => {

  console.log("getting question");
  $('#app').html(GET_QUESTIONS_LIST_HTML(questions));
}