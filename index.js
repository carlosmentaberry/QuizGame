window.onload = router();

$(window).on("hashchange", function () {
    router();
});

$(document).ready(function () {
    router();
    $('#lblprofile').html("Profile");
    CreateQuestions();
    if (GetParticipant()) {
        SetScore();
    }
});


const CreateQuestions = () => {
    questions = undefined;
    GetQuestionsFromJsonWithAjax();
    return questions;
}

// get info with ajax
const GetQuestionsFromJsonWithAjax = () => {
    const URLJSON = "db/questions.json";
    questions = [];
    $.ajax({
        url: URLJSON,
        success: function (response) {
            for (const row of response) {
                let topic = './assets/' + row.topic + '.png';
                let q = new Question(row.id, row.topic, topic, row.question, row.correctAnswer, row.possibleAnswers);
                q.possibleAnswers.push(q.correctAnswer);
                questions.push(q);
            }
            saveToLocalStorage("questions", JSON.stringify(shuffleArray(questions)));
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
