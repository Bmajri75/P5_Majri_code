// je recupere les donnes du LocalStorage
const localStorageReturn = JSON.parse(localStorage.getItem("commande"));

// calcule du total Quantity 
const totalQuantity = () => {
  const quantityTotalArray = [];
  // variable Initialisees 
  // je boucle sur le tableau du localStorage
  // je recupere les donnée dans commandeArray
  for (let i = 0; i < localStorageReturn.length; i++) {

    quantityTotalArray.push(localStorageReturn[i].quantity);

  }

  const totalValue = quantityTotalArray.reduce(
    (pre, cur) => pre + cur,
  );
  return totalValue
}

// initialisation de l'array 
const prixTotalArray = [];
// calcul du prix total de la commande 
const totalPrice = (data, i) => {

  prixTotalArray.push(data.price * localStorageReturn[i].quantity);
  const totalsolde = prixTotalArray.reduce(
    (pre, cur) => pre + cur,
  );
  return totalsolde
}



//cree la page DOM
const nodeCart = (data, i) => {
  const cartItemsId = document.querySelector('#cart__items'); // je prend cart__items je le place dans la variable
  // ==========
  // je cree mes element et Attributs 
  const articleElem = document.createElement('article'); //<article></article>
  const classCartItem = document.createAttribute('class');  //class="cart__item"
  const dataId = document.createAttribute('data-id'); //data-id="{product-ID}" 
  const dataColor = document.createAttribute('data-color'); //data-color="{product-color}"

  // je donne les valeurs de ms attributs
  classCartItem.value = "cart__item";
  dataId.value = `${localStorageReturn[i].id}`;
  dataColor.value = `${localStorageReturn[i].color}`;

  // je place mes attribut a mes elements
  articleElem.setAttributeNode(classCartItem);
  articleElem.setAttributeNode(dataId);
  articleElem.setAttributeNode(dataColor);

  // ===================
  // cree mes element //<div class="cart__item__img">
  const divCartItemImg = document.createElement('div');
  const classCartItemImg = document.createAttribute('class');
  classCartItemImg.value = `cart__item__img`;
  divCartItemImg.setAttributeNode(classCartItemImg);
  //================================

  // =======
  //<img src="../images/producti1.jpg" alt="">
  const img = document.createElement('img');
  const src = document.createAttribute('src');
  const alt = document.createAttribute('alt');
  src.value = `${localStorageReturn[i].image}`;
  alt.value = `${localStorageReturn[i].description}`;
  img.setAttributeNode(src);
  img.setAttributeNode(alt);

  //=====================

  // <div> class="cart__item__content">
  const divCartItemContent = document.createElement('div');
  const classCartItemContent = document.createAttribute('class');
  classCartItemContent.value = `cart__item__content`;
  divCartItemContent.setAttributeNode(classCartItemContent);

  // =================

  // <div class="cart__item__content__description">
  const divCartItemContentDesc = document.createElement('div');
  const classCartItemContentDesc = document.createAttribute('class');
  classCartItemContentDesc.value = `cart__item__content__description`;
  divCartItemContentDesc.setAttributeNode(classCartItemContentDesc);

  // ==========

  /*** <h2>Nom du produit</h2>
   <p>Vert</p>
   <p>42,ii €</p> */
  const h2Name = document.createElement('h2');
  const paragrapheColor = document.createElement('p');
  const paragraphePrice = document.createElement('p');
  h2Name.innerHTML = `${localStorageReturn[i].name}`;
  paragrapheColor.innerText = ` ${localStorageReturn[i].color}`;
  paragraphePrice.innerText = `${data.price * localStorageReturn[i].quantity} €`;

  // ============

  //<div class="cart__item__content__settings">
  const divCartItemContentSeting = document.createElement('div');
  const classCartItemContentSeting = document.createAttribute('class');
  classCartItemContentSeting.value = `cart__item__content__settings`;

  divCartItemContentSeting.setAttributeNode(classCartItemContentSeting);
  // ==========

  // <div class="cart__item__content__settings__quantity">
  const divCartItemContentSetingQuantity = document.createElement('div');
  const classCartItemContentSetingQuantity = document.createAttribute('class');
  classCartItemContentSetingQuantity.value = `cart__item__content__settings__quantity`;
  divCartItemContentSetingQuantity.setAttributeNode(classCartItemContentSetingQuantity);

  // ================
  // <p>Qté : </p>
  const paragraphQuantity = document.createElement('p'); // 
  paragraphQuantity.innerText = `Qté:`

  // ===============

  // input
  const input = document.createElement('input')
  input.setAttribute('type', 'number');
  input.setAttribute('class', 'itemQuantity')
  input.setAttribute('name', 'itemQuantity')
  input.setAttribute('min', '1')
  input.setAttribute('max', '100')
  input.setAttribute('value', `${localStorageReturn[i].quantity}`);

  //========================

  //<div class="cart__item__content__settings__delete">
  const divCartItemContentSetingDelet = document.createElement('div');
  const classCartItemContentSetingDelet = document.createAttribute('class'); //
  classCartItemContentSetingDelet.value = `cart__item__content__settings__delete`;
  divCartItemContentSetingDelet.setAttributeNode(classCartItemContentSetingDelet);

  //==============================
  // <p>class="deleteItem">Supprimer...
  const paragrapheDeletItem = document.createElement('p')
  paragrapheDeletItem.innerText = 'Supprimer';
  paragrapheDeletItem.setAttribute('class', 'deleteItem');



  //Montage 
  cartItemsId.appendChild(articleElem);
  articleElem.appendChild(divCartItemImg);
  divCartItemImg.appendChild(img);
  articleElem.appendChild(divCartItemContent);
  divCartItemContent.appendChild(divCartItemContentDesc);
  divCartItemContentDesc.appendChild(h2Name);
  divCartItemContentDesc.appendChild(paragrapheColor)
  divCartItemContentDesc.appendChild(paragraphePrice);
  divCartItemContent.appendChild(divCartItemContentSeting);
  divCartItemContentSeting.appendChild(divCartItemContentSetingQuantity);
  divCartItemContentSetingQuantity.appendChild(paragraphQuantity);
  divCartItemContentSetingQuantity.appendChild(input);
  divCartItemContentSeting.appendChild(divCartItemContentSetingDelet);
  divCartItemContentSetingDelet.appendChild(paragrapheDeletItem);

  // ========

  // TOTAL 

  document.querySelector('#totalQuantity').innerHTML = `${totalQuantity()}`;
  document.querySelector('#totalPrice').innerHTML = `${totalPrice(data, i)}`;

}


const getFetchApi = () => {
  for (let i = 0; i < localStorageReturn.length; i++) {

    fetch(`http://localhost:3000/api/products/${localStorageReturn[i].id}`)
      .then(res => {
        if (res.ok) {
          return res.json() // si tout est ok j'ai un retour dans res que je convertie en format json ()
        }
      })
      .then(data => {
        nodeCart(data, i)
      })
      .catch(err => {
        console.log(`vous avez une Erreur !! ${err}`);
      })
  }
}



// const quantityPlus = async (modificationQuantity) => {
//   await modificationQuantity
//   console.log("fonction plus")
// }

// modificationQuantity()


getFetchApi()





//  bouton supprimer
// for (let i = 0; i < localStorageReturn.length; i++) {

//   const inputDelet = document.querySelector('.deleteItem')
//   console.log(inputDelet);
//   inputDelet.addEventListener('click', (e) => {
//     e.preventDefault();
//     // je recupere id du click

//     // je supprime la commande avec la cle objet

//     // let idSelect = localStorage.setItem('commande', 'object');
//     // console.log(idSelect)
//   })
// }


