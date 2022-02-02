

// je cree une fonction avec 2 parametre qui cree les noeux dans le HTML et qui reprendra les donnée de l'api pour injecter les datas
const creatNode = (data, i)  => {

  // ici j'attache le a je lui rajoute le href ainsie que le lien.
  let baliseA = document.createElement('a');
  document.querySelector('.items').appendChild(baliseA);
  baliseA.href = `./product.html?id=${data[i]._id}`
  
  // j'attache la balise <article> à la balise <a>
  let baliseArticle = document.createElement('article');
  baliseA.appendChild(baliseArticle);
  
  // balise img 
  let img = document.createElement('img');
  baliseArticle.appendChild(img);
  img.src = data[i].imageUrl
  
  // balise h3 
  let baliseH3 = document.createElement('h3');
  baliseArticle.appendChild(baliseH3);
  baliseH3.classList.add("productName");
  baliseH3.innerHTML = data[i].name;
  
  // balise p
  let baliseP = document.createElement('p');
  baliseArticle.appendChild(baliseP);
  baliseP.classList.add("productDescription");
  baliseP.innerHTML = data[i].description;
   
  }


  // je demande le retour de l'api avec fetch
  fetch('http://localhost:3000/api/products')
  
  //celle ci me renvoie une promise j'appel then pour recuperer le resultat et verifier si celui ci est bien passé
      .then(res => {
        if (res.ok){
            return res.json() // si tout est ok j'ai un retour dans res que je convertie en format json ()
        } 
      })// ce dernier me renvoie encore une promise j'utilise encore then pour les recuperer
      .then(data => {

       for (let i = 0; i < data.length; i++) {
         console.log(data[i]);
         // je boucle sur ce resultat
         creatNode(data, i);
       }
      })
      .catch(err => {
  
        console.log(`vous avez une Erreur !! ${err}`);
      })




