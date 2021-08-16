

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
    return '<p class="message">Nothing to See Here :)</p>';
}