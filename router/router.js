const routes = [
    { path: "/home", action: "home" },
    { path: "/admin", action: "admin" },
    { path: "/about", action: "about" },
    { path: "/profile", action: "profile" },
];

const router = () => {
    let currentPath = location.hash.slice(1);
    let pathToGo = routes.find((p) => p.path == currentPath);
    if (pathToGo != undefined) {
        switch (pathToGo.action) {
            case routes[0].action:
                console.log("home");
                getHomePage();
                break;
            case routes[1].action:
                console.log("admin");
                getAdminPage();
                break;
            case routes[2].action:
                console.log("about");
                getAboutPage();
                break;
            case routes[3].action:
                console.log("profile");
                getProfilePage();
                break;
            default:
                getDefaultPage();
                console.log("default");
                break;
        }
    }
}