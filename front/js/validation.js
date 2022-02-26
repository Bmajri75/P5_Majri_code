
// une simple fonction pour afficher le numero de confirmation
const confirmationMsg = () => {
  valueOrderID = localStorage.getItem("numeroCmd");
  const baliseOrderID = document.querySelector('#orderId');
  baliseOrderID.innerHTML = `${valueOrderID} `
  localStorage.clear();
  // je vide completement le local storage apres avoir tout effectuer
}
confirmationMsg();
