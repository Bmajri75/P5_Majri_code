const localStorageReturn = JSON.parse(localStorage.getItem('commande'));
var total = "";
let totalPrice = "";

const calculeQuantity = () => {
  let quantityTotal = [];
  // calcule du prix total  
  if (localStorageReturn) {
    localStorageReturn.forEach(kanap => {
      quantityTotal.push(kanap.quantity);
    });
  }
  // permet de calculer la totaliter des somme dans le tableau quantity 
  total = quantityTotal.reduce((acc, i) => acc + i);
}



for (let i = 0; i < localStorageReturn.length; i++) {

  fetch(`http://localhost:3000/api/products/${localStorageReturn[i].id}`)
    .then(res => {
      if (res.ok) {
        return res.json() // si tout est ok j'ai un retour dans res que je convertie en format json ()
      }
    })// ce dernier me renvoie encore une promise j'utilise encore then pour les recuperer
    .then(data => {
      //     EN amont cree un array dans product avec ce qu'il retourne du localstorage 
      // il faut recupere les doneee du localStorage
      // remplacer le prix et les id les couleurs par ce qu'il y'a dans le panier
      document.querySelector('#cart__items').insertAdjacentHTML('afterbegin', ` <article article class="cart__item" data - id="${localStorageReturn[i].id}" data - color="${localStorageReturn[i].color}" >
      <div class="cart__item__img">
      <img src="${localStorageReturn[i].image}" alt="Photographie d'un canapé">
      </div>
      <div class="cart__item__content">
      <div class="cart__item__content__description">
      <h2>${localStorageReturn[i].name}</h2 >
      <p>${localStorageReturn[i].color}</p>
      <p>${data.price} </p>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${localStorageReturn[i].quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
    </article > `)
      calculeQuantity();





      document.querySelector('#totalQuantity').innerHTML = `${total}`
      document.querySelector('#totalPrice').innerHTML = `${data.price * localStorageReturn[i].quantity}`

      // calcule du prix total 

      document.querySelector('.deleteItem').addEventListener('click', (e) => {
        localStorage.clear(),
          location.reload()
      })
    })
    // recupere les erreurs 
    .catch(err => {
      console.log(`vous avez une Erreur!! ${err} `)
    })

}




// fonction pour le calcule des quantity 


// const getPriceApi = (api) => {
//   
//   api.forEach(kanap => {
//     // je recupere les id du localstorage 
//     apiPrice.push(kanap.price);
//     console.log(apiPrice);
//   })
// }

// const getId = () => {
//   let idArray = [];
//   localStorageReturn.forEach(kanap => {
//     // je recupere les id du localstorage 
//     idArray.push(kanap.id);
//     console.log(idArray);

//   })
// }