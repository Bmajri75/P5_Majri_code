// je recupere les donnes du LocalStorage
let localStorageReturn = JSON.parse(localStorage.getItem("commande"));

// variable Initialisees 
const commandeArray = [];
// je boucle sur le tableau du localStorage
// je recupere les donnée dans commandeArray
for (const commande of localStorageReturn) {
  commandeArray.push(commande);
  console.log(commandeArray);
}

//cree la page grace au Dom

const nodeCart = () => {
  const cartItemsId = document.querySelector('#cart__items'); // je prend cart__items je le place dans la variable
  // ==========
  // je cree mes element et Attributs 
  const articleElem = document.createElement('article'); //<article></article>
  const classCartItem = document.createAttribute('class');  //class="cart__item"
  const dataId = document.createAttribute('data-id'); //data-id="{product-ID}" 
  const dataColor = document.createAttribute('data-color'); //data-color="{product-color}"

  // je donne les valeurs de ms attributs
  classCartItem.value = "cart__item";
  dataId.value = `${localStorageReturn[0].id}`;
  dataColor.value = `${localStorageReturn[0].color}`;

  // je place mes attribut a mes elements
  articleElem.setAttributeNode(classCartItem);
  articleElem.setAttributeNode(dataId);
  articleElem.setAttributeNode(dataColor);
  console.log(articleElem);

  // ===================
  // cree mes element 
  const divCartItemImg = document.createElement('div'); //<div></div>
  const classCartItemImg = document.createAttribute('class'); //class="cart__item__img">

  // je place mes valeurs 
  classCartItemImg.value = `cart__item__img`;

  // place mes attributs 
  divCartItemImg.setAttributeNode(classCartItemImg);

  // =======

  const img = document.createElement('img');  //<img></img>
  const src = document.createAttribute('src');  //src="../images/product01.jpg"
  const alt = document.createAttribute('alt'); // alt="">

  src.value = `${localStorageReturn[0].image}`;
  alt.value = `${localStorageReturn[0].description}`;

  img.setAttributeNode(src);
  img.setAttributeNode(alt);

  console.log(img)

  const divCartItemContent = document.createElement('div'); // <div></div>
  const classCartItemContent = document.createAttribute('class'); //class="cart__item__content">
  classCartItemContent.value = `cart__item__content`;
  divCartItemContent.setAttributeNode(classCartItemContent);
  // =================

  const divCartItemContentDesc = document.createElement('div'); //<div></div>
  const classCartItemContentDesc = document.createAttribute('class'); //class="cart__item__content__description">

  classCartItemContentDesc.value = `cart__item__content__description`;

  divCartItemContentDesc.setAttributeNode(classCartItemContentDesc);
  // ==========
  const h2Name = document.createElement('h2');  //<h2>Nom du produit</h2>
  const paragrapheColor = document.createElement('p'); // <p>Vert</p>
  const paragraphePrice = document.createElement('p'); // <p>42,00 €</p>

  h2Name.innerHTML = `${localStorageReturn[0].name}`;
  paragrapheColor.innerText = ` ${localStorageReturn[0].color}`;
  paragraphePrice.innerText = `${localStorageReturn[0].price}`;

  // ==========
  const divCartItemContentSeting = document.createElement('div'); //<div></div>
  const classCartItemContentSeting = document.createAttribute('class'); //class="cart__item__content__settings">
  classCartItemContentSeting.value = `cart__item__content__settings`;

  divCartItemContentSeting.setAttributeNode(classCartItemContentSeting);
  // ==========

  const divCartItemContentSetingQuantity = document.createElement('div'); // <div></div>
  const classCartItemContentSetingQuantity = document.createAttribute('class'); //class="cart__item__content__settings__quantity">
  classCartItemContentSetingQuantity.value = `cart__item__content__settings__quantity`;

  divCartItemContentSetingQuantity.setAttributeNode(classCartItemContentSetingQuantity);
  // ==========

  const paragraphQuantity = document.createElement('p'); // <p>Qté : </p>

  paragraphQuantity.innerText = `Qté :€`

  // input
  const input = document.createElement('input')


  input.setAttribute('type', 'number'); //<input
  input.setAttribute('class', 'itemQuantity')
  input.setAttribute('name', 'itemQuantity')
  input.setAttribute('min', '1')
  input.setAttribute('max', '100')
  input.setAttribute('value', '42')
  // typeAtribut.appendChild(input);
  // classItemQuantity.appendChild(input);
  // input.appendChild(nameItemQuantity);
  // input.appendChild(minValue);
  // input.appendChild(maxValue);
  // input.appendChild(value);

  const divCartItemContentSetingDelet = document.createElement('div'); //<div></div>
  const classCartItemContentSetingDelet = document.createAttribute('class'); //class="cart__item__content__settings__delete">

  classCartItemContentSetingDelet.value = `cart__item__content__settings__delete`;
  divCartItemContentSetingDelet.setAttributeNode(classCartItemContentSetingDelet);

  const paragrapheDeletItem = document.createElement('p')
  paragrapheDeletItem.innerText = 'Supprimer'; // <p></p>
  paragrapheDeletItem.setAttribute('class', 'deleteItem'); //class="deleteItem">Supprimer...



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


  //input montage

  //divCartItemContentSetingQuantity.appendChild(input);







}


nodeCart();