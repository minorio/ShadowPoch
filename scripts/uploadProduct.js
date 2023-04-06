

const productName = document.querySelector('#product_name');
const productCategoryes = document.querySelector('#product_categoryes');
const productImg = document.querySelector('.productUpload-form__item-box-file');
const productDescription = document.querySelector('#product_textarea');
const productPrice = document.querySelector('#product_price');
const createProduct = document.querySelector('#show-modal__create-product');
const sizesInput = document.querySelectorAll('.size');

const url = 'https://it-academy-js-api-zmicerboksha.vercel.app/api/6/mb/';


// const fetchWithLog = (...args) =>
//   fetch(...args).then((res) => res.json());

createProduct.addEventListener('click', async (event) => {
  event.preventDefault()
  const sizes = [];
  sizesInput.forEach(size => {
    if (size.checked) {
      sizes.push(size.value);
      size.checked = '';
    }
  })
  await fetch(url + 'product', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: productName.value,
      price: Number(productPrice.value),
      sizes: sizes,
      cardImage: `./images/clothing/${productImg.files[0].name}`,
      description: productDescription.value,
      categories: [productCategoryes.value],
    })
  }).then(() => {
    // productName.value = '';
    // productPrice.value = '';
    // productDescription.value = '';
    // productCategoryes.value = ''
    const modalCreateProduct = $modal();
    modalCreateProduct.setContent("A new product was created");
    modalCreateProduct.setTitle('');
    modalCreateProduct.show();
  })

  clearFormCreateProduct()

})

function clearFormCreateProduct () {
  productName.value = '';
  productPrice.value = '';
  productDescription.value = '';
  productCategoryes.value = ''
}
const categoryPageBox = document.querySelector('.product__box-card')

const productPageImg = document.querySelector('.product-img img');
const productPageTitle = document.querySelector('.product-info__title');
const productPagePrice = document.querySelector('.product-info__price span');
const productPageDescription = document.querySelector('.product-description__box-text');
const productPagesizes = document.querySelectorAll('.product-info__sizes-size');


function getProducts() {
  try {
    createLoader()
    categoryPageBox.innerHTML = "";
    fetch(url + 'product')
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        result.forEach(element => {
          const categoryCard = document.createElement('div');
          // const categoryCardDelete= document.createElement('img');
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
          // categoryCardDelete.classList.add('card-item__delete')
  
          categoryCardLink.dataset.id = element.id;
          categoryCardLinkTitle.dataset.id = element.id;
          categoryCardImg.src = `${element.cardImage}`;
          categoryCardTitle.innerText = element.title;
          categoryCardPrice.innerText = `${element.price}$`
          // categoryCardDelete.src = './images/X.svg';
  
          categoryCardLink.append(categoryCardImg);
          categoryCardLinkTitle.append(categoryCardTitle);
          categoryCardTextBox.append(categoryCardLinkTitle);
          categoryCardTextBox.append(categoryCardPrice);
  
          // console.log(element.productStatuses.id)
          categoryCard.append(categoryCardLink, categoryCardTextBox);
          categoryPageBox.append(categoryCard)
  
  
          // if(localStorage.getItem('isAdmin')) {
          //   const categoryCardDelete= document.createElement('img');
          //   categoryCardDelete.classList.add('card-item__delete')
          //   categoryCardDelete.src = './images/X.svg';
          //   categoryCard.prepend(categoryCardDelete)
          //   categoryCardDelete.addEventListener('click', async  (event) => {
          //       fetch(url + 'product' + `/${element.id}`, {
          //         method: "DELETE"})
          //         // getProducts()
  
          //   })
          // }
          if (localStorage.getItem('isAdmin')) {
            const categoryCardDelete = document.createElement('img');
            categoryCardDelete.classList.add('card-item__delete')
            categoryCardDelete.src = './images/X.svg';
            categoryCard.prepend(categoryCardDelete)
          
            categoryCardDelete.addEventListener('click', async (event) => { 
             let arrOperations = [];
             element.productStatuses.forEach(status => {
                console.log(status)
                  arrOperations.push(status.id);
             })
             arrOperations.forEach(async operationId => {
               await fetch(url + 'product-status' + `/${operationId}`, {
                method: "DELETE",
              })
             })
               await fetch(url + 'product' + `/${element.id}`, {
                method: "DELETE",
              })
              categoryCard.remove()
              // .then((res) => {
              //   return res.json();
              // }).then(() => {
              //   fetch(url + 'product' + `/${element.id}`, {
              //     method: "DELETE"
              //   })
              //   // getProducts()
              // })
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
  
        })
      });
  }
  catch {
  }
  finally {
    loaderWait()
  }
  // categoryPageBox.innerHTML = "";
  // fetch(url + 'product')
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((result) => {
  //     result.forEach(element => {
  //       const categoryCard = document.createElement('div');
  //       // const categoryCardDelete= document.createElement('img');
  //       const categoryCardLink = document.createElement('a');
  //       const categoryCardImg = document.createElement('img');
  //       const categoryCardTextBox = document.createElement('div');
  //       const categoryCardLinkTitle = document.createElement('a');
  //       const categoryCardTitle = document.createElement('h3');
  //       const categoryCardPrice = document.createElement('span');

  //       categoryCard.classList.add('card-item');
  //       categoryCardLink.classList.add('card-item__link-img');
  //       categoryCardImg.classList.add('card-item__img');
  //       categoryCardTextBox.classList.add('card-text__container');
  //       categoryCardLinkTitle.classList.add('card-item__link-title');
  //       categoryCardTitle.classList.add('card-item__title');
  //       categoryCardPrice.classList.add('card-item__price');
  //       // categoryCardDelete.classList.add('card-item__delete')

  //       categoryCardLink.dataset.id = element.id;
  //       categoryCardLinkTitle.dataset.id = element.id;
  //       categoryCardImg.src = `${element.cardImage}`;
  //       categoryCardTitle.innerText = element.title;
  //       categoryCardPrice.innerText = `${element.price}$`
  //       // categoryCardDelete.src = './images/X.svg';

  //       categoryCardLink.append(categoryCardImg);
  //       categoryCardLinkTitle.append(categoryCardTitle);
  //       categoryCardTextBox.append(categoryCardLinkTitle);
  //       categoryCardTextBox.append(categoryCardPrice);

  //       // console.log(element.productStatuses.id)
  //       categoryCard.append(categoryCardLink, categoryCardTextBox);
  //       categoryPageBox.append(categoryCard)


  //       // if(localStorage.getItem('isAdmin')) {
  //       //   const categoryCardDelete= document.createElement('img');
  //       //   categoryCardDelete.classList.add('card-item__delete')
  //       //   categoryCardDelete.src = './images/X.svg';
  //       //   categoryCard.prepend(categoryCardDelete)
  //       //   categoryCardDelete.addEventListener('click', async  (event) => {
  //       //       fetch(url + 'product' + `/${element.id}`, {
  //       //         method: "DELETE"})
  //       //         // getProducts()

  //       //   })
  //       // }
  //       if (localStorage.getItem('isAdmin')) {
  //         const categoryCardDelete = document.createElement('img');
  //         categoryCardDelete.classList.add('card-item__delete')
  //         categoryCardDelete.src = './images/X.svg';
  //         categoryCard.prepend(categoryCardDelete)
        
  //         categoryCardDelete.addEventListener('click', async (event) => { 
  //          let arrOperations = [];
  //          element.productStatuses.forEach(status => {
  //             console.log(status)
  //               arrOperations.push(status.id);
  //          })
  //          arrOperations.forEach(async operationId => {
  //            await fetch(url + 'product-status' + `/${operationId}`, {
  //             method: "DELETE",
  //           })
  //          })
  //            await fetch(url + 'product' + `/${element.id}`, {
  //             method: "DELETE",
  //           })
  //           categoryCard.remove()
  //           // .then((res) => {
  //           //   return res.json();
  //           // }).then(() => {
  //           //   fetch(url + 'product' + `/${element.id}`, {
  //           //     method: "DELETE"
  //           //   })
  //           //   // getProducts()
  //           // })
  //         })
  //       }

  //       const redirectToProduct = [categoryCardLink, categoryCardLinkTitle];
  //       redirectToProduct.forEach(link => {
  //         link.addEventListener('click', (event) => {
  //           location.hash = 'product';
  //           localStorage.setItem('lastClickedProduct', event.target.parentElement.dataset.id)
  //           getProduct()
  //         })
  //       })

  //     })
  //   });
};

getProducts()




function getProduct() {
  try {
    createLoader()
    fetch(url + 'product/' + localStorage.getItem('lastClickedProduct'))
    .then((res) => {
      return res.json();
    })
    .then((product) => {
      productPageImg.src = product.cardImage;
      productPageTitle.innerText = product.title;
      productPagePrice.innerText = `${product.price}$`;
      productPageDescription.innerText = product.description;
      productPagesizes.forEach(sizeBtn => {
        sizeBtn.classList.remove('product-info__sizes-size__disabled')
        if (!product.sizes.includes(sizeBtn.innerText)) {
          sizeBtn.classList.add('product-info__sizes-size__disabled')
        }
      })

    })
  }
  catch {}
  finally {
    loaderWait()
  }
  // fetch(url + 'product/' + localStorage.getItem('lastClickedProduct'))
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((product) => {
  //     productPageImg.src = product.cardImage;
  //     productPageTitle.innerText = product.title;
  //     productPagePrice.innerText = `${product.price}$`;
  //     productPageDescription.innerText = product.description;
  //     productPagesizes.forEach(sizeBtn => {
  //       sizeBtn.classList.remove('product-info__sizes-size__disabled')
  //       if (!product.sizes.includes(sizeBtn.innerText)) {
  //         sizeBtn.classList.add('product-info__sizes-size__disabled')
  //       }
  //     })

  //   })
}

// fetch(url + 'product' + "/1", {
//   method: "DELETE"
// });










