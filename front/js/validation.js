
// une simple fonction pour afficher le numero de confirmation
const confirmationMsg = () => {
  const baliseOrderID = document.querySelector('#orderId');
  const orderId = new URL(location.href).searchParams.get('orderId');
  baliseOrderID.innerHTML = `${orderId} `
  localStorage.clear();
  // je vide completement le local storage apres avoir tout effectuer
}
confirmationMsg();
