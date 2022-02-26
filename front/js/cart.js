// je recupere les donnes du LocalStorage
const localStorageReturn = JSON.parse(localStorage.getItem("commande"));



const getFetchApi = () => {

  for (let i = 0; i < localStorageReturn.length; i++) {

    fetch(`http://localhost:3000/api/products/${localStorageReturn[i].id}`)
      .then(res => {
        if (res.ok) {
          return res.json() // si tout est ok j'ai un retour que je convertie en format json ()
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
getFetchApi();


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

  //<div class="cart__item__content__settings__deconste">
  const divCartItemContentSetingDeconst = document.createElement('div');
  const classCartItemContentSetingDeconst = document.createAttribute('class'); //
  classCartItemContentSetingDeconst.value = `cart__item__content__settings__deconste`;
  divCartItemContentSetingDeconst.setAttributeNode(classCartItemContentSetingDeconst);

  //==============================
  // <p>class="deconsteItem">Supprimer...
  const paragrapheDeconstItem = document.createElement('p')
  paragrapheDeconstItem.innerText = 'Supprimer';
  paragrapheDeconstItem.setAttribute('class', 'deconsteItem');



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
  divCartItemContentSeting.appendChild(divCartItemContentSetingDeconst);
  divCartItemContentSetingDeconst.appendChild(paragrapheDeconstItem);

  // ========

  // TOTAL 
  document.querySelector('#totalQuantity').innerHTML = `${totalQuantity()}`;
  document.querySelector('#totalPrice').innerHTML = `${totalPrice(data, i)}`;

}

// fonction recuperation des donnée de l'API



//creation du formulaire de verification 
const validityFormulaire = () => {
  // selection de la balise formulaire 
  const formFirstName = document.querySelector('#firstName').value;
  const formLastName = document.querySelector('#lastName').value;
  const formAddress = document.querySelector('#address').value;
  const formCity = document.querySelector('#city').value;
  const formEmail = document.querySelector('#email').value;

  // Ajout des verifications
  const caractereVerif = /^[a-zA-Z ]+$/
  const emailCharVerif = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


  //Prenom
  document.querySelector('#firstName').addEventListener('change', () => {
    if (caractereVerif.test(formFirstName)) {
      formFirstName.innerHTML = ' ';
    } else {
      formFirstName.innerHTML = `votre ville ${formFirstName} n'est pas valid.`;
    }
  });


  // nom 
  document.querySelector('#lastName').addEventListener('change', () => {
    if (caractereVerif.test(formLastName)) {
      formLastName.innerHTML = ' '
    } else {
      formLastName.innerHTML = `votre ville ${formLastName} n'est pas valid.`;
    }
  });

  // addresse
  document.querySelector('#address').addEventListener('change', () => {
    if (formAddress.value == false) {
      formAddress.innerHTML = `votre adresse ${formAddress} n'est pas valid.`;
    } else {
      formAddress.innerHTML = ' '
    }
  });

  // ville
  document.querySelector('#city').addEventListener('change', () => {
    if (caractereVerif.test(formCity)) {
      formCity.innerHTML = ' '
    } else {
      formCity.innerHTML = `votre ville ${formCity} n'est pas valid.`;
    }
  });

  //Email
  document.querySelector('#email').addEventListener('change', () => {
    if (emailCharVerif.test(formEmail)) {
      formEmail.innerHTML = ' '
    } else {
      formEmail.innerHTML = `votre ville ${formEmail} n'est pas valid.`;
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















