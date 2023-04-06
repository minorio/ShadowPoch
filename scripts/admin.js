const productUpload = document.querySelector('.productUpload');




function checkUsersStatus() {
    // productUpload.classList.add('hide');
    fetch(url + 'user' + `/${localStorage.getItem('UserID')}`)
        .then((res) => {
            return res.json();
        }).then((user) => {
            if(user.admin) {
                console.log('is admin')
                localStorage.setItem('isAdmin', true)
            } else {
                console.log('is not admin')
            }
        
        })
}

// checkUsersStatus() 

