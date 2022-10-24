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
        // If the quantity are good, it will initialize the function and add the product to the cart
        event.preventDefault();
        if (
            choiceQuantity.value > 0 &&
            choiceQuantity.value <= 100 &&
            choiceQuantity.value != 0
        ) {
            let idBasket = 0;
            let product = {
                // Assignation of the values of the product in the cart
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
                // if the product is found in the cart with the same color and idProduct, we add the quantity
                const isProductInTheCart = products.find(
                    (productInCart) =>
                    productInCart.idProduct === product.idProduct &&
                    productInCart.colors === product.colors
                );
                if (isProductInTheCart) {
                    // Modify the quantity of a product already in the cart with a new value
                    let newQuantity =
                        parseInt(isProductInTheCart.quantity) + parseInt(product.quantity);
                    isProductInTheCart.quantity = newQuantity;
                    persistItem(products);
                    redirectionToCartPage();
                } else {
                    // if the product is not found in the cart, add it to the cart
                    products.push(product);
                    persistItem(products);
                    redirectionToCartPage();
                }
            } else {
                // if the cart is empty, add the product to the empty cart
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
    // Create an alert in the page when a product is added to the cart
    if (
        window.confirm(
            "Votre produit a été ajouté au panier. Pour le consulter, cliquez sur OK."
        )
    ) {
        window.location.href = "cart.html";
    }
    addProductToCart()

} 
// Il manque : un alert si la couleur du canapé et la quantité n'est pas saisi