const verification = () => {
  if (product.articlId != arrayCaisse[0] && product.colors != arrayCaisse[1]) {
    // je recupere les valeurs
    const value = {
      valueColors: document.querySelector("#colors").value,
      valueQuantity: document.querySelector("#quantity").value,
      price: data.price,
      img: data.imageUrl,
      name: data.name,
    }

    // je cree mon objet avec les informations necessaire à retenir,
    const product = {
      id: articlId,
      colors: value.valueColors,
      quantity: value.valueQuantity,
      prix: price,
      image: img,
      name: name,
    }

    // je recupere les data de la commande je les transforme en donnee string au localStorage
    localStorage.setItem("commande", JSON.stringify(product));

  } else if (product.articlId == arrayCaisse[0] && product.colors != arrayCaisse[1]) {

  };
}