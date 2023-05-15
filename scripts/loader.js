window.addEventListener('load', loaderWait)

function loaderWait () {
    setTimeout(() => {
        if(document.querySelector('.loader__mask')){
            document.querySelector('.loader__mask').remove()
        }
    }, 800)
}

function createLoader () {
    const loaderMask = document.createElement('div')
    loaderMask.classList.add('loader__mask')
    loaderMask.innerHTML = '<div class="loader-wrapper"><div class="loader"><div class="loader loader__inner"></div></div></div>';
    document.body.prepend(loaderMask)
}   

