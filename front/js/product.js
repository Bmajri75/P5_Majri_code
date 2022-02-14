// je cree une variable danas la quel je recupere un resultat de l'instance URL
// (l'interface  URL est un objet qui fournit des methode Statique pour cree des URL )
const articlId = new URL(location.href).searchParams.get('id');
console.log(articlId)
// je demande le retour de l'api avec fetch
//celle ci me renvoie une promise j'appel then pour recuperer le resultat et verifier si celui ci est bien passé
fetch(`http://localhost:3000/api/products/${articlId}`)
  .then(res => {
    if (res.ok) {
      return res.json() // si tout est ok j'ai un retour dans res que je convertie en format json ()
    }
  })// ce dernier me renvoie encore une promise j'utilise encore then pour les recuperer
  .then(data => {
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
        // je cree mon objet
        const productCommande ={
          id: articlId,
          color: valueColors,
          quantity: Number(valueQuantity),
        }
      // si je localstorage est plein je rentre dans le IF
        if (localStorageReturn == null)  { 
        console.log('else if')
        localStorageReturn =[];
        localStorageReturn.push(productCommande);
        localStorage.setItem("commande", JSON.stringify(localStorageReturn));
        alert(` Votre produit ${data.name} de couleur ${productCommande.color} est dans votre Panier`);
       
      }else if (localStorageReturn != null){
        for (let i = 0; i < localStorageReturn.length; i++) {
          console.log('test'); 
          if (localStorageReturn[i].id == productCommande.id && localStorageReturn[i].color == productCommande.color ) {
         return(
            localStorageReturn[i].quantity += productCommande.quantity,
             localStorage.setItem("commande", JSON.stringify(localStorageReturn)),
             localStorageReturn = JSON.parse(localStorage.getItem('commande'))
         )
            }   
        }
            // console.log('if')
            //  localStorageReturn.push(productCommande);
            //   localStorage.setItem("commande", JSON.stringify(localStorageReturn));
            //   alert(` Votre produit ${data.name} de couleur ${productCommande.color} est dans votre Panier`)
              // si mon panier est bien vide je vient directement dans le else
        }
      }
    })



    // Lorsqu’on ajoute un produit au panier, si celui-ci n'était pas déjà
    // présent dans le panier, on ajoute un nouvel élément dans l’array.
    // ● Lorsqu’on ajoute un produit au panier, si celui-ci était déjà présent
    // dans le panier (même id + même couleur), on incrémente
    // simplement la quantité du produit correspondant dans l’array.
  })


  .catch(err => {
    console.log(`vous avez une Erreur !! ${err}`);
  })





  // =======================



  // 1 -- Je recupere les valeurs que le clients choisie sous forme [array]
  // 1 BIS -- Avant de les placer dans le local storage, je verifie si toutes les condition sont reunie 

// condition 1 
// {  si c'est vide je rajoute }
// { si l'ID n'existe pas je rajoute}

// condition 2
// { si l'ID existe mais la couleur non Je rajoute}

// condition 3 
// {si id existe et la couleur aussi j'augmente la quantiter }


// Solution  -- je cree 2 array  
//       une qui est la commande en cours 
//       une qui est la commande en sortie du local storage 
// je les compare 



  // 2 -- je passe ces valeurs dans le local storage sous forme de chaine de caractere 
  // 2 BIS ou j'incremente la quantiter si il sagit du meme objet.
  
  // 3 -- je recupere ces valeurs sous forme d'objet 


  // CEPENDENT  


