class Juego {
    constructor(preguntas, puntaje, dificultad, topic) {
        console.log("PREGUNTAS Geografia: " + preguntas.filter(x => x.topic == "Geografia").length);
        console.log("PREGUNTAS Cultura_General: " + preguntas.filter(x => x.topic == "Cultura_General").length);
        console.log("PREGUNTAS Arte: " + preguntas.filter(x => x.topic == "Arte").length);
        console.log("PREGUNTAS Deporte: " + preguntas.filter(x => x.topic == "Deporte").length);
        this.preguntas = [];
        console.log("topic: " + dificultad);
        console.log("topic: " + topic);
        var currentIndex, randomIndex = 0;
        
        if(topic == "random"){
            currentIndex = preguntas.filter(x => x.topic == topic).length;
            while (0 !== currentIndex) {

                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
    
                [preguntas[currentIndex], preguntas[randomIndex]] = [preguntas[randomIndex], preguntas[currentIndex]];
            }
        }else{
            currentIndex = preguntas.length, randomIndex;
            while (0 !== currentIndex) {

                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
    
                [preguntas.filter(x => x.topic == topic)[currentIndex], preguntas.filter(x => x.topic == topic)[randomIndex]] = [preguntas.filter(x => x.topic == topic)[randomIndex], preguntas.filter(x => x.topic == topic)[currentIndex]];
            }
        }
        
        switch (dificultad) {
            case "hard":
                if(topic != "random"){
                    this.preguntas = preguntas.filter(x => x.topic == topic).slice(0, 10);
                }else{
                    this.preguntas = preguntas.slice(0, 10);
                }
                break;
            case "medium":
                if(topic != "random"){
                    this.preguntas = preguntas.filter(x => x.topic == topic).slice(0, 5);
                }else{
                    this.preguntas = preguntas.slice(0, 5);
                }
                break;

            case "easy":
                if(topic != "random"){
                    this.preguntas = preguntas.filter(x => x.topic == topic).slice(0, 3);
                }else{
                    this.preguntas = preguntas.slice(0, 3);
                }
                break;
        }
        this.puntaje = puntaje;
        this.dificultad = dificultad;
        this.topic = topic;
        this.maximoPuntaje = this.preguntas.length;
    }

    setCurrentQuestion(quest) {
        this.currentQuestion = quest;
    }
    SumarPuntos(puntaje) {
        this.puntaje = puntaje;
    }

    getNextQuestion() {
        return this.preguntas.pop();
    }
}