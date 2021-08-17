const routes = [
    { path: "/home", action: "home" },
    { path: "/admin", action: "admin" },
    { path: "/about", action: "about" },
    { path: "/profile", action: "profile" },
];

const router = () => {
    let currentPath = location.hash.slice(1);
    let pathToGo = routes.find((p) => p.path == currentPath);
    if(location.hash == 0){
        getHomePage();
    }
    if (pathToGo != undefined) {
        switch (pathToGo.action) {
            case routes[0].action:
                getHomePage();
                break;
            case routes[1].action:
                getAdminPage();
                break;
            case routes[2].action:
                getAboutPage();
                break;
            case routes[3].action:
                getProfilePage();
                break;
            default:
                getDefaultPage();
                break;
        }
    }
}