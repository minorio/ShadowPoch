const registerLogin = document.querySelector('#create-login');
const registerPassword = document.querySelector('#create-password');
const reapetPassword = document.querySelector('#repeat-password');
const registerBtn = document.querySelector('#show-modal__register-btn');


registerBtn.addEventListener('click', (event) => {
    event.preventDefault() 
    if(registerPasswordCheck() && registerNicknameCheck()) {
        fetch(url + 'user', {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
            login: registerLogin.value,
            password: registerPassword.value,
            })
        }).then((res) => {
            return res.json()
        }).then(res =>{
            localStorage.setItem('UserID', res.id);
            checkUsersStatus()
            location.hash = '#home';
            getUserAvatar()
        })
        const modalRegisteredAccount = $modal();
        modalRegisteredAccount.setContent(`Welcome  ${registerLogin.value}`);
        modalRegisteredAccount.setTitle('');
        modalRegisteredAccount.show(); 
        } else {
        const modalRegisteredAccount = $modal();
        modalRegisteredAccount.setContent("Account not registered");
        modalRegisteredAccount.setTitle('');
        modalRegisteredAccount.show();
        // alert('Account not registered')
    }

})

registerPassword.addEventListener('blur', registerPasswordCheck)
reapetPassword.addEventListener('blur', registerPasswordCheck)
registerLogin.addEventListener('blur', registerNicknameCheck)


async function registerNicknameCheck() { 
    const usersLogin = [];

    await fetch(url + 'user')
    .then((res) => {
        return res.json();
    })
    .then((result) => {
        result.forEach(users => {
            usersLogin.push(users.login)
    });
        const regExpLogin = new RegExp(/[^A-Za-z0-9]+/);
    if (regExpLogin.test(registerLogin.value) && registerLogin.value !== '') {
        registerLogin.nextElementSibling.innerText = 'Field can only consist of letters and numbers';
        return false;
    } else if (registerLogin.value === '') {
        registerLogin.nextElementSibling.innerText = 'This field is required';
        return false;
    } else if (usersLogin.find(login => login === registerLogin.value)) {
        registerLogin.nextElementSibling.innerText = 'User already exists';
        return false;
    } else { 
        registerLogin.nextElementSibling.innerText = '';
        return true;
    }
    })

}

function registerPasswordCheck() { 
    const errorText = registerPassword.nextElementSibling;
    if (registerPassword.value === '') {
        errorText.innerText = 'This field is required';
        return false;
    } else if (registerPassword.value !== reapetPassword.value) {
        errorText.innerText = 'Passwords do not match';
        return false;
    } else if (registerPassword.value.length < 8) {
        errorText.innerText = 'Password is too short';
        return false;
    } else if (registerPassword.value.length > 18) {
        errorText.innerText = 'Password is too long';
        return false;
    } else {
        errorText.innerText = '';
        return true;
    }
}




const loginNickname = document.querySelector('#login');
const loginPassword = document.querySelector('#password');
const loginBtn = document.querySelector('#show-modal__login-btn');


// const userLogOut= document.querySelector('#user__logOut');
const usersLogin = [];

loginBtn.addEventListener('click', (event) => {
    event.preventDefault()

    if(loginNicknameCheck()) {
        if(loginPasswordCheck()) {
            const modalLoginAccount = $modal();
            modalLoginAccount.setContent(`Welcome  ${loginNickname.value}`);
            modalLoginAccount.setTitle('');
            modalLoginAccount.show();
            localStorage.setItem('UserID',  usersLogin.indexOf(loginNickname.value))
            checkUsersStatus()
            loginNickname.value = '';
            loginPassword.value = '';
            location.hash = '#home';
            getUserAvatar()
        }
    }
})

// userLogOut.addEventListener('click', logOutHidImg)

// function logOutHidImg() {
//     localStorage.removeItem('UserID')
//     userLogOut.classList.add('hide')
//     userIcon.classList.remove('hide')
// }


loginNickname.addEventListener('blur', loginNicknameCheck)
loginPassword.addEventListener('blur', loginPasswordCheck)



async function loginNicknameCheck() { 
    await fetch(url + 'user')
    .then((res) => {
        return res.json();
    })
    .then((result) => {
        result.forEach(users => {
            usersLogin[users.id] = users.login;
    });
    const errorText = loginNickname.nextElementSibling;
    if (loginNickname.value === '') {
        errorText.innerText = 'This field is required';
        return false;
    } else if (!usersLogin.find(el => el === loginNickname.value)) {
        errorText.innerText = 'There is no such user';
        return false;
    } else {
        errorText.innerText = '';
        return true;
    }
})
}




async function loginPasswordCheck() { 
    let passwordMatch;
    const errorText = loginPassword.nextElementSibling;
    if (loginPassword.value === '') {
        errorText.innerText = 'This field is required';
        return false;
    } else {
        errorText.innerText = '';
         await fetch(url + 'user/' + usersLogin.indexOf(loginNickname.value))
        .then((res) => {
            return res.json();
        })
        .then((result) => {
            passwordMatch = loginPassword.value === result.password;
        })     
            
    }
    return passwordMatch;
}




