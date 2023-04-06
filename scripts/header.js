
const menuBtn = document.querySelector('.menu__btn')
const menuList = document.querySelector('.menu__list')
const headerTools = document.querySelector('.header__tools')

menuBtn.addEventListener('click', (event) => {
    menuList.classList.toggle('menu__list--active')
    headerTools.classList.toggle('menu__list--active')
})

