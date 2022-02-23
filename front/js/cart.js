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

//creation du formulaire de verification 
const validityFormulaire = () => {
  // selection de la balise formulaire 
  const formulaire = document.querySelector(".cart__order__form");
  // Ajout des verifications
  const caractereVerif = /^[a-zA-Z ]+$/
  const emailCharVerif = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  //creation d'objet pour recup les donee a utiliser
  const objContact = {
    firstName: formulaire.firstName,
    lastName: formulaire.lastName,
    address: formulaire.address,
    city: formulaire.city,
    email: formulaire.email
  }



  //prélastName
  objContact.firstName.addEventListener('change', () => {
    if (caractereVerif.test(objContact.firstName.value)) {
      objContact.firstName
    } else {
      alert(`votre prelastName ${objContact.firstName.value} n'est pas valid.`);
    }
  });


  // nom 
  objContact.lastName.addEventListener('change', () => {
    if (caractereVerif.test(objContact.lastName.value)) {
      objContact.lastName
    } else {
      alert(`votre Nom ${objContact.lastName.value} n'est pas valid.`);
    }
  });

  // adresse
  objContact.address.addEventListener('change', () => {
    if (objContact.address.value == false) {
      alert(`votre adresse est vide .`);
    } else {
      objContact.address
    }
  });

  // ville

  objContact.city.addEventListener('change', () => {
    if (caractereVerif.test(objContact.city.value)) {
      objContact.city
    } else {
      alert(`votre ville ${objContact.city.value} n'est pas valid.`);
    }
  });

  //Email
  objContact.email.addEventListener('change', () => {
    if (emailCharVerif.test(objContact.email.value)) {
      objContact.email
    } else {
      alert(`votre Email ${objContact.email.value} n'est pas valid.`);
    }
  });

  const sendCommande = () => {
    // initialise mon tableau
    const productID = [];
    const order = {
      contact: {
        firstName: formulaire.firstName.value,
        lastName: formulaire.lastName.value,
        address: formulaire.address.value,
        city: formulaire.city.value,
        email: formulaire.email.value
      },
      product: productID,
    }

    // iteration sur le retour de localstorage langth
    for (let i = 0; i < localStorageReturn.length; i++) {
      productID.push(localStorageReturn[i])
    }

    // selection de la balise order 
    const btnEnvoyer = document.querySelector('#order');

    // au click du btnEnvoyer
    btnEnvoyer.addEventListener('click', (e) => {
      console.log(productID)

      const options = {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json"
        },
      };

      fetch("http://localhost:3000/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // localStorage.clear();
          //   localStorage.setItem('commande', data.productID);

          document.location.href = 'confirmation.html';
        })
        .catch((err) => {
          console.log(`vous avez une erreur :  ${err}`)
        })


    })
  }

  sendCommande()
}



// fonction recuperation des donnée de l'API
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
validityFormulaire();
getFetchApi()








