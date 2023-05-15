const profileImg = document.querySelector('.profile__avatar-box__img-img');
const profileInputImg = document.querySelector('#show-modal__img-upload'); 

profileInputImg.addEventListener('input', async (event) => {
  await fetch(url + 'user' + `/${localStorage.getItem('UserID')}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            avatarImg: `./images/avatars/${profileInputImg.files[0].name}`,
        })
    })
     const modalImgUpload = $modal();
            modalImgUpload.setContent("You have successfully changed your avatar");
            modalImgUpload.setTitle('');
            modalImgUpload.show();
            getUserAvatar()

})
   




const userIconLink = document.querySelector('#user-icon__link');
const userIcon = document.querySelector('.icon-user');
const userNickname = document.querySelector('.profile__nickname-title');


async function getUserAvatar() {
    if(localStorage.getItem('UserID')) {
       
       await fetch(url + 'user' + `/${localStorage.getItem('UserID')}`)
        .then((res) => {
            return res.json();
        })  
        .then((profile) => {
            userNickname.innerText = profile.login;
            if(profile.avatarImg){
                profileImg.src = profile.avatarImg;
                userIconLink.innerHTML = `<img class="img-user" src="${profile.avatarImg}" alt="avatar">` 
            } else{
                 profileImg.src = './images/avatars/2.jpg';
                 userIconLink.innerHTML = `<img class="img-user" src="./images/avatars/2.jpg" alt="avatar">`              
            } 
            avatarOnLoad()
        })
    } 
}


const userLogOut= document.querySelector('#user__logOut');

userLogOut.addEventListener('click', logOut)

function logOut() {
        localStorage.removeItem('UserID')
        localStorage.removeItem('isAdmin') 
        getUserAvatar()
        avatarOnLoad()
}

function avatarOnLoad(){

        if(localStorage.UserID){
            userLogOut.classList.remove('hide')
        } else {
            userLogOut.classList.add('hide')
            userIconLink.innerHTML = `<svg aria-hidden="true" focusable="false" role="presentation" class="icon-user"
            viewBox="0 0 64 64">
            <g fill="none" stroke="#ff4501" stroke-width="2">
                <path
                    d="M35 39.84v-2.53c3.3-1.91 6-6.66 6-11.41 0-7.63 0-13.82-9-13.82s-9 6.19-9 13.82c0 4.75 2.7 9.51 6 11.41v2.53c-10.18.85-18 6-18 12.16h42c0-6.19-7.82-11.31-18-12.16z">
                </path>
            </g>
        </svg>`
        }
}

avatarOnLoad()
getUserAvatar()