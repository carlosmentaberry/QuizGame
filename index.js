window.onload = router();

$(window).on("hashchange", function () {
    router();
});

const CreateQuestions = () => {
    console.log("CreateQuestions")
    if (questions == undefined) {
        GetQuestionsFromJsonWithAjax();
    }
    
    return questions;
}
const SortQuestions = (questions) => {
    var currentIndex, randomIndex = 0;
    currentIndex = questions.length;
    while (0 !== currentIndex) {
  
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
  
        [questions[currentIndex], questions[randomIndex]] = [questions[randomIndex], questions[currentIndex]];
    }
    return questions;
  }

// get info with jquery getJSON
const GetQuestionsFromJson = () => {
    const URLJSON = "config/questions.json";
    questions = [];
    $.getJSON(URLJSON, function (response, status) {
        if (status === "success") {
            for (const row of response) {
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
        success: function (response) {
            for (const row of response) {
                let q = new Pregunta(row.id, row.topic, row.image, row.question, row.correctAnswer, row.possibleAnswers);
                questions.push(q);
            }
            saveToLocalStorage("questions", JSON.stringify(SortQuestions(questions)));
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

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};