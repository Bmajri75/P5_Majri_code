// Liste des Export


/**=============================Liste des methodes et parametres de cette app ========================
 * arrayGetFetch: [],
 *  app.getFetchCanap();
    app.creatNode();
 * 
 * ============================Fonctionnement de l'app====================
 * 
 * 1 - cette app contien une methode init qui est appeler au chargement de la page.
 * 2 - elle contien 2 methodes asynchrone
 * 3 - app.getFetchCanap() ====> elle envoie une requette GET pour recuperer les donnés a partir du Backend.
 * 4 - app.creatNode() ==> est une methode qui cree les noeuds de la page et inject les data recuperer par l'API
 * app.arrayGetFetch ==> un array qui contien le retour de la methode Fetch, en locurence les données de l'API
 */
const app = {

  arrayGetFetch: [],
  // fonction executé au chargement de la page.
  init: () => {
    app.getFetchCanap();
    app.creatNode();
  },

  // envoie un GET a l'API et recupere les data dans l'array arrayGetFetch[], methode asymchrone
  getFetchCanap: async () => {
    await fetch('http://localhost:3000/api/products')
      .then((res) => res.json())
      .then((data) => {
        app.arrayGetFetch = data;
      })
      .catch(err => {
        console.log(`vous avez une Erreur !! ${err}`);
        alert(`Désolé, une erreur est survenur, Merci de revenir plus tard`);
      })
  },

  //cree les neuds pour le visuel de la page avec des data qui provienne de arrayGetFetch[];
  //methode asynchrone
  creatNode: async () => {

    await app.getFetchCanap();// j'attend que la methode getFetchCanap soit executée pour aller a la suite.

    // je boucle sur la longueure de mon array pour cree autant d'element que le tableau dispose
    for (let i = 0; i < app.arrayGetFetch.length; i++) {
      /**
       * crée la balise <a></a>
       * je l'attache a la class items et j'y ajoute le href avec les donee de la data
       */
      const baliseA = document.createElement('a');
      document.querySelector('.items').appendChild(baliseA);
      baliseA.href = `./product.html?id=${app.arrayGetFetch[i]._id}`;

      /**
      * cree la balise <article></article>
      * je l'attache a la balise <a></a>
      */
      const baliseArticle = document.createElement('article');
      baliseA.appendChild(baliseArticle);

      /**
      * cree element <img> je l'attache a la balise article et je rajoute 2 attribut (src et alt) avec les data qui vons avec 
      */
      const img = document.createElement('img');
      baliseArticle.appendChild(img);
      img.src = app.arrayGetFetch[i].imageUrl;
      img.alt = app.arrayGetFetch[i].altTxt;

      /**
      * cree <h3></h3>
      * je l'attache a <article></article> ajoute la class productName et je rajoute le texte pris dans la data
      */
      const baliseH3 = document.createElement('h3');
      baliseArticle.appendChild(baliseH3);
      baliseH3.classList.add("productName");
      baliseH3.innerHTML = app.arrayGetFetch[i].name;

      /**
       * cree balise <p></p>
       * je l'attache a Article, ajoute class productDescription
       * ajoute le texte pris dans la data description
       */
      const baliseP = document.createElement('p');
      baliseArticle.appendChild(baliseP);
      baliseP.classList.add("productDescription");
      baliseP.innerHTML = app.arrayGetFetch[i].description;
    }
  },
};

// j'ecoute un event du chargement du dom et j'execute app.init
document.addEventListener('DOMContentLoaded', app.init);