function goTo(page){
    window.location.replace(page);
}
function escapeThemAll(escapeMe){
    console.log("BEFORE: "+escapeMe)
    for(var i=0;i<to_escape.length;i++){
        escapeMe = escapeMe.replaceAll(to_escape[i], encodeURIComponent(to_escape[i]))
    }
    console.log("AFTER: "+escapeMe)
    return escapeMe
}
function loggedInTeacher(){
    var user = window.localStorage.getItem('username');
    var role = window.localStorage.getItem('type');
    console.log(user);
    if(role == null)
        window.location.replace("https://web.njit.edu/~jcc53/loginPage.html");
    if(role == "student")
        window.location.replace("https://web.njit.edu/~jcc53/studentHomePage.html")
    var role = window.localStorage.getItem('role');
    document.getElementById("userid").innerHTML = "User: "+user
}
function loggedInStudent(){
    var user = window.localStorage.getItem('username');
    var role = window.localStorage.getItem('type');
    console.log(user);
    if(role == null)
        window.location.replace("https://web.njit.edu/~jcc53/loginPage.html");
    if(role == "teacher")
        window.location.replace("https://web.njit.edu/~jcc53/teacherHomePage.html")
    var role = window.localStorage.getItem('role');
    document.getElementById("userid").innerHTML = "User: "+user
}

function logOut(){
    console.log("Log out");
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('type')
    window.location.replace('https://web.njit.edu/~jcc53/loginPage.html');
}