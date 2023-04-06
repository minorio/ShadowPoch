const inLikedPane = document.querySelector('.inLiked__pane'); 
const noProductInLiked = document.querySelector('.noproduct__inLiked'); 
const tabsContent = document.querySelector('.tabs__content'); 
const likedBtn = document.querySelector('.liked__btn'); 


function noproductinLikedMessage() {

    if(document.querySelector('.noproduct__inLiked')) {
        document.querySelector('.noproduct__inLiked').remove()
    }

    const noProductInLiked = document.createElement('div');
    const noProductInLikedTitle = document.createElement('h3');

    noProductInLiked.classList.add('noproduct__inLiked');
    noProductInLikedTitle.classList.add('noproduct__inLiked-title');

    noProductInLikedTitle.innerText = 'You have no items in your liked.';

    noProductInLiked.append(noProductInLikedTitle)
    tabsContent.append(noProductInLiked)
    noProductInLiked.classList.remove('hide-content');
}

async function getProductInLiked() {
    try {
        createLoader()
        inLikedPane.innerHTML = '';
        // tabsContent.innerHTML = "";
    await fetch(url + 'product-status')
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            res = res.filter(el => el.status === 'inLiked')
            res = res.filter(el => el.accountId === Number(localStorage.getItem("UserID")))
        //     if(document.querySelector('.noproduct__inLiked')) {
        //         document.querySelector('.noproduct__inLiked').remove()
        //    }
            if(res.length === 0){  
                noproductinLikedMessage()
                likedBtn.addEventListener('click', (event) => {
                    if(document.querySelector('.noproduct__inLiked')) {
                        document.querySelector('.noproduct__inLiked').remove()
                   }
                    // noproductinLikedMessage()
                }) 
            }else{
                if(document.querySelector('.noproduct__inLiked')) {
                    document.querySelector('.noproduct__inLiked').remove()
                }
                
                res.forEach(element => {
                    // noProductInLiked.classList.add('hide-content');
                    const inLikedItem = document.createElement('div');
                    const inLikedItemDelete= document.createElement('img');
                    const inLikedItemLink = document.createElement('a');
                    const inLikedItemLinkImg = document.createElement('img');
                    const inLikedItemBox = document.createElement('div');
                    const inLikedItemBoxLink = document.createElement('a');
                    const inLikedItemBoxTitle = document.createElement('h3');
                    const inLikedItemBoxPrice = document.createElement('span');

                    inLikedItem.classList.add('productStatuses-inLiked-item');
                    inLikedItemLink.classList.add('productStatuses-inLiked-item__link-img');
                    inLikedItemLinkImg.classList.add('productStatuses-inLiked-item__img');
                    inLikedItemBox.classList.add('productStatuses-inLiked-text__container');
                    inLikedItemBoxLink.classList.add('productStatuses-inLiked-item__link-title');
                    inLikedItemBoxTitle.classList.add('productStatuses-inLiked-item__title');
                    inLikedItemBoxPrice.classList.add('productStatuses-inLiked-item__price');
                    inLikedItemDelete.classList.add('productStatuses-inLiked-item__delete')
                    inLikedItemDelete.id = 'show-modal__inLiked-delete';
                    
                    inLikedItemLinkImg.src = element.product.cardImage;
                    // inLikedItemLink.href = '#product';
                    inLikedItemDelete.src = './images/X.svg';

                    inLikedItemDelete.addEventListener('click', async  (event) => {
                        await fetch(url + 'product-status' + `/${element.id}`, {
                            method: "DELETE"})
                            addToLikedSvg.classList.remove('product-actions__addtoliked-svg__path--active')
                            const modalInLikedDelete = $modal();
                            modalInLikedDelete.setContent("Product removed from favorites");
                            modalInLikedDelete.setTitle('');
                            modalInLikedDelete.show();
                            getProductInLiked()
                    })

                    inLikedItemBoxTitle.innerText = element.product.title;
                    inLikedItemBoxPrice.innerText = `${element.product.price} $`;

                    inLikedItemLink.append(inLikedItemLinkImg)
                    inLikedItemBoxLink.append(inLikedItemBoxTitle)
                    inLikedItemBox.append(inLikedItemBoxLink,inLikedItemBoxPrice)
                    inLikedItem.append(inLikedItemDelete, inLikedItemLink, inLikedItemBox)

                    inLikedPane.append(inLikedItem)
                    
                })
            }
        })                               
    }
    catch {}
    finally {
        loaderWait()
    }
    // inLikedPane.innerHTML = '';
    // await fetch(url + 'product-status')
    //     .then((res) => {
    //         return res.json();
    //     })
    //     .then((res) => {
    //         res = res.filter(el => el.status === 'inLiked')
    //         res = res.filter(el => el.accountId === Number(localStorage.getItem("UserID")))
    //         if(res.length === 0){
    //             // tableBasket.classList.add('hide-content');
    //             // summaryBasket.classList.add('hide-content');
    //             // noProductInBasket.classList.remove('hide-content');
    //         }else{
    //             res.forEach(element => {
    //                 const inLikedItem = document.createElement('div');
    //                 const inLikedItemDelete= document.createElement('img');
    //                 const inLikedItemLink = document.createElement('a');
    //                 const inLikedItemLinkImg = document.createElement('img');
    //                 const inLikedItemBox = document.createElement('div');
    //                 const inLikedItemBoxLink = document.createElement('a');
    //                 const inLikedItemBoxTitle = document.createElement('h3');
    //                 const inLikedItemBoxPrice = document.createElement('span');

    //                 inLikedItem.classList.add('productStatuses-inLiked-item');
    //                 inLikedItemLink.classList.add('productStatuses-inLiked-item__link-img');
    //                 inLikedItemLinkImg.classList.add('productStatuses-inLiked-item__img');
    //                 inLikedItemBox.classList.add('productStatuses-inLiked-text__container');
    //                 inLikedItemBoxLink.classList.add('productStatuses-inLiked-item__link-title');
    //                 inLikedItemBoxTitle.classList.add('productStatuses-inLiked-item__title');
    //                 inLikedItemBoxPrice.classList.add('productStatuses-inLiked-item__price');
    //                 inLikedItemDelete.classList.add('productStatuses-inLiked-item__delete')
    //                 inLikedItemDelete.id = 'show-modal__inLiked-delete';
                    
    //                 inLikedItemLinkImg.src = element.product.cardImage;
    //                 inLikedItemLink.href = 'product';
    //                 inLikedItemDelete.src = './images/X.svg';
    //                 console.log(element.product.id)
    //                 inLikedItemDelete.addEventListener('click', async  (event) => {
    //                     await fetch(url + 'product-status' + `/${element.id}`, {
    //                         method: "DELETE"})
    //                         const modalInLikedDelete = $modal();
    //                         modalInLikedDelete.setContent("Product removed from favorites");
    //                         modalInLikedDelete.setTitle('');
    //                         modalInLikedDelete.show();
    //                         getProductInLiked()
    //                 })

    //                 inLikedItemBoxTitle.innerText = element.product.title;
    //                 inLikedItemBoxPrice.innerText = `${element.product.price} $`;

    //                 inLikedItemLink.append(inLikedItemLinkImg)
    //                 inLikedItemBoxLink.append(inLikedItemBoxTitle)
    //                 inLikedItemBox.append(inLikedItemBoxLink,inLikedItemBoxPrice)
    //                 inLikedItem.append(inLikedItemDelete, inLikedItemLink, inLikedItemBox)

    //                 inLikedPane.append(inLikedItem)
                    
    //             })
    //         }
    //     })                               

}

const inPurchasedPane = document.querySelector('.inPurchased__pane'); 
const purchasedBtn = document.querySelector('.purchased__btn'); 


async function getProductInPurchased() {
    try {
        purchasedBtn.addEventListener('click', (event) => {
            if(document.querySelector('.noproduct__inLiked')) {
                document.querySelector('.noproduct__inLiked').remove()
            }   
        })
      
        createLoader()
        inPurchasedPane.innerHTML = '';
        // tabsContent.innerHTML = '';
        await fetch(url + 'product-status')
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                res = res.filter(el => el.status === 'inPurchased')
                res = res.filter(el => el.accountId === Number(localStorage.getItem("UserID")))
                if(res.length === 0){
                    // tableBasket.classList.add('hide-content');
                    // summaryBasket.classList.add('hide-content');
                    // noProductInBasket.classList.remove('hide-content');
                }else{
                    res.forEach(element => {
                        const inPurchasedItem = document.createElement('div');
                        const inPurchasedCount = document.createElement('div');
                        const inPurchasedItemLink = document.createElement('a');
                        const inPurchasedItemLinkImg = document.createElement('img');
                        const inPurchasedItemBox = document.createElement('div');
                        const inPurchasedItemBoxLink = document.createElement('a');
                        const inPurchasedItemBoxTitle = document.createElement('h3');
                        const inPurchasedItemBoxPrice = document.createElement('span');
    
                        inPurchasedItem.classList.add('productStatuses-inPurchased-item');
                        inPurchasedItemLink.classList.add('productStatuses-inPurchased-item__link-img');
                        inPurchasedItemLinkImg.classList.add('productStatuses-inPurchased-item__img');
                        inPurchasedItemBox.classList.add('productStatuses-inPurchased-text__container');
                        inPurchasedItemBoxLink.classList.add('productStatuses-inPurchased-item__link-title');
                        inPurchasedItemBoxTitle.classList.add('productStatuses-inPurchased-item__title');
                        inPurchasedItemBoxPrice.classList.add('productStatuses-inPurchased-item__price');
                        inPurchasedCount.classList.add('productStatuses-inLiked-item__count');
    
                        
                        inPurchasedItemLinkImg.src = element.product.cardImage;
                        // inPurchasedItemLink.href = 'product';
                        // console.log(element.product.id)
                        inPurchasedCount.innerText = element.count;
    
                        inPurchasedItemBoxTitle.innerText = element.product.title;
                        inPurchasedItemBoxPrice.innerText = `${element.product.price} $`;
    
                        inPurchasedItemLink.append(inPurchasedItemLinkImg)
                        inPurchasedItemBoxLink.append(inPurchasedItemBoxTitle)
                        inPurchasedItemBox.append(inPurchasedItemBoxLink,inPurchasedItemBoxPrice)
                        inPurchasedItem.append(inPurchasedCount,inPurchasedItemLink, inPurchasedItemBox)
    
                        inPurchasedPane.append(inPurchasedItem)
                        
                    })
                }
            })   
    }
    catch {}
    finally {
        loaderWait()
    }
    // inPurchasedPane.innerHTML = '';
    // await fetch(url + 'product-status')
    //     .then((res) => {
    //         return res.json();
    //     })
    //     .then((res) => {
    //         res = res.filter(el => el.status === 'inPurchased')
    //         res = res.filter(el => el.accountId === Number(localStorage.getItem("UserID")))
    //         if(res.length === 0){
    //             // tableBasket.classList.add('hide-content');
    //             // summaryBasket.classList.add('hide-content');
    //             // noProductInBasket.classList.remove('hide-content');
    //         }else{
    //             res.forEach(element => {
    //                 const inPurchasedItem = document.createElement('div');
    //                 const inPurchasedCount = document.createElement('div');
    //                 const inPurchasedItemLink = document.createElement('a');
    //                 const inPurchasedItemLinkImg = document.createElement('img');
    //                 const inPurchasedItemBox = document.createElement('div');
    //                 const inPurchasedItemBoxLink = document.createElement('a');
    //                 const inPurchasedItemBoxTitle = document.createElement('h3');
    //                 const inPurchasedItemBoxPrice = document.createElement('span');

    //                 inPurchasedItem.classList.add('productStatuses-inPurchased-item');
    //                 inPurchasedItemLink.classList.add('productStatuses-inPurchased-item__link-img');
    //                 inPurchasedItemLinkImg.classList.add('productStatuses-inPurchased-item__img');
    //                 inPurchasedItemBox.classList.add('productStatuses-inPurchased-text__container');
    //                 inPurchasedItemBoxLink.classList.add('productStatuses-inPurchased-item__link-title');
    //                 inPurchasedItemBoxTitle.classList.add('productStatuses-inPurchased-item__title');
    //                 inPurchasedItemBoxPrice.classList.add('productStatuses-inPurchased-item__price');
    //                 inPurchasedCount.classList.add('productStatuses-inLiked-item__count');

                    
    //                 inPurchasedItemLinkImg.src = element.product.cardImage;
    //                 inPurchasedItemLink.href = 'product';
    //                 console.log(element.product.id)
    //                 inPurchasedCount.innerText = element.count;

    //                 inPurchasedItemBoxTitle.innerText = element.product.title;
    //                 inPurchasedItemBoxPrice.innerText = `${element.product.price} $`;

    //                 inPurchasedItemLink.append(inPurchasedItemLinkImg)
    //                 inPurchasedItemBoxLink.append(inPurchasedItemBoxTitle)
    //                 inPurchasedItemBox.append(inPurchasedItemBoxLink,inPurchasedItemBoxPrice)
    //                 inPurchasedItem.append(inPurchasedCount,inPurchasedItemLink, inPurchasedItemBox)

    //                 inPurchasedPane.append(inPurchasedItem)
                    
    //             })
    //         }
    //     })                               

}

// fetch(url + 'product-status' + "/54", {
//     method: "DELETE"
//   });