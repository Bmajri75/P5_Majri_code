
  let articlId = new URL(location.href).searchParams.get('id')


  
// je demande le retour de l'api avec fetch
fetch(`http://localhost:3000/api/products/${articlId}`)
  
//celle ci me renvoie une promise j'appel then pour recuperer le resultat et verifier si celui ci est bien passé
    .then(res => {
      if (res.ok){
          return res.json() // si tout est ok j'ai un retour dans res que je convertie en format json ()
      } 
    })// ce dernier me renvoie encore une promise j'utilise encore then pour les recuperer
    .then(data => {
       // je cree ma balise img et je l'attache 
         let img = document.createElement('img');
         document.querySelector('.item__img').appendChild(img);
         img.src = data.imageUrl
         
         // je selectionne les parents et je rajoute du texte 
         // le texte il sagit du retour Json avec les cle correspondantes
         document.querySelector('#title').textContent = (`${data.name}`);
         document.querySelector('#price').textContent = (`${data.price}`);
         document.querySelector('#description').textContent = (`${data.description}`);
         
         // gestion des couleurs 
         //je cree une variable qui sera un array avec [color1, color 2, color 3]
         let colorsApi = data.colors

         // je boucle sur la taille de chaque array avec comme incrementation 
         // - option qui sera l'enfants de l'ID colors
         for (let i = 0; i < colorsApi.length; i++) {
          let option = document.createElement("option")
          document.querySelector('#colors').appendChild(option)
          

          option.value = ""; // une value vide 
          option.text = colorsApi[i]; // et un texte qui reprendre l'array cree plus haut
          

        }



    
    })
    .catch(err => {
      console.log(`vous avez une Erreur !! ${err}`);
    })

    



// Les valeur des Option de couleurs 

// etape 1 =  recuperer id color dans une variable

// etape 2 = cree une variable option qui contient un Array avec les differents couleurs recuperer dans API

