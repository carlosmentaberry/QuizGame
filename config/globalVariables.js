let questions;
let filteredQuestions =[];
let score = 0;
let participant;
let game;
let difficulty;
let topic;
let countDownStarted = false;
let changedQuestion = false;
let timer;
let questionNumber = 0;
let progressPorcentage = 0;
let timerProgressPorcentage = 1;
let secs = 0;
let nullParticipant = {
    name: "#",
    profile: "Profile",
    age: "#",
    sex: "#",
    role: "#",
}

const looser = {
    img: {
        path: "https://media1.tenor.com/images/e51a9bd7a012907e85135e3185d4c4c1/tenor.gif?itemid=10852716",
        width: "250px",
        alt: "burro",
        style: "padding: 2%;",
    },
    title: "PERDISTE :'(",
    subtitle: "Mejor suerte para la proxima!!",
};

const looseSoso = {
    img: {
        path: "https://estaticos.muyinteresante.es/uploads/images/article/5536592a70a1ae8d775df846/dia-del-mono.jpg",
        width: "250px",
        alt: "primate",
        style: "padding: 2%;",
    },
    title: "PERDISTE :'(",
    subtitle: "Puedes hacerlo mejor!!",
};

const winner = {
    img: {
        path: "https://c.tenor.com/MZkqMgAe_qoAAAAC/thinkaboutit-smart.gif",
        width: "250px",
        alt: "robot",
        style: "padding: 2%;",
    },
    title: "GANASTE :D",
    subtitle: "Brillante!!",
};

const Best = {
    img: {
        path: "https://mymodernmet.com/wp/wp-content/uploads/2021/01/boston-dynamics-do-you-love-me-robot-dance-02.gif",
        width: "250px",
        alt: "robot",
        style: "padding: 2%;",
    },
    title: "GANASTE :D",
    subtitle: "Genial!!",
};