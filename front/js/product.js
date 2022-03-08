
/**=============================Liste des methodes et parametres de cette app ========================
 * articlId, ==> recupere l'Id dans la barre d'adresse de la page
 * kanapDataArray[]  ====> la reponse de ma requette fetch.
 * init() ==> methode qui lance les app au chargement de ma page.
 *  app.fetchKanap(); ===> recupere les information uniquement de l'id selectionnee 
 * creatDomProduct() ==> methode qui cree le Dom du produit elle contien ==> app.addColorToPage(); app.envoyerPannier();
 *  addColorToPage() ==> methode qui boucle les couleur du produit.
 * envoyerPannier() ===> methode qui gere l'envoie au panier avec une serie de verification.
 * 
 * ============================Fonctionnement de l'app====================
 */

const app = {
  articlId: new URL(location.href).searchParams.get('id'),  // je recupere l'id à partir de l'URL
  kanapDataArray: [], // j'initialise une array qui contiendra ma reponse du fetch

  // methode init qui appel toutes les fonction demarage
  init: () => {
    app.fetchKanap();
    app.creatDomProduct();
  },

  // Methode fetch qui recupere les donnée a partir de l'API et les envoie dans une array app.kanapDataArray[]
  fetchKanap: async () => {
    await fetch(`http://localhost:3000/api/products/${app.articlId}`)
      .then((res) => res.json()) // si tout est ok j'ai un retour dans res que je convertie en format json ()
      .then((data) => {
        app.kanapDataArray = data; // j'envoie le tout dans l'array ci joint.
      })
      .catch(err => {
        console.log(`vous avez une Erreur !! ${err}`);
        alert(`Désolé, une erreur est survenur, Merci de revenir plus tard`);
      })
  },

  // function pour la creation des nodes de la page " DOM " 
  creatDomProduct: async () => {
    await app.fetchKanap(); // comme presque toutes les fonction j'attend que le fetch soit fini.

    // je cree mes balise que je vais integrer plus tard
    const img = document.createElement('img');

    // j'attache ma balise "img" a la class "item__img"
    document.querySelector('.item__img').appendChild(img);
    img.src = app.kanapDataArray.imageUrl // je rajoute la  src = "data.imageUrl"
    img.alt = app.kanapDataArray.altTxt// ajout de alt des img

    // je selectionne les parents et je rajoute du texte a partir de la reponse fetch placé dans l'array kanapDataArray[]
    document.querySelector('#title').textContent = (`${app.kanapDataArray.name}`);
    document.querySelector('#price').textContent = (`${app.kanapDataArray.price}`);
    document.querySelector('#description').textContent = (`${app.kanapDataArray.description}`);


    app.addColorToPage();// ==> j'appel la creation des couleurs 
    app.envoyerPannier();// ==>  j'appel la creation du btn envoyer au panier avec sa methode de verification

  },

  //methode qui recupere les couleurs de chaque produit a partir des l'array kanapDataArray
  addColorToPage: async () => {
    await app.fetchKanap();

    // affichage des couleurs
    //je cree une variable qui sera un array avec [color1, color 2, color 3]
    let colorFromsApi = app.kanapDataArray.colors
    // je boucle sur la taille de chaque array avec comme incrementation
    // - option qui sera l'enfants de l'ID colors
    for (let i = 0; i < colorFromsApi.length; i++) {
      let option = document.createElement("option")
      document.querySelector('#colors').appendChild(option)
      option.value = colorFromsApi[i]; // une value
      option.text = colorFromsApi[i]; // et un texte qui reprendre l'array cree plus haut
    }
  },


  // cette methode prend le bouton envoyer et  contien toutes une serie de verification avant l'envoie,
  // le principe c'est de boucler avec des verification pour chaque ajout, afin de savoir si l'Id ou la couleur à deja ete ajouté
  envoyerPannier: () => {
    document.querySelector('#addToCart').addEventListener('click', (e) => {
      e.preventDefault();

      // recupere les Values (Couleur et Quantity)
      const valueColors = document.querySelector("#colors").value;
      const valueQuantity = document.querySelector("#quantity").value;

      // je fait une initialisation du localStorage 
      let localStorageCommande = []
      localStorageCommande = JSON.parse(localStorage.getItem("commande"));

      // je cree une premiere condition pour verifier qu'il y'a bien une quantity entre 1 et 100 et qu'une couleur est selectionnée sans quoi je place un msg d'erreur.
      if (valueQuantity > 0 && valueQuantity != 0 && valueQuantity <= 100 && valueColors != null) {

        // je cree mon objet qui sera envoyer au Local storage avec la selection du client sans le prix par mesure de securitée
        const productCommande = {
          id: app.kanapDataArray._id,
          name: app.kanapDataArray.name,
          image: app.kanapDataArray.imageUrl,
          color: valueColors,
          quantity: Number(valueQuantity),
          description: app.kanapDataArray.description,
        }
        // si le localstorage est null, donc vide je rentre dans le IF
        if (localStorageCommande == null) {

          let localStorageCommande = [];//j'initialise mon tableau de commande
          localStorageCommande.push(productCommande); // j'evoie la commande dans le tableau
          localStorage.setItem("commande", JSON.stringify(localStorageCommande)); //j'envoie au local storage

          // j'alerte du choix du client que cela est bien passé
          alert(` votre produit : ${productCommande.name} quantiter : ${productCommande.quantity} est dans votre panier `);

          // sinon Si le local storage est different de vide (donc plein)
        } else if (localStorageCommande != null) {

          // je boucle sur la taille des element sur le local storage pour modifier celui ci 
          for (let i = 0; i < localStorageCommande.length; i++) {

            // si les produit que j'envoie on le meme id et la meme couleur 
            if (localStorageCommande[i].id == productCommande.id && localStorageCommande[i].color == productCommande.color) {

              // je renvoie uniquement la quantiter qu'il y'a dans ma commande au local storage
              return (
                localStorageCommande[i].quantity += productCommande.quantity,// je retourne juste la quantiter incrementer
                localStorage.setItem("commande", JSON.stringify(localStorageCommande)), // et j'envoie au localstorage sous forme de strimg
                localStorageCommande = JSON.parse(localStorage.getItem('commande')) // je recupere ensuite le localstorage sous forme d'objet
              ),

                // j'alerte le client qu'il a juste incrementer son panier de la quantiter souhaité
                alert(` Ajout de ${productCommande.quantity} à votre Panier `);
            }
          }

          // je refair une boucle pour verifier une autre condition 
          for (let i = 0; i < localStorageCommande.length; i++) {

            // si le local storage a la meme id et une couleur differente je rentre dans cette condition 
            if (localStorageCommande[i].id == productCommande.id && localStorageCommande[i].color != productCommande.color || localStorageCommande[i].id != productCommande.id) {

              // je rajoute la commande entiere dans mon local storage
              return (
                localStorageCommande.push(productCommande), // je rajoute la commande entiere
                localStorage.setItem("commande", JSON.stringify(localStorageCommande)), // j'envoie au Localstorage sous forme de string
                localStorageCommande = JSON.parse(localStorage.getItem('commande')), // et je recupere ma commande sous forme d'objet

                // j'alerte mon client qu'il a une nouvelle commande dans le panier
                alert(` Ajout de : ${productCommande.name} couleur : ${productCommande.color} à votre Panier `)
              )
            }
          }
        }
      } else { // si la quantiter est superieur a 100 ou inferieur a 1 et ssi il n'ya pas de couleur selectionner je ne rentre dans aucune verification
        alert(`! incorect, veuillez entrer une quantitée entre 1 et 100, ainsie qu'une couleur SVP`)
      }
    });
  },
}

// lancemenet de l'init a l'ecoute du chargement
document.addEventListener('DOMContentLoaded', app.init);