/**=============================Liste des methodes et parametres de cette app ========================
 * ============================Fonctionnement de l'app====================
 * 1 - cette app contien une methode init qui est appeler au chargement de la page.
 * 2 - app.nodeCart(data, i);
 * 
 */
const app = {
  // app.localStorageCommande;
  //getFetchApi();
  //nodeCart();
  //totalQuantity();
  // totalPrice
  // addQuantityPanier
  // deletButnFunction

  // je recupere les donnes du LocalStorage
  localStorageCommande: JSON.parse(localStorage.getItem("commande")),
  // j'initialise un array pour le prix total 
  prixTotalArray: [],
  // variable d'initialisation pour le calcul de la quantiter de cmd:
  quantityTotalArray: [],


  init: () => {
    //appel de l'api
    app.getFetchApi();
  },

  // methode asynchrone 
  getFetchApi: async () => {
    if (app.localStorageCommande !== null) {
      for (let i = 0; i < app.localStorageCommande.length; i++) {

        // j'atend d'avoir la reponse du fetch pour effectuer le reste
        await fetch(`http://localhost:3000/api/products/${app.localStorageCommande[i].id}`)
          .then(res => {
            if (res.ok) {
              return res.json() // si tout est ok j'ai un retour que je convertie en format json ()
            }
          })
          .then(data => {
            app.nodeCart(data, i); // j'efectue la methode app.nodeCart qui vas me cree la page en dynamique
          })
          .catch(err => { // je capture les erreurs
            console.log(`vous avez une Erreur !! ${err}`);
            alert(`Désolé, une erreur est survenur, Merci de revenir plus tard`);
          })
      }
    }
  },

  //cree la page DOM
  nodeCart: (data, i) => {
    const cartItemsId = document.querySelector('#cart__items'); // je prend cart__items je le place dans la variable

    // je cree mes element et Attributs 
    const articleElem = document.createElement('article'); //<article></article>
    const classCartItem = document.createAttribute('class');  //class="cart__item"
    const dataId = document.createAttribute('data-id'); //data-id="{product-ID}" 
    const dataColor = document.createAttribute('data-color'); //data-color="{product-color}"

    // je donne les valeurs de ms attributs
    classCartItem.value = "cart__item";
    dataId.value = `${app.localStorageCommande[i].id}`;
    dataColor.value = `${app.localStorageCommande[i].color}`;

    // je place mes attribut a mes elements
    articleElem.setAttributeNode(classCartItem);
    articleElem.setAttributeNode(dataId);
    articleElem.setAttributeNode(dataColor);
    // cree mes element //<div class="cart__item__img">
    const divCartItemImg = document.createElement('div');
    const classCartItemImg = document.createAttribute('class');
    classCartItemImg.value = `cart__item__img`;
    divCartItemImg.setAttributeNode(classCartItemImg);

    //<img src="../images/producti1.jpg" alt="">
    const img = document.createElement('img');
    const src = document.createAttribute('src');
    const alt = document.createAttribute('alt');
    src.value = `${app.localStorageCommande[i].image}`;
    alt.value = `${app.localStorageCommande[i].description}`;
    img.setAttributeNode(src);
    img.setAttributeNode(alt);

    // <div> class="cart__item__content">
    const divCartItemContent = document.createElement('div');
    const classCartItemContent = document.createAttribute('class');
    classCartItemContent.value = `cart__item__content`;
    divCartItemContent.setAttributeNode(classCartItemContent);

    // <div class="cart__item__content__description">
    const divCartItemContentDesc = document.createElement('div');
    const classCartItemContentDesc = document.createAttribute('class');
    classCartItemContentDesc.value = `cart__item__content__description`;
    divCartItemContentDesc.setAttributeNode(classCartItemContentDesc);

    /*** <h2>lastName du produit</h2>
     <p>Vert</p>
     <p>42,ii €</p> */
    const h2Name = document.createElement('h2');
    const paragrapheColor = document.createElement('p');
    const paragraphePrice = document.createElement('p');
    h2Name.innerHTML = `${app.localStorageCommande[i].name}`;
    paragrapheColor.innerText = ` ${app.localStorageCommande[i].color}`;
    paragraphePrice.innerText = `${data.price} €`;

    //<div class="cart__item__content__settings">
    const divCartItemContentSeting = document.createElement('div');
    const classCartItemContentSeting = document.createAttribute('class');
    classCartItemContentSeting.value = `cart__item__content__settings`;
    divCartItemContentSeting.setAttributeNode(classCartItemContentSeting);

    // <div class="cart__item__content__settings__quantity">
    const divCartItemContentSetingQuantity = document.createElement('div');
    const classCartItemContentSetingQuantity = document.createAttribute('class');
    classCartItemContentSetingQuantity.value = `cart__item__content__settings__quantity`;
    divCartItemContentSetingQuantity.setAttributeNode(classCartItemContentSetingQuantity);

    // <p>Qté : </p>
    const paragraphQuantity = document.createElement('p'); // 
    paragraphQuantity.innerText = `Qté:`


    // input
    const input = document.createElement('input')
    input.setAttribute('type', 'number');
    input.setAttribute('class', 'itemQuantity')
    input.setAttribute('name', 'itemQuantity')
    input.setAttribute('min', '1')
    input.setAttribute('max', '100')
    input.setAttribute('value', `${app.localStorageCommande[i].quantity}`); // je cree les atribut avec la valeur des commandes


    //<div class="cart__item__content__settings__delete">
    const divCartItemContentSetingDelete = document.createElement('div');
    const classCartItemContentSetingDelete = document.createAttribute('class'); //
    classCartItemContentSetingDelete.value = `cart__item__content__settings__delete`;
    divCartItemContentSetingDelete.setAttributeNode(classCartItemContentSetingDelete);

    // <p>class="deleteItem">Supprimer...
    const paragrapheDeconstItem = document.createElement('p')
    paragrapheDeconstItem.innerText = 'Supprimer';
    paragrapheDeconstItem.setAttribute('class', 'deleteItem');

    //Montage des nodes
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

    //les methode pour le total TOTAL 
    document.querySelector('#totalQuantity').innerHTML = `${app.totalQuantity(i)}`;
    document.querySelector('#totalPrice').innerHTML = `${app.totalPrice(data, i)}`;

    // methode pour delet un article
    app.deletButnFunction(i);

    // methode pour ajouter de la quantiter a partir du panier 
    app.addQuantityPanier(i);

    // validation du formulaire, avec le controle REGEX
    app.validityFormulaire();

  },

  // methode pour le calcule du total Quantity 
  totalQuantity: (i) => {
    // je recupere dans mon array, sous forme de Integer la quantiter de ma commande a partir du LocalStorage
    app.quantityTotalArray.push(parseInt(app.localStorageCommande[i].quantity));

    // reduce permet de calculer la totaliter d'un array
    const totalValue = app.quantityTotalArray.reduce(
      (pre, cur) => pre + cur,
    );

    // la methode retourne la valeur total 
    return totalValue
  },

  // methode de calcule de prix total 
  totalPrice: (data, i) => {
    // je recupere dans mon array le prix multiplier par la quantiter commander
    app.prixTotalArray.push(data.price * app.localStorageCommande[i].quantity);

    // reduce calcule le total de mon array 
    const totalsolde = app.prixTotalArray.reduce(
      (pre, cur) => pre + cur,
    );

    // je retourne le total
    return totalsolde
  },

  // methode pour ajouter une quantiter a partir du panier 
  addQuantityPanier: (i) => {
    // je selectionne toutes les class itemQuantity
    const itemQuantityPannier = document.querySelectorAll('.itemQuantity');

    // j'ecoute le changement de toutes mes commandes car la methode va etre bouclée.
    itemQuantityPannier[i].addEventListener('change', (e) => {
      e.preventDefault();

      // si la valeurs est infefieur et superieur a 1 j'execute
      if (itemQuantityPannier[i].value <= 100 && itemQuantityPannier[i].value >= 1) {

        // je modifie la variable quantiter de localstorage par la valeur de la quantity afficher au change
        app.localStorageCommande[i].quantity = itemQuantityPannier[i].value;
        localStorage.setItem("commande", JSON.stringify(app.localStorageCommande)); //j'envoie au local storage mon nouveau tableau avec la commande mise a jours
        location.reload();// je recharge la page pour afficher toutes les valeurs mise a jours
      } else {
        itemQuantityPannier[i].value = 1; // sinon je remet une valeur a 1
      }
    })

  },

  // methode pour la gestion du btn supprimer du panier
  deletButnFunction: (i) => {

    // je selectionne tout les btn supprimer 
    const deleteBtn = document.querySelectorAll(".deleteItem");

    // je boucle sur le nombre de btn cree donc equivaut au nbr d'article
    for (let k = 0; k < deleteBtn.length; k++) {

      // j'ecoute le clique pour chaque btn
      deleteBtn[k].addEventListener('click', (e) => {
        e.preventDefault();

        // je filtre sur le tableau recuperer par mes donee du localStorage.
        // 1 -- je cree un nouveau tableau qui renvoie toutes les commandes SAUF celle qui a le meme id de la commande du bouton Supprimer et  aussi la meme couleur pour eviter de suprimer les meme produit (car ils on le meme Id)
        app.localStorageCommande = app.localStorageCommande.filter((item) => item.id !== app.localStorageCommande[i].id || item.color !== app.localStorageCommande[i].color);
        if (app.localStorageCommande.length > 0) {
          localStorage.setItem("commande", JSON.stringify(app.localStorageCommande)); //j'envoie au local storage mon nouveau tableau avec la commande mise a jours
          alert(` Votre commande est bien enlevé du panier `); // j'allerte mon clients 
          location.reload(); // je recharge la page avec le nouveau tableau

          // si ma commande est la derniere je demande confirmation pour vider le panier
        } else if (app.localStorageCommande.length = 1) {
          const choix = confirm(` Votre Votre panier va être vide `); // je recupere le choix

          if (choix) {//si le choix est true je clear le localstorage et revient a 0
            localStorage.clear();
            alert(` Votre commande est bien enlevé du panier `); // j'allerte mon clients que c'est bien vide
            location.reload(); // je recharge la page pour avoir une page vide
          } else {
            location.reload();// je recharge la page pour afficher toutes les valeurs mise a jours
          }
        }
      })
    }
  },

  //Methode de creation de  formulaire de verification 
  validityFormulaire: () => {

    // selection des balises du formulaire 
    const formFirstName = document.querySelector('#firstName');
    const formLastName = document.querySelector('#lastName');
    const formAddress = document.querySelector('#address');
    const formCity = document.querySelector('#city');
    const formEmail = document.querySelector('#email');


    //  Ajout des verifications REGEX
    const caractereVerif = /^[a-zA-Z ,.'-]+$/ // verifie qu'il y'a bien des lettre de a-z et certain "-, . ' ""
    const emailCharVerif = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const adresseVerif = /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/;

    //Prenom verification
    formFirstName.addEventListener('change', (e) => {
      e.preventDefault()
      if (caractereVerif.test(formFirstName.value)) {
        document.querySelector('#firstNameErrorMsg').innerHTML = ' ';
      } else {
        document.querySelector('#firstNameErrorMsg').innerHTML = `un prenom comporte uniquement des lettres.`;
      }
    });


    // nom verification
    formLastName.addEventListener('change', (e) => {
      e.preventDefault()
      if (caractereVerif.test(formLastName.value)) {
        document.querySelector('#lastNameErrorMsg').innerHTML = ' ';
      } else {
        document.querySelector('#lastNameErrorMsg').innerHTML = `le nom dois co;porter uniquement des lettres.`;
      }
    });

    // addresse verification
    formAddress.addEventListener('change', (e) => {
      e.preventDefault()
      if (adresseVerif.test(formAddress.value)) {
        document.querySelector('#addressErrorMsg').innerHTML = ''
      } else {
        document.querySelector('#addressErrorMsg').innerHTML = `veuillez entrer une adresse avec un numero et une Rue.`;
      }
    });

    // ville verification
    formCity.addEventListener('change', (e) => {
      e.preventDefault()
      if (caractereVerif.test(formCity.value)) {
        document.querySelector('#cityErrorMsg').innerHTML = ''
      } else {
        document.querySelector('#cityErrorMsg').innerHTML = `veuillez entrer un Ville.`;
      }
    });

    //Email verification
    formEmail.addEventListener('change', (e) => {
      e.preventDefault()
      if (emailCharVerif.test(formEmail.value)) {
        document.querySelector('#emailErrorMsg').innerHTML = ' '
      } else {
        document.querySelector('#emailErrorMsg').innerHTML = `un email valide c'est unnom@monfournisseur.com.`;
      }
    });
    app.sendCmd() // apres les controle je cree la methode pour envoyer au backend
  },

  //  Methode d'envoie de la commande au backend
  sendCmd: () => {

    // selection de la balise order "le bouton envoyer"
    const btnEnvoyer = document.querySelector('#order');

    // au click du btnEnvoyer
    btnEnvoyer.addEventListener('click', (e) => {
      e.preventDefault();

      // initialise mon tableau product qui sera envoyer conformement a la demande
      const products = [];

      // iteration sur le retour de localstorage langth pour inserer les Id dans le tableau 
      for (let i = 0; i < app.localStorageCommande.length; i++) {
        products.push(app.localStorageCommande[i].id)
      }

      // creation de l'objet atendu par le backend
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

      // je place dans l' objet option les parametre de mon fetch que je vais faire apres 
      const options = {
        method: 'POST', // j'indique que c'est une methode POST car Fetch par defaut envoie un GET
        body: JSON.stringify(order), // j'indique qu'il sagit de l'objet order sous forme de string pour etre un JSON
        headers: {
          'Accept': 'application/json', //type application utilisé
          "Content-Type": "application/json"// je lui dit qu'il faut lire en JSON
        },
      };

      // le fetch pour envoyer au backend en ;ethode POST cette fois ci
      fetch("http://localhost:3000/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {

          // ici je place directement dans l'URL le retour de ma demande fetch
          document.location.href = `../html/confirmation.html?orderId=${data.orderId}`// j'indique la page qui dois apparaitre

        })
        //gestion des erreurs
        .catch((err) => {
          console.log(`vous avez une erreur :  ${err}`)
          alert(`Désolé, une erreur est survenur, Merci de revenir plus tard`)
        })
    })
  }
}

// lancemenet de l'init a l'ecoute du chargement de la page
document.addEventListener('DOMContentLoaded', app.init);