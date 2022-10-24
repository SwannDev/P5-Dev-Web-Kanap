getOneArticle();

function getUrlSearchParams() {
    // obtenir l'id du produit de href
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const idProduct = searchParams.get("id");
    return idProduct;
}
const updateHtmlElement = (selector, content, htmlClass) => {
    const element = document.querySelector(selector);
    element.classList.add(htmlClass);
    element.innerHTML = content
    return element
}

function getOneArticle() {
    // fetch l'article avec la fonction getUrlSearchParams
    // récupere les valeurs de l'API des produits et les enregistre dans des variables
    const idProduct = getUrlSearchParams();
    fetch(`http://localhost:3000/api/products/${idProduct}`)
        .then((response) => response.json())
        .then((product) => {
            updateHtmlElement("#title", product.name);
            updateHtmlElement("#description", product.description);
            updateHtmlElement("#price", product.price);

            // Défini les valeurs des images de canapé dans la page
            let productImg = document.createElement("img");
            document.querySelector(".item__img").appendChild(productImg);
            productImg.src = product.imageUrl;
            productImg.alt = product.altTxt;


            // Défini les valeurs des couleurs dans la page
            for (colors of product.colors) {
                const productColor = document.createElement("option");
                document.querySelector("#colors").appendChild(productColor);
                productColor.value = colors;
                productColor.innerHTML = colors;
            }
        });
}

function addProductToCart() {
    // sélection d'un produit de la page et ajout au panier avec le bouton addeventlistener et localstorage
    const addToCart = document.querySelector("#addToCart");
    const choiceQuantity = document.querySelector("#quantity");
    addToCart.addEventListener("click", (event) => {
        // Si la quantité est bonne, initialise la fonction et ajoute le produit au panier
        event.preventDefault();
        if (
            choiceQuantity.value > 0 &&
            choiceQuantity.value <= 100 &&
            choiceQuantity.value != 0
        ) {
            let idBasket = 0;
            let product = {
                // Affectation des valeurs du produit dans le panier
                idBasket: idBasket,
                idProduct: getUrlSearchParams(),
                name: document.querySelector("#title").innerHTML,
                price: document.querySelector("#price").innerHTML,
                colors: document.querySelector("#colors").value,
                quantity: document.querySelector("#quantity").value,
                imgProduct: document.querySelector(".item__img").src,
            };

            let products = JSON.parse(localStorage.getItem("cart"));

            if (products) {
                // si le produit se retrouve dans le panier avec la même couleur et le même idProduct, on ajoute la quantité du produit
                const isProductInTheCart = products.find(
                    (productInCart) =>
                    productInCart.idProduct === product.idProduct &&
                    productInCart.colors === product.colors
                );
                if (isProductInTheCart) {
                    // Modifie la quantité d'un produit déjà dans le panier avec une nouvelle valeur
                    let newQuantity =
                        parseInt(isProductInTheCart.quantity) + parseInt(product.quantity);
                    isProductInTheCart.quantity = newQuantity;
                    persistItem(products);
                    redirectionToCartPage();
                } else {
                    // si le produit n'est pas trouvé dans le panier, l'ajoute au panier
                    products.push(product);
                    persistItem(products);
                    redirectionToCartPage();
                }
            } else {
                // si le panier est vide, ajoute le produit au panier vide (initialise le panier)
                products = [];
                products.push(product);
                localStorage.setItem("cart", JSON.stringify(products));
                redirectionToCartPage();
            }
        }
    });
}


const persistItem = (products) => {
  localStorage.setItem("cart", JSON.stringify(products))
}

function redirectionToCartPage() {
  // Créer une alerte dans la page lorsqu'un produit est ajouté au panier
  if (
      window.confirm(
          "Votre produit a été ajouté au panier. Pour le consulter, cliquez sur OK."
      )
  ) {
      window.location.href = "cart.html";
  }
}
addProductToCart();
// Il manque : un alert si la couleur du canapé et la quantité n'est pas saisi