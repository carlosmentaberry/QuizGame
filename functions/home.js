const Home = () => {
    SetActiveNavItem("home");
    $('#btnQuestions').show();
}


const getHomePage = () => {
    let html = `<button onclick="StartGame()" id="btnQuestions" class="btn btn-primary">Jugar</button>`;
    
    $("#app").html(html);
}