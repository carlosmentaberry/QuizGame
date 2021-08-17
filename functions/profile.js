const getProfilePage = () => {
  SetActiveNavItem("profile");
  let html = "";
  if (participant != undefined && participant != null) {
    html = GET_PROFILE_PAGE_HTML(participant, score);
  } else {
    html = GET_PROFILE_PAGE_HTML(nullParticipant, 0);
  }
  $("#app").html(html);
  SlideDownAnimation('#profileDiv', 500);
}