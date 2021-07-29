const About = () => {
    SetActiveNavItem("about");
}

const getAboutPage = () => {
    let html = "<h1>App desarrollada por Carlos Mentaberry</h1>";
    $("#app").html(html);
}