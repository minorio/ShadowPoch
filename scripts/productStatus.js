
const productCountMinusBtn = document.querySelector('.product-info__count-minus__btn');
const productCountPlusBtn = document.querySelector('.product-info__count-plus__btn');
const productCountValue = document.querySelector('.product-info__count-input');

const addToCartBtn = document.querySelector('.product-actions__addtocart-btn');

const addToLikedSvg = document.querySelector('.product-actions__addtoliked-svg__path');
// const addToLikedSvgActive = document.querySelector('.product-actions__addtoliked-svg__path--active');

const addToLikedBtn = document.querySelector('#show-modal__liked-btn');
addToLikedBtn.addEventListener('click', inLikedOperation)

const addToCartModal = document.querySelector('#show-modal__size')

addToCartModal.addEventListener('click', (event) => {
    if(localStorage.getItem('UserID')){
        const chosenSize = document.querySelector('.product-info__sizes-size__active');
        if(chosenSize) {
            fetch(url + 'product-status', {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({
                accountId: Number(localStorage.getItem("UserID")),
                productId: Number(localStorage.getItem("lastClickedProduct")),
                size: chosenSize.innerText,
                status: 'inBasket',
                count: Number(productCountValue.value)
                })
            });
            const modalSize = $modal();
            modalSize.setContent('');
            modalSize.setTitle('Product added to cart');
            modalSize.show();
        } else {
            // alert("You didn't choose a size")
            const modalSize = $modal();
            modalSize.setContent("You didn't choose a size");
            modalSize.setTitle('');
            modalSize.show();
        }    
    } else{
        const modalSize = $modal();
        modalSize.setContent("You are not logged in");
        modalSize.setTitle('');
        modalSize.show();
        location.hash = 'login';
    }

})


async function inLikedOperation() {
    if(localStorage.getItem('UserID')){ 
    // addToLikedSvg.classList.remove('product-actions__addtoliked-svg__path--active')
        if(!addToLikedSvg.classList.contains('product-actions__addtoliked-svg__path--active')) {
            addToLikedSvg.classList.add('product-actions__addtoliked-svg__path--active')
            await fetch(url + 'product-status', {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({
                accountId: Number(localStorage.getItem("UserID")),
                productId: Number(localStorage.getItem("lastClickedProduct")),
                status: 'inLiked',
                count: Number(productCountValue.value)
                })
            });
        }else{ 
            addToLikedSvg.classList.remove('product-actions__addtoliked-svg__path--active')
            await fetch(url + 'product-status' + `/${localStorage.getItem('productOperationID')}`, {
                method: "DELETE"
            }).then(() => {
                const modalLike = $modal();
                modalLike.setContent("Product removed from Favorites");
                modalLike.setTitle('');
                modalLike.show();
            })
        }
    } else {
        const modalLike = $modal();
        modalLike.setContent("You are not logged in");
        modalLike.setTitle('');
        modalLike.show();
        location.hash = 'login';
    }
}
// fetch(url + 'product-status' + "/16", {
//     method: "DELETE"
//   });

async function findProductinLikedOperation() {
    addToLikedSvg.classList.remove('product-actions__addtoliked-svg__path--active')
     await fetch(url + 'product-status')
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            res.forEach(status => {
                if(status.accountId === Number(localStorage.getItem("UserID"))) {
                    if(status.productId === Number(localStorage.getItem("lastClickedProduct"))) {
                        addToLikedSvg.classList.add('product-actions__addtoliked-svg__path--active');
                        localStorage.setItem('productOperationID', status.id)
                    } 
                }                    
            }) 
                addToLikedBtn.removeEventListener('click', inLikedOperation)
                addToLikedBtn.addEventListener('click', inLikedOperation)


        })
}


productCountMinusBtn.addEventListener('click', (event) => {
    if(Number(productCountValue.value) !== 1){
        productCountValue.value = Number(productCountValue.value) - 1;
    }
 
})
productCountPlusBtn.addEventListener('click', (event) => {
    if(Number(productCountValue.value) !== 10){ 
        productCountValue.value = Number(productCountValue.value) + 1;  
    } 
})


async function sizesChooser () {
    productPagesizes.forEach(el => {
        el.removeEventListener('click', allowedSizes)
        el.classList.remove('product-info__sizes-size__active')

    })
    await fetch(url + 'product/' + localStorage.getItem('lastClickedProduct'))
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            productPagesizes.forEach(sizeBtn => {
                if(res.sizes.includes(sizeBtn.innerText)) {
                    sizeBtn.addEventListener('click', allowedSizes)
                }
            })
        })

}
function allowedSizes (e) {
    productPagesizes.forEach(el => {
        el.classList.remove('product-info__sizes-size__active')
    })
    e.target.classList.add('product-info__sizes-size__active')
}
