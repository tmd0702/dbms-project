const logInFormElement = document.querySelector('.login-form form');
const signUpFormElement = document.querySelector('.signup-form');
const loginFormSignUpBtn = document.querySelector('.login-form .signup-button');
const signUpFormExitBtn = document.querySelector('.signup-form .exit-button');

function httpGet(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

logInFormElement.addEventListener('submit', (event) => {
    event.preventDefault();
    const formInputElements = logInFormElement.querySelectorAll('input');
    const loginInfo = {};
    for (let formInput of formInputElements) {
        loginInfo[formInput.name] = formInput.value;
    }
    let url = `http://localhost:8081/login?username=${loginInfo['username']}&password=${loginInfo['password']}`;
    let loginStatus = httpGet(url);
    console.log(loginStatus);
})

function resetFormInput(formInputElements) {
    for (let formInput of formInputElements) {
        formInput.value = '';
    }
} 

signUpFormElement.addEventListener('submit', (event) => {
    event.preventDefault();
    const formInputElements = signUpFormElement.querySelectorAll('input');
    const signupInfo = {};
    for (let formInput of formInputElements) {
        signupInfo[formInput.name] = formInput.value;
    }
    let url = `http://localhost:8081/signup?`
    for (let key of Object.keys(signupInfo)) {
        url += `${key}=${signupInfo[key]}&`;
    }
    // url = url.substring(0, url.length - 1);
    console.log(url);
    let signupStatus = httpGet(url);
    console.log(signupStatus);
})

loginFormSignUpBtn.onclick = function() {
    signUpFormElement.classList.add('signup-form-active'); 
}

signUpFormExitBtn.onclick = function() {
    signUpFormElement.classList.remove('signup-form-active');
}