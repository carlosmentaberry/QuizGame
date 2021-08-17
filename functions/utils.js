const saveToLocalStorage = (name, value) => {
    localStorage.clear();
    localStorage.setItem(name.toString().toLowerCase(), value);
}

const getFromLocalStorage = (name) => {
    return localStorage.getItem(name);
}

const saveToSessionStorage = (name, value) => {
    sessionStorage.clear();
    sessionStorage.setItem(name.toString().toLowerCase(), value);
}

const getFromSessionStorage = (name) => {
    return sessionStorage.getItem(name);
}

const shuffleArray = (array) => {
    var currentIndex = array.length, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

const getPorcentage = (currentValue, totalValue) => {
    let porcent = currentValue * 100 / totalValue;
    return Math.trunc(porcent * 100) / 100;
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


const getDefaultPage = () => {
    return GET_NOTHING_TO_SEE_HERE_HTML();
}

var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

const filterQuestions = (element) => {
    switch (element) {
        case "Deporte":
            filteredQuestions = questions.filter(x => x.topic == "Deporte");
            break;
        case "Cultura_General":
            filteredQuestions = questions.filter(x => x.topic == "Cultura_General");
            break;
        case "Arte":
            filteredQuestions = questions.filter(x => x.topic == "Arte");
            break;
        case "Geografia":
            filteredQuestions = questions.filter(x => x.topic == "Geografia");
            break;
        default:
            filteredQuestions = questions;
            break;
    }
    
    $('#divFilteredQuestions').html(GET_FILTERED_QUESTIONS_LIST_HTML());
    return filteredQuestions;
}