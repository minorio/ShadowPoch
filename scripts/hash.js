
const homePage = document.querySelector('.home-page');
const categoriesPage = document.querySelector('.categories-page');
const productPage = document.querySelector('.product-page');
const basketPage = document.querySelector('.basket-page');
const profilePage = document.querySelector('.profile-page');
const loginPage = document.querySelector('.login-page');
const registerPage = document.querySelector('.register-page');

const body = document.querySelector('body');
const footer = document.querySelector('.footer');


const menuItem = document.querySelectorAll('.menu__list-link')
 
const productStatusPage = document.querySelector('.productStatuses-page')
const productUploadPage = document.querySelector('.productUpload')

const hideAll = () => {
    homePage.hidden = true;
    categoriesPage.hidden = true;
    productPage.hidden = true;
    basketPage.hidden = true;
    profilePage.hidden = true;
    loginPage.hidden = true;
    registerPage.hidden = true;
    footer.hidden = true;
    productStatusPage.hidden = true;
    productUploadPage.hidden = true;
    body.classList.remove('background__authorization')
    body.classList.remove('background__light')
    body.classList.remove('background__blue')
    body.classList.remove('background__dark')
    body.classList.remove('background__greydark')
    body.classList.remove('background__white')
}


const onLocationChange = () => {
    hideAll()
    getUserAvatar()
    avatarOnLoad()

    switch (location.hash) {
            case '#home':
                homePage.hidden = false;
                footer.hidden = false;
                body.classList.add('background__white')
                break;
            case '#categories':
                categoriesPage.hidden = false;
                footer.hidden = false;
                body.classList.add('background__blue')
                break;
            case '#product':
                getProduct()
                sizesChooser()
                findProductinLikedOperation()
            
                if(document.querySelector('product-actions__addtoliked-svg__path--active')) {
                    document.querySelector('product-actions__addtoliked-svg__path--active').classList.remove('product-actions__addtoliked-svg__path--active')
                }
               
                productPage.hidden = false;
                footer.hidden = false;
                body.classList.add('background__blue');
                break;
            case '#profile':
                if (localStorage.getItem('UserID')) {
                    profilePage.hidden = false;
                    footer.hidden = false;
                    productStatusPage.hidden = false;
                    body.classList.add('background__blue')
                    getProductInLiked()
                    getProductInPurchased()
                    if(localStorage.getItem('isAdmin')){
                        productStatusPage.hidden = true;
                        productUploadPage.hidden = false;
                    }
                } else { 
                    const modalLoginAccount = $modal();
                    modalLoginAccount.setContent("You are not logged in");
                    modalLoginAccount.setTitle('');
                    modalLoginAccount.show();
                    location.hash = '#login';
                }
                break;
            case '#basket':
                if (!localStorage.getItem('UserID')) {          
                    const modalLoginAccount = $modal();
                    modalLoginAccount.setContent("You are not logged in");
                    modalLoginAccount.setTitle('');
                    modalLoginAccount.show();
                    location.hash = '#login';
                    
                } else {
                    getProductInBasket()
                    basketPage.hidden = false;
                    body.classList.add('background__blue')
                }
                break;
            case '#login':
                if (localStorage.getItem('UserID')) {
                    const modalLoginAccount = $modal();
                    modalLoginAccount.setContent("'You are already authorized'");
                    modalLoginAccount.setTitle('');
                    modalLoginAccount.show();
                    location.hash = '#profile';
                } else {
                    loginPage.hidden = false;
                    body.classList.add('background__authorization')
                }
                break;
            case '#register':
                if (localStorage.getItem('UserID')) {
                    const modalLoginAccount = $modal();
                    modalLoginAccount.setContent("'You are already authorized'");
                    modalLoginAccount.setTitle('');
                    modalLoginAccount.show();
                    location.hash = '#profile';
                } else {
                    registerPage.hidden = false;
                    body.classList.add('background__authorization')
                }
                break;
            case '':
            location.hash = '#home';
                break;
            default:
            location.hash = '#home';
                break;
    }
}

onLocationChange()

window.addEventListener('hashchange', onLocationChange)


