window.onload = router();

$(window).on("hashchange", function (){
    router();
});

const CreateQuestions = () => {
    if (questions == undefined) {
        GetQuestionsFromJsonWithAjax();
        console.log(questions)
    }
    return questions;
}

// get info with jquery getJSON
const GetQuestionsFromJson = () => {
    const URLJSON = "config/questions.json";
    questions = [];
    $.getJSON(URLJSON, function(response, status){
        if(status === "success"){
            for(const row of response){
                let q = new Pregunta(row.id, row.topic, row.image, row.question, row.correctAnswer, row.possibleAnswers);
                questions.push(q);
            }
            saveToLocalStorage("questions", JSON.stringify(questions));
        }
    });
}

// get info with ajax
const GetQuestionsFromJsonWithAjax = () => {
    const URLJSON = "config/questions.json";
    questions = [];
    $.ajax({
        url: URLJSON,
        success: function(response){
            for(const row of response){
                let q = new Pregunta(row.id, row.topic, row.image, row.question, row.correctAnswer, row.possibleAnswers);
                questions.push(q);
            }
            saveToLocalStorage("questions", JSON.stringify(questions));
        }
    });
}

const AddQuestion = (question) => {
    createNewQuestionForm();
    if (questions != undefined) {
        if (questions.filter(q => q.id == question.id).length == 0) {
            questions.push(question);
            saveToLocalStorage("questions", JSON.stringify(questions));
        }
    }
}

$(document).ready(function () {
    router();
    $('#lblprofile').html("Profile");
    CreateQuestions();
    if (GetParticipant()) {
        SetPuntaje();
    }
});