// je recupere les donnes du LocalStorage
let localStorageReturn = JSON.parse(localStorage.getItem("commande"));


const getFetchApi = () => {

  for (let i = 0; i < localStorageReturn.length; i++) {

    fetch(`http://localhost:3000/api/products/${localStorageReturn[i].id}`)
      .then(res => {
        if (res.ok) {
          return res.json() // si tout est ok j'ai un retour que je convertie en format json ()
        }
      })
      .then(data => {
        nodeCart(data, i);
        deletButnFunction(i);
      })
      .catch(err => {
        console.log(`vous avez une Erreur !! ${err}`);
      })
  }
}
getFetchApi();


// calcule du total Quantity 
const totalQuantity = () => {
  const quantityTotalArray = [];
  // variable Initialisees 
  // je boucle sur le tableau du localStorage
  // je recupere les donnée dans commandeArray
  for (let i = 0; i < localStorageReturn.length; i++) {

    quantityTotalArray.push(parseInt(localStorageReturn[i].quantity));

  }
  console.log(quantityTotalArray);
  const totalValue = quantityTotalArray.reduce(
    (pre, cur) => pre + cur,
  );

  return totalValue
}

// initialisation de l'array pour le calcule total prix 
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

  /*** <h2>lastName du produit</h2>
   <p>Vert</p>
   <p>42,ii €</p> */
  const h2Name = document.createElement('h2');
  const paragrapheColor = document.createElement('p');
  const paragraphePrice = document.createElement('p');
  h2Name.innerHTML = `${localStorageReturn[i].name}`;
  paragrapheColor.innerText = ` ${localStorageReturn[i].color}`;
  paragraphePrice.innerText = `${data.price} €`;

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
  const divCartItemContentSetingDelete = document.createElement('div');
  const classCartItemContentSetingDelete = document.createAttribute('class'); //
  classCartItemContentSetingDelete.value = `cart__item__content__settings__delete`;
  divCartItemContentSetingDelete.setAttributeNode(classCartItemContentSetingDelete);

  //==============================
  // <p>class="deleteItem">Supprimer...
  const paragrapheDeconstItem = document.createElement('p')
  paragrapheDeconstItem.innerText = 'Supprimer';
  paragrapheDeconstItem.setAttribute('class', 'deleteItem');



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
  divCartItemContentSeting.appendChild(divCartItemContentSetingDelete);
  divCartItemContentSetingDelete.appendChild(paragrapheDeconstItem);

  // ========

  // TOTAL 
  document.querySelector('#totalQuantity').innerHTML = `${totalQuantity()}`;
  document.querySelector('#totalPrice').innerHTML = `${totalPrice(data, i)}`;

  addQuantityPanier(i)

}

const addQuantityPanier = (i) => {

  // fonction jouter quantity a partir du panier 
  const itemQuantityPannier = document.querySelectorAll('.itemQuantity');

  itemQuantityPannier[i].addEventListener('change', (e) => {
    e.preventDefault();
    localStorageReturn[i].quantity = itemQuantityPannier[i].value;
    console.log(localStorageReturn)
    localStorage.setItem("commande", JSON.stringify(localStorageReturn)); //j'envoie au local storage mon nouveau tableau avec la commande mise a jours
    location.reload();
  })
}


// btn supprimer.
function deletButnFunction(i) {

  const deleteBtn = document.querySelectorAll(".deleteItem");

  deleteBtn[i].addEventListener('click', (e) => {
    e.preventDefault();

    // je filtre sur le tableau recuperer par mes donee du localStorage.
    // 1 -- je cree un nouveau tableau qui renvoie toutes les commandes SAUF celle qui a le meme id de la commande du bouton Supprimer et  aussi la meme couleur pour eviter de suprimer les meme produit (car ils on le meme Id)
    localStorageReturn = localStorageReturn.filter((item) => item.id !== localStorageReturn[i].id || item.color !== localStorageReturn[i].color);
    if (localStorageReturn.length > 0) {
      localStorage.setItem("commande", JSON.stringify(localStorageReturn)); //j'envoie au local storage mon nouveau tableau avec la commande mise a jours
      alert(` Votre commande est bien enlevé du panier `); // j'allerte mon clients 
      location.reload(); // je recharge la page avec le nouveau tableau
    } else if (localStorageReturn.length = 1) {
      const choix = confirm(` Votre Votre panier va être vide `); // j'allerte mon clients 
      if (choix) {
        localStorage.clear();
        alert(` Votre commande est bien enlevé du panier `); // j'allerte mon clients 
        location.reload(); // je recharge la page avec le nouveau tableau
      }
    }
  })
}



//creation du formulaire de verification 
const validityFormulaire = () => {
  // selection de la balise formulaire 
  const formFirstName = document.querySelector('#firstName');
  const formLastName = document.querySelector('#lastName');
  const formAddress = document.querySelector('#address');
  const formCity = document.querySelector('#city');
  const formEmail = document.querySelector('#email');


  // Ajout des verifications
  const caractereVerif = /^[a-zA-Z ,.'-]+$/
  const emailCharVerif = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const adresseVerif = /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/;

  //Prenom
  formFirstName.addEventListener('change', (e) => {
    e.preventDefault()
    if (caractereVerif.test(formFirstName.value)) {
      document.querySelector('#firstNameErrorMsg').innerHTML = ' ';
    } else {
      document.querySelector('#firstNameErrorMsg').innerHTML = `votre prenon ${formFirstName.value} n'est pas valid.`;
    }
  });


  // nom 
  formLastName.addEventListener('change', (e) => {
    e.preventDefault()
    if (caractereVerif.test(formLastName.value)) {
      document.querySelector('#lastNameErrorMsg').innerHTML = ' ';
    } else {
      document.querySelector('#lastNameErrorMsg').innerHTML = `votre nom ${formLastName.value} n'est pas valid.`;
    }
  });

  // addresse
  formAddress.addEventListener('change', (e) => {
    e.preventDefault()
    if (adresseVerif.test(formAddress.value)) {
      document.querySelector('#addressErrorMsg').innerHTML = ''
    } else {
      document.querySelector('#addressErrorMsg').innerHTML = `votre adresse ${formAddress.value} n'est pas valid.`;
    }
  });

  // ville
  formCity.addEventListener('change', (e) => {
    e.preventDefault()
    if (caractereVerif.test(formCity.value)) {
      document.querySelector('#cityErrorMsg').innerHTML = ''
    } else {
      document.querySelector('#cityErrorMsg').innerHTML = `votre ville ${formCity.value} n'est pas valid.`;
    }
  });

  //Email
  formEmail.addEventListener('change', (e) => {
    e.preventDefault()
    if (emailCharVerif.test(formEmail.value)) {
      document.querySelector('#emailErrorMsg').innerHTML = ' '
    } else {
      document.querySelector('#emailErrorMsg').innerHTML = `votre email ${formEmail.value} n'est pas valid.`;
    }
  });
}

validityFormulaire();

// j'envoie la commande au backend
const sendCmd = () => {
  // selection de la balise order 
  const btnEnvoyer = document.querySelector('#order');

  // au click du btnEnvoyer
  btnEnvoyer.addEventListener('click', (e) => {
    e.preventDefault();

    // initialise mon tableau
    const products = [];

    // iteration sur le retour de localstorage langth
    for (let i = 0; i < localStorageReturn.length; i++) {
      products.push(localStorageReturn[i].id)
    }

    const order = {
      contact: {
        firstName: document.querySelector('#firstName').value,
        lastName: document.querySelector('#lastName').value,
        address: document.querySelector('#address').value,
        city: document.querySelector('#city').value,
        email: document.querySelector('#email').value,
      },
      products
    }


    // je place dans la const option les parametre de mon fetch que je vais faire apres 
    const options = {
      method: 'POST', // j'indique que c'est une methode POST car Fetch par defaut envoie un GET
      body: JSON.stringify(order), // j'indique qu'il sagit de l'objet order sous forme de string pour etre un JSON
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"// je lui dit qu'il faut lire en JSON
      },
    };

    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then((data) => {
        // je recupere un objet avec le resumer de ma commande les ID et surtout le numero de confirmation 
        localStorage.setItem('numeroCmd', data.orderId);// je demande a envoyer directement au Local Storage le Id de confirmation avec la key numeroCMD 
        document.location.href = '../html/confirmation.html'// j'indique la page qui dois apparaitre 

      })
      .catch((err) => {
        console.log(`vous avez une erreur :  ${err}`)
      })
  })

}
sendCmd();



// pour les valeurs du panier

// 1 - ecouter le changement 
// 2- envoyer au localStorage
// 3- recuperer le localstorage pour l'afficher















