// je cree une variable dans la quel je recupere un resultat de l'instance URL
// (l'interface  URL est un objet qui fournit des methode Statique pour cree des URL )
let articlId = new URL(location.href).searchParams.get('id');

// function pour la creation des nodes de la page " DOM " 
const textProductPage = (data) => {
  // je cree mes balise que je vais integrer plus tard
  const img = document.createElement('img');
  // j'attache ma balise "img" a la class "item__img"
  document.querySelector('.item__img').appendChild(img);
  img.src = data.imageUrl // je rajoute la  src = "data.imageUrl"
  // je selectionne les parents et je rajoute du texte
  // le texte il sagit du retour Json avec les cle correspondantes
  document.querySelector('#title').textContent = (`${data.name}`);
  document.querySelector('#price').textContent = (`${data.price}`);
  document.querySelector('#description').textContent = (`${data.description}`);
}
// je demande le retour de l'api avec fetch
//celle ci me renvoie une promise j'appel then pour recuperer le resultat et verifier si celui ci est bien passé
fetch(`http://localhost:3000/api/products/${articlId}`)
  .then(res => {
    if (res.ok) {
      return res.json() // si tout est ok j'ai un retour dans res que je convertie en format json ()
    }
  })// ce dernier me renvoie encore une promise j'utilise encore then pour les recuperer
  .then(data => {
    textProductPage(data)
    // gestion des couleurs

    //je cree une variable qui sera un array avec [color1, color 2, color 3]
    let colorFromsApi = data.colors
    // je boucle sur la taille de chaque array avec comme incrementation
    // - option qui sera l'enfants de l'ID colors
    for (let i = 0; i < colorFromsApi.length; i++) {
      let option = document.createElement("option")
      document.querySelector('#colors').appendChild(option)
      option.value = colorFromsApi[i]; // une value
      option.text = colorFromsApi[i]; // et un texte qui reprendre l'array cree plus haut
    }
    document.querySelector('#addToCart').addEventListener('click', (e) => {
      e.preventDefault();
      // recupere les Values de la page Couleur et Quantiter
      const valueColors = document.querySelector("#colors").value;
      const valueQuantity = document.querySelector("#quantity").value;

      // je fait une initialisation du localStorage 
      let localStorageReturn = JSON.parse(localStorage.getItem("commande"));
      // je cree une premiere condition pour verifier qu'il y'a bien une valeur a la quantiter
      if (valueQuantity > 0 && valueQuantity != 0 && valueQuantity <= 100) {
        // je cree mon objet qui sera envoyer au Local storage
        const productCommande = {
          id: articlId,
          name: data.name,
          image: data.imageUrl,
          color: valueColors,
          quantity: Number(valueQuantity),
          description: data.description,
        }

        // si je localstorage est null donc vide je rentre dans le IF
        if (localStorageReturn == null) {

          localStorageReturn = [];// jinitialise le tableau 
          localStorageReturn.push(productCommande); // j'evoie la commande dans le tableau
          localStorage.setItem("commande", JSON.stringify(localStorageReturn)); //j'envoie au local storage

          // sinon Si le local storage est different de vide (donc plein)
        } else if (localStorageReturn != null) {

          // je boucle sur la taille des element sur le local storage pour modifier celui ci 
          for (let i = 0; i < localStorageReturn.length; i++) {
            // si les produit que j'envoie on le meme id et la meme couleur 
            if (localStorageReturn[i].id == productCommande.id && localStorageReturn[i].color == productCommande.color) {
              // je renvoie uniquement la quantiter qu'il y'a dans ma commande au local storage
              return (
                localStorageReturn[i].quantity += productCommande.quantity,
                localStorage.setItem("commande", JSON.stringify(localStorageReturn)),
                localStorageReturn = JSON.parse(localStorage.getItem('commande'))
              );
            }

          }
          // je refair une boucle pour verifier une autre condition 
          for (let i = 0; i < localStorageReturn.length; i++) {
            // si le local storage a la meme id et une couleur differente je rentre dans cette condition 
            if (localStorageReturn[i].id == productCommande.id && localStorageReturn[i] != productCommande.color || localStorageReturn[i].id != productCommande.id) {
              // je rajoute la commande entiere dans mon local storage
              return (
                localStorageReturn.push(productCommande),
                localStorage.setItem("commande", JSON.stringify(localStorageReturn)),
                localStorageReturn = JSON.parse(localStorage.getItem('commande'))
              )
            }
          }

        }
      }
    })
  })
  .catch(err => {
    console.log(`vous avez une Erreur !! ${err}`);
  })


