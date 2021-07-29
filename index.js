window.onload = router();

$(window).on("hashchange", function (){
    router();
});

const CreateQuestions = () => {
    if (questions == undefined) {

        // let q1 = new Pregunta(1, "Geografía", "https://cdn.iconscout.com/icon/premium/png-256-thumb/geography-2147405-1805486.png", "¿Cual es la capital de Argentina?", "Buenos Aires", ["CABA", "La Plata", "Buenos Aires"]);
        // let q2 = new Pregunta(2, "Geografía", "https://cdn.iconscout.com/icon/premium/png-256-thumb/geography-2147405-1805486.png", "¿Cuantas provincias tiene Argentina?", 23, [21, 22, 23, 24]);
        // let q3 = new Pregunta(3, "Geografía", "https://cdn.iconscout.com/icon/premium/png-256-thumb/geography-2147405-1805486.png", "¿Cual es la capital de Catamarca?", "San Fernando del Valle de Catamarca", ["San Fernando del Valle de Catamarca", "Belén", "Santa María"]);
        // let q4 = new Pregunta(4, "Geografía", "https://cdn.iconscout.com/icon/premium/png-256-thumb/geography-2147405-1805486.png", "¿Que provincias componen la región de cuyo?", "San Juan, San Luis y Mendoza", ["San Juan, San Luis y La Rioja", "San Juan, San Luis y Mendoza", "San Juan, San Luis y Neuquen"]);
        // let q5 = new Pregunta(5, "Geografía", "https://cdn.iconscout.com/icon/premium/png-256-thumb/geography-2147405-1805486.png", "¿En qué provincia se encuentran Las Ruinas de San Ignacio?", "Misiones", ["Salta", "Jujuy", "Corrientes", "Misiones"]);
        // questions = [q1, q2, q3, q4, q5];
        GetQuestionsFromJson();
        console.log(questions)
    }
    return questions;
}

const GetQuestionsFromJson = () => {
    const URLJSON = "config/questions.json";
    questions = [];
    $.getJSON(URLJSON, function(response, status){
        if(status === "success"){
            for(const row of response){
                let q = new Pregunta(row.id, row.topic, row.image, row.question, row.correctAnswer, row.possibleAnswers.split(','));
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