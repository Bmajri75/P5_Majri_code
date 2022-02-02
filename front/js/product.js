let getidArticle = () =>  {
    return new URL(location.href).searchParams.get('id')
  }

let articlId = getidArticle();
  
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
    })
    .catch(err => {
      console.log(`vous avez une Erreur !! ${err}`);
    })

    


