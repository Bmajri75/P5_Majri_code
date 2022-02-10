const articlId = new URL(location.href).searchParams.get('id')

fetch(`http://localhost:3000/api/products/${articlId}`)
  .then(res => {
    if (res.ok) {
      return res.json() // si tout est ok j'ai un retour dans res que je convertie en format json ()
    }
  })// ce dernier me renvoie encore une promise j'utilise encore then pour les recuperer
  .then(data => {
    //     EN amont cree un array dans product avec ce qu'il retourne du localstorage 
    // il faut recupere les doneee du localStorage
    // remplacer le prix et les id les couleurs par ce qu'il y'a dans le panier
    let sessionRestaure = JSON.parse(localStorage.getItem('commande'))
    console.log(sessionRestaure);


    document.querySelector('#cart__items').insertAdjacentHTML('afterbegin', ` <article class="cart__item" data-id="${sessionRestaure.id}" data-color="${sessionRestaure.colors}">
    <div class="cart__item__img">
      <img src="${sessionRestaure.image}" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
      <h2>${sessionRestaure.name}</h2 >
      <p>${sessionRestaure.colors}</p>
      <p>${sessionRestaure.prix}€</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${sessionRestaure.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
    </article>`);

    document.querySelector('#totalQuantity').insertAdjacentHTML('afterbegin', `${sessionRestaure.quantity}`)
    document.querySelector('#totalPrice').insertAdjacentHTML('afterbegin', `${sessionRestaure.prix * sessionRestaure.quantity}`)


    const deletItemClass = document.querySelector('.deleteItem');

    deletItemClass.addEventListener('click', (e) => {
      localStorage.clear();
      location.reload()
    })
  })
  .catch(err => {
    console.log(`vous avez une Erreur !! ${err}`);
  })

