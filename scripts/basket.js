const bodyBasket = document.querySelector('.cart-body'); 
const tableBasket = document.querySelector('.cart__table'); 
const summaryBasket = document.querySelector('.summary-cart'); 
const noProductInBasket = document.querySelector('.noproduct__inBasket');
let totalPriceBasket = document.querySelector('.summary__table-amount');
const buyBtn = document.querySelector('#show-modal__buy');

async function getProductInBasket() {
    try {
        createLoader()
        bodyBasket.innerHTML = '';
        await fetch(url + 'product-status')
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                res = res.filter(el => el.status === 'inBasket')
                res = res.filter(el => el.accountId === Number(localStorage.getItem("UserID")))
                if(res.length === 0){
                    tableBasket.classList.add('hide-content');
                    summaryBasket.classList.add('hide-content');
                    noProductInBasket.classList.remove('hide-content');
                }else{
                    noProductInBasket.classList.add('hide-content');
                    tableBasket.classList.remove('hide-content');
                    summaryBasket.classList.remove('hide-content');
                    res.forEach(element => {
                            const trBasket = document.createElement('tr');
                            const tdImg = document.createElement('td');
                            const tdImgLink = document.createElement('a');
                            const tdImgLinkDiv = document.createElement('div');
                            const tdImgLinkDivPhoto = document.createElement('img');
    
                            trBasket.classList.add('cart-body__info');
                            trBasket.dataset.id = element.id;
                            tdImg.classList.add('cart-body__item');
                            tdImgLink.classList.add('cart__product-photo__link');
                            tdImgLinkDiv.classList.add('cart__product-photo__container');
                            tdImgLinkDivPhoto.classList.add('cart__product-photo__container__img');
    
                            tdImgLink.href = 'product';
                            tdImgLinkDivPhoto.src = element.product.cardImage;
    
                            tdImgLinkDiv.append(tdImgLinkDivPhoto)
                            tdImgLink.append(tdImgLinkDiv)
                            tdImg.append(tdImgLink)
    
                            const tdSize = document.createElement('td');
                            const tdSizeSpan = document.createElement('span');
    
                            tdSize.classList.add('cart-body__size');
                            tdSizeSpan.classList.add('cart-body__size-text');
    
                            tdSizeSpan.innerText = element.size;
    
                            tdSize.append(tdSizeSpan)
    
                            const tdPrice = document.createElement('td');
                            const tdPriceSpan = document.createElement('span');
                            
                            tdPrice.classList.add('cart-body__price');
                            tdPriceSpan.classList.add('cart-price');
    
                            tdPriceSpan.innerText = `${element.product.price} $`;
    
                            tdPrice.append(tdPriceSpan)
    
                            const tdCount = document.createElement('td');
                            const tdCountDiv = document.createElement('div');
    
                            tdCount.classList.add('cart-body__count');
                            tdCountDiv.classList.add('cart-product__counter');
    
    
                            tdCountDiv.innerHTML = 
                                `<button class="cart-product__count-minus__btn" type="button" data-id="${element.id}">
                                <div class="icon cart-product__count-minus">
                                    <svg width="15" height="15" viewBox="0 0 32 32" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M28 16C28 16.2652 27.8946 16.5196 27.7071 16.7071C27.5196 16.8946 27.2652 17 27 17H5C4.73478 17 4.48043 16.8946 4.29289 16.7071C4.10536 16.5196 4 16.2652 4 16C4 15.7348 4.10536 15.4804 4.29289 15.2929C4.48043 15.1054 4.73478 15 5 15H27C27.2652 15 27.5196 15.1054 27.7071 15.2929C27.8946 15.4804 28 15.7348 28 16Z"
                                            fill="black" />
                                    </svg>
                                </div>
                            </button>
                            <input class="cart-product__count-input" value="${element.count}" readonly>
                            <button class="cart-product__count-plus__btn" type="button" data-id="${element.id}">
                                <div class="icon cart-product__count-plus">
                                    <svg width="15" height="15" viewBox="0 0 32 32" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M28 16C28 16.2652 27.8946 16.5196 27.7071 16.7071C27.5196 16.8946 27.2652 17 27 17H17V27C17 27.2652 16.8946 27.5196 16.7071 27.7071C16.5196 27.8946 16.2652 28 16 28C15.7348 28 15.4804 27.8946 15.2929 27.7071C15.1054 27.5196 15 27.2652 15 27V17H5C4.73478 17 4.48043 16.8946 4.29289 16.7071C4.10536 16.5196 4 16.2652 4 16C4 15.7348 4.10536 15.4804 4.29289 15.2929C4.48043 15.1054 4.73478 15 5 15H15V5C15 4.73478 15.1054 4.48043 15.2929 4.29289C15.4804 4.10536 15.7348 4 16 4C16.2652 4 16.5196 4.10536 16.7071 4.29289C16.8946 4.48043 17 4.73478 17 5V15H27C27.2652 15 27.5196 15.1054 27.7071 15.2929C27.8946 15.4804 28 15.7348 28 16Z"
                                            fill="black" />
                                    </svg>
                                </div>
                            </button>`
                          
                            tdCount.append(tdCountDiv)
    
                            trBasket.append(tdImg, tdSize, tdPrice, tdCount)
    
                            const trActions = document.createElement('tr');
                            const tdActions = document.createElement('td');
    
                            trActions.classList.add('cart-body__actions');
                            tdActions.classList.add('cart-body__actions-item');
           
                            tdActions.innerHTML =
                            `<div class="cart-body__actions-toolbar"> 
                                <a class="cart-body__actions-toolbar__delete" data-id="${element.id}">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M27 6H22V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2H13C12.2044 2 11.4413 2.31607 10.8787 2.87868C10.3161 3.44129 10 4.20435 10 5V6H5C4.73478 6 4.48043 6.10536 4.29289 6.29289C4.10536 6.48043 4 6.73478 4 7C4 7.26522 4.10536 7.51957 4.29289 7.70711C4.48043 7.89464 4.73478 8 5 8H6V26C6 26.5304 6.21071 27.0391 6.58579 27.4142C6.96086 27.7893 7.46957 28 8 28H24C24.5304 28 25.0391 27.7893 25.4142 27.4142C25.7893 27.0391 26 26.5304 26 26V8H27C27.2652 8 27.5196 7.89464 27.7071 7.70711C27.8946 7.51957 28 7.26522 28 7C28 6.73478 27.8946 6.48043 27.7071 6.29289C27.5196 6.10536 27.2652 6 27 6ZM12 5C12 4.73478 12.1054 4.48043 12.2929 4.29289C12.4804 4.10536 12.7348 4 13 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V6H12V5ZM24 26H8V8H24V26ZM14 13V21C14 21.2652 13.8946 21.5196 13.7071 21.7071C13.5196 21.8946 13.2652 22 13 22C12.7348 22 12.4804 21.8946 12.2929 21.7071C12.1054 21.5196 12 21.2652 12 21V13C12 12.7348 12.1054 12.4804 12.2929 12.2929C12.4804 12.1054 12.7348 12 13 12C13.2652 12 13.5196 12.1054 13.7071 12.2929C13.8946 12.4804 14 12.7348 14 13ZM20 13V21C20 21.2652 19.8946 21.5196 19.7071 21.7071C19.5196 21.8946 19.2652 22 19 22C18.7348 22 18.4804 21.8946 18.2929 21.7071C18.1054 21.5196 18 21.2652 18 21V13C18 12.7348 18.1054 12.4804 18.2929 12.2929C18.4804 12.1054 18.7348 12 19 12C19.2652 12 19.5196 12.1054 19.7071 12.2929C19.8946 12.4804 20 12.7348 20 13Z" fill="black"/>
                                    </svg>                                                       
                                </a>
                            </div>`
                            trActions.append(tdActions)
                            bodyBasket.append(trBasket,trActions)
    
                            totalBasketPrice()                       
                         
                });
    
    
                buyBtn.addEventListener('click', (event) => {
                   const allTr =  document.querySelectorAll('.cart-body__info');
                        allTr.forEach(tr => {
                         fetch(url + 'product-status' + `/${tr.dataset.id}`, {
                            method: "PUT",
                            headers: {
                            "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                            status: "inPurchased"
                            })
                        }).then(() => {
                            const modalBuy = $modal();
                            modalBuy.setContent("order is complete");
                            modalBuy.setTitle('');
                            modalBuy.show();
                            getProductInBasket()    
                        })
                   })
                    })
                }
    
    
    
                const basketCountMinusBtn = document.querySelectorAll('.cart-product__count-minus__btn');
                const basketCountPlusBtn = document.querySelectorAll('.cart-product__count-plus__btn');
                const basketCountValue = document.querySelectorAll('.cart-product__count-input');
    
    
                basketCountMinusBtn.forEach((btn,index) => {
                    btn.addEventListener('click', (event) => {
                    if(Number(basketCountValue[index].value) !== 1){
                        basketCountValue[index].value = Number(basketCountValue[index].value) - 1;
                        productReshuffle (btn, index) 
                    }
                    })    
                })
    
                basketCountPlusBtn.forEach((btn,index) => {
                    btn.addEventListener('click', (event) => {
                        if(Number(basketCountValue[index].value) !== 10){ 
                            basketCountValue[index].value = Number(basketCountValue[index].value) + 1;  
                            productReshuffle(btn, index) 
                        } 
                    })    
                })
                function productReshuffle (button, index) {
                    totalBasketPrice()
    
                    fetch(url + 'product-status' + `/${button.dataset.id}`, {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            count: Number(basketCountValue[index].value),
                        })
                    });
                 }
    
    
                const deleteBtns = document.querySelectorAll('.cart-body__actions-toolbar__delete');
    
                deleteBtns.forEach((deleteBtn) => {
                    deleteBtn.addEventListener('click', async (event) => {
                        await fetch(url + 'product-status' + `/${deleteBtn.dataset.id}`, {
                            method: "DELETE"
                        })
                        getProductInBasket()
                    })
                })
    
            })
    }
    catch{}
    finally{
        loaderWait()
    }
}

function totalBasketPrice () {
    totalPriceBasket.innerText = '';
    const myCountValue = document.querySelectorAll('.cart-product__count-input');
    const prices = document.querySelectorAll('.cart-price');

    totalPriceBasket.innerText = totalPriceBasket.innerText.slice(0, -1);

    prices.forEach((price, index) => {
        totalPriceBasket.innerText = Number(totalPriceBasket.innerText) + Number(price.innerText.slice(0,-1)) * Number(myCountValue[index].value); 
    })
    totalPriceBasket.innerText += '$'
}
