const headerMenuLinks = document.querySelectorAll('.menu__list-link');
const footerMenuLinks = document.querySelectorAll('.footer__menu-list-link');
const collectionItemLinks = document.querySelectorAll('.collection__item');

const categoriesSelect = document.querySelector('.product-top__select');
const categoriesTitle = document.querySelector('.product-top__title');

categoriesTitle.innerText = 'All';

headerMenuLinks.forEach((headerLink, index) => {
    if(index !== headerMenuLinks.length - 1){
        headerLink.addEventListener('click', (event) => {
            filterCategories(headerLink.dataset.value)
            categoriesSelect.value = headerLink.dataset.value;
            categoriesTitle.innerText = `${headerLink.dataset.value}s`;
        })
    }else{
        headerLink.addEventListener('click', (event) => {
            categoriesSelect.value = 'All';
            categoriesTitle.innerText = 'All';
            getProducts()  
        })
    }
})

footerMenuLinks.forEach((footerLink, index) => {
    if(index !== footerMenuLinks.length - 1){
        footerLink.addEventListener('click', (event) => {
            filterCategories(footerLink.dataset.value)
            categoriesSelect.value = footerLink.dataset.value;
            categoriesTitle.innerText = `${footerLink.dataset.value}s`;
        })
    }else{
        footerLink.addEventListener('click', (event) => {
            categoriesSelect.value = 'All';
            categoriesTitle.innerText = 'All';
            getProducts()  
        })
    }
})

collectionItemLinks.forEach((collectionItemLink, index) => {
    if(index !== collectionItemLinks.length - 2){
        collectionItemLink.addEventListener('click', (event) => {
            filterCategories(collectionItemLink.dataset.value)
            categoriesSelect.value = collectionItemLink.dataset.value;
            categoriesTitle.innerText = `${collectionItemLink.dataset.value}s`;
        })
    }else{
        collectionItemLink.addEventListener('click', (event) => {
            categoriesSelect.value = 'All';
            categoriesTitle.innerText = 'All';
            getProducts()  
        })
    }
})

categoriesSelect.addEventListener('change', (event) => {
    if(categoriesSelect.value === 'All'){
        categoriesTitle.innerText = 'All';
        getProducts()
    } else {
        filterCategories(categoriesSelect.value)
        categoriesTitle.innerText = `${categoriesSelect.value}s`;
    }

})


function filterCategories (category) {
    try{
        createLoader()
        categoryPageBox.innerHTML = "";
        fetch(url + 'product')
        .then((res) => {
            return res.json();
        })  
        .then((products) => {
            products.forEach(product => {
                if(product.categories.includes(category)){
                    const categoryCard = document.createElement('div');
                    const categoryCardLink = document.createElement('a');
                    const categoryCardImg = document.createElement('img');
                    const categoryCardTextBox = document.createElement('div');
                    const categoryCardLinkTitle = document.createElement('a');
                    const categoryCardTitle = document.createElement('h3');
                    const categoryCardPrice = document.createElement('span');
            
                    categoryCard.classList.add('card-item');
                    categoryCardLink.classList.add('card-item__link-img');
                    categoryCardImg.classList.add('card-item__img');
                    categoryCardTextBox.classList.add('card-text__container');
                    categoryCardLinkTitle.classList.add('card-item__link-title');
                    categoryCardTitle.classList.add('card-item__title');
                    categoryCardPrice.classList.add('card-item__price');
            
                    categoryCardLink.dataset.id = product.id;
                    categoryCardLinkTitle.dataset.id = product.id;
                    categoryCardImg.src = `${product.cardImage}`;
                    categoryCardTitle.innerText = product.title;
                    categoryCardPrice.innerText = `${product.price}$`
            
                    categoryCardLink.append(categoryCardImg);
                    categoryCardLinkTitle.append(categoryCardTitle);
                    categoryCardTextBox.append(categoryCardLinkTitle);
                    categoryCardTextBox.append(categoryCardPrice);
            
                    categoryCard.append(categoryCardLink, categoryCardTextBox);
                    categoryPageBox.append(categoryCard)
            
                    if (localStorage.getItem('isAdmin')) {
                      const categoryCardDelete = document.createElement('img');
                      categoryCardDelete.classList.add('card-item__delete')
                      categoryCardDelete.src = './images/X.svg';
                      categoryCard.prepend(categoryCardDelete)
                    
                      categoryCardDelete.addEventListener('click', async (event) => { 
                       let arrOperations = [];
                       product.productStatuses.forEach(status => {
                          console.log(status)
                            arrOperations.push(status.id);
                       })
                       arrOperations.forEach(async operationId => {
                         await fetch(url + 'product-status' + `/${operationId}`, {
                          method: "DELETE",
                        })
                       })
                         await fetch(url + 'product' + `/${product.id}`, {
                          method: "DELETE",
                        })
                        categoryCard.remove()
                      })
                    }
            
                    const redirectToProduct = [categoryCardLink, categoryCardLinkTitle];
                    redirectToProduct.forEach(link => {
                      link.addEventListener('click', (event) => {
                        location.hash = 'product';
                        localStorage.setItem('lastClickedProduct', event.target.parentElement.dataset.id)
                        getProduct()
                      })
                    })
                }
            });
           
        })
    }
    catch{

    }
    finally{
        loaderWait()
    }
    // categoryPageBox.innerHTML = "";
    // fetch(url + 'product')
    // .then((res) => {
    //     return res.json();
    // })  
    // .then((products) => {
    //     products.forEach(product => {
    //         if(product.categories.includes(category)){
    //             const categoryCard = document.createElement('div');
    //             const categoryCardLink = document.createElement('a');
    //             const categoryCardImg = document.createElement('img');
    //             const categoryCardTextBox = document.createElement('div');
    //             const categoryCardLinkTitle = document.createElement('a');
    //             const categoryCardTitle = document.createElement('h3');
    //             const categoryCardPrice = document.createElement('span');
        
    //             categoryCard.classList.add('card-item');
    //             categoryCardLink.classList.add('card-item__link-img');
    //             categoryCardImg.classList.add('card-item__img');
    //             categoryCardTextBox.classList.add('card-text__container');
    //             categoryCardLinkTitle.classList.add('card-item__link-title');
    //             categoryCardTitle.classList.add('card-item__title');
    //             categoryCardPrice.classList.add('card-item__price');
        
    //             categoryCardLink.dataset.id = product.id;
    //             categoryCardLinkTitle.dataset.id = product.id;
    //             categoryCardImg.src = `${product.cardImage}`;
    //             categoryCardTitle.innerText = product.title;
    //             categoryCardPrice.innerText = `${product.price}$`
        
    //             categoryCardLink.append(categoryCardImg);
    //             categoryCardLinkTitle.append(categoryCardTitle);
    //             categoryCardTextBox.append(categoryCardLinkTitle);
    //             categoryCardTextBox.append(categoryCardPrice);
        
    //             categoryCard.append(categoryCardLink, categoryCardTextBox);
    //             categoryPageBox.append(categoryCard)
        
    //             if (localStorage.getItem('isAdmin')) {
    //               const categoryCardDelete = document.createElement('img');
    //               categoryCardDelete.classList.add('card-item__delete')
    //               categoryCardDelete.src = './images/X.svg';
    //               categoryCard.prepend(categoryCardDelete)
                
    //               categoryCardDelete.addEventListener('click', async (event) => { 
    //                let arrOperations = [];
    //                product.productStatuses.forEach(status => {
    //                   console.log(status)
    //                     arrOperations.push(status.id);
    //                })
    //                arrOperations.forEach(async operationId => {
    //                  await fetch(url + 'product-status' + `/${operationId}`, {
    //                   method: "DELETE",
    //                 })
    //                })
    //                  await fetch(url + 'product' + `/${product.id}`, {
    //                   method: "DELETE",
    //                 })
    //                 categoryCard.remove()
    //               })
    //             }
        
    //             const redirectToProduct = [categoryCardLink, categoryCardLinkTitle];
    //             redirectToProduct.forEach(link => {
    //               link.addEventListener('click', (event) => {
    //                 location.hash = 'product';
    //                 localStorage.setItem('lastClickedProduct', event.target.parentElement.dataset.id)
    //                 getProduct()
    //               })
    //             })
    //         }
    //     });
       
    // })
}