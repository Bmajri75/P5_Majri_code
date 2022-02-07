// je cree une variable danas la quel je recupere un resultat de l'instance URL
// (l'interface  URL est un objet qui fournit des methode Statique pour cree des URL )
const articlId = new URL(location.href).searchParams.get('id')



  
// je demande le retour de l'api avec fetch
//celle ci me renvoie une promise j'appel then pour recuperer le resultat et verifier si celui ci est bien passé
fetch(`http://localhost:3000/api/products/${articlId}`)
    .then(res => {
      if (res.ok){
          return res.json() // si tout est ok j'ai un retour dans res que je convertie en format json ()
      } 
    })// ce dernier me renvoie encore une promise j'utilise encore then pour les recuperer
    .then(data => {
      // je cree mes balise que je vais integrer plus tard
        const img = document.createElement('img');
       // j'attache ma balise "img" a la class "item__img"
         document.querySelector('.item__img').appendChild(img);
         img.src = data.imageUrl// je rajoute la  src = "data.imageUrl"
         
         // je selectionne les parents et je rajoute du texte 
         // le texte il sagit du retour Json avec les cle correspondantes
         document.querySelector('#title').textContent = (`${data.name}`);
         document.querySelector('#price').textContent = (`${data.price}`);
         document.querySelector('#description').textContent = (`${data.description}`);
         
         // gestion des couleurs 
         //je cree une variable qui sera un array avec [color1, color 2, color 3]
         let colorsApi = data.colors

         console.log(colorsApi);

         // je boucle sur la taille de chaque array avec comme incrementation 
         // - option qui sera l'enfants de l'ID colors
         for (let i = 0; i < colorsApi.length; i++) {
          let option = document.createElement("option")
          document.querySelector('#colors').appendChild(option)
          option.value = colorsApi[i]; // une value
          option.text = colorsApi[i]; // et un texte qui reprendre l'array cree plus haut
        } 

    })
    .catch(err => {
      console.log(`vous avez une Erreur !! ${err}`);
    })

    // recupere les Values
    const valueColors = document.querySelector("#colors").value
    const valueQuantity = document.querySelector("#quantity").value


    let addButon = document.querySelector('#addToCart');

    addButon.addEventListener('click',(e) => {      
    
      const product = {
        id: articlId,
        quantity: valueQuantity,
        colors: valueColors,
      }
      console.log(product);
    } )

// mise en place de l'ajout d'articles.

// Utiliser le localStorage
