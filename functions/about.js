const About = () => {
  SetActiveNavItem("about");
}

const getAboutPage = () => {
  SetActiveNavItem("about");
  $("#app").html(ABOUT_PAGE_HTML());
  SlideDownAnimation('#aboutDiv', 500);
}