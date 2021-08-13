const Profile = () => {
    SetActiveNavItem("profile");
}

const getProfilePage = () => {
    let html = "";
    if(participant != undefined){
    html = `<div class="card text-center">
    <div class="card-header">
    <h5 class="card-title">Profile info</h5>
    </div>
    <div class="card-body">
        <p class="card-text">${participant.name}</p>
        <p class="card-text">Age: ${participant.age}</p>
        <p class="card-text">Sex: ${participant.sex}</p>
        <p class="card-text">Role: ${participant.role}</p>
    </div>
    <div class="card-footer text-muted">
        Puntaje: ${puntaje}
    </div>
    </div>`;
    }else{
        html = `<div class="card text-center">
        <div class="card-header">
        <h5 class="card-title">Profile info</h5>
        </div>
        <div class="card-body">
            <p class="card-text">No user logged</p>
            <p class="card-text">Age: #</p>
            <p class="card-text">Sex: #</p>
            <p class="card-text">Role: #</p>
        </div>
        <div class="card-footer text-muted">
            Puntaje: 0
        </div>
        </div>`
    }

    $("#app").html(html);
}

const AnimateProfilePage = () => {
  
    $('h5').animate({
      left: '250px',
      opacity: '0.1',
      height: '150px',
      width: '250px',
      },
      "slow",
      function (){
        console.log('fin de la animación');
      }
    );
    
    $('h5').animate({
      left: '250px',
      opacity: '1',
      height: '48px',
      width: '78px',
      },
      "slow",
      function (){
        console.log('fin de la animación');
      }
    );
  }