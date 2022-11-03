function orderConfirmation() {
   // L'identifiant de commande sera donné au client lorsque la commande sera terminée et effacera le localstorage pour des raisons de sécurité
    const idHtml = document.querySelector("#orderId");
    idHtml.innerHTML = localStorage.getItem("orderId");
    localStorage.clear();
}

orderConfirmation();