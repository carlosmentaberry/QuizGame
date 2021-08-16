const Profile = () => {
  SetActiveNavItem("profile");
}

const getProfilePage = () => {

  let html = "";
  let width = style = "min-width: 90%;";
  console.log("participant")
  console.log(participant);
  console.log("nullParticipant")
  console.log(nullParticipant);
  if (participant != undefined && participant != null) {
    html = GET_PROFILE_PAGE_HTML(participant, width, puntaje);
  } else {
    html = GET_PROFILE_PAGE_HTML(nullParticipant, width, 0);
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
    function () {
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
    function () {
      console.log('fin de la animación');
    }
  );
}