class Game {
    constructor(questions, score, dificultad, topic) {
        this.questions = [];
        var currentIndex, randomIndex = 0;
        
        if(topic == "random"){
            currentIndex = questions.filter(x => x.topic == topic).length;
            while (0 !== currentIndex) {

                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
    
                [questions[currentIndex], questions[randomIndex]] = [questions[randomIndex], questions[currentIndex]];
            }
        }else{
            currentIndex = questions.length, randomIndex;
            while (0 !== currentIndex) {

                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
    
                [questions.filter(x => x.topic == topic)[currentIndex], questions.filter(x => x.topic == topic)[randomIndex]] = [questions.filter(x => x.topic == topic)[randomIndex], questions.filter(x => x.topic == topic)[currentIndex]];
            }
        }
        
        switch (dificultad) {
            case "hard":
                if(topic != "random"){
                    this.questions = questions.filter(x => x.topic == topic).slice(0, 10);
                }else{
                    this.questions = questions.slice(0, 10);
                }
                break;
            case "medium":
                if(topic != "random"){
                    this.questions = questions.filter(x => x.topic == topic).slice(0, 5);
                }else{
                    this.questions = questions.slice(0, 5);
                }
                break;

            case "easy":
                if(topic != "random"){
                    this.questions = questions.filter(x => x.topic == topic).slice(0, 3);
                }else{
                    this.questions = questions.slice(0, 3);
                }
                break;
        }
        this.score = score;
        this.dificultad = dificultad;
        this.topic = topic;
        this.maxScore = this.questions.length;
    }

    setCurrentQuestion(quest) {
        this.currentQuestion = quest;
    }
    SumarPuntos(score) {
        this.score = score;
    }

    getNextQuestion() {
        return this.questions.pop();
    }
}
