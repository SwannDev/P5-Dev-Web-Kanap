let products = JSON.parse(localStorage.getItem("cart"));

function variablesProduct() {
    productArticle = document.createElement("article");
    productDivImg = document.createElement("div");

    // On met des variables sur les éléments div
    productItemContent = document.createElement("div");
    productItemContentTitlePrice = document.createElement("div");
    productItemContentSettings = document.createElement("div");
    productItemContentSettingsQuantity = document.createElement("div");
    productItemContentSettingsDelete = document.createElement("div");

    // Variables sur les informations des produits
    productTitle = document.createElement("h2");
    productColor = document.createElement("p");
    productPrice = document.createElement("p");
    productTitleQuantity = document.createElement("p");
    productQuantity = document.createElement("input");
    productDelete = document.createElement("p");
}

function appendChildProducts() {
   // Avec l'appendchild, on déplace les éléments vers un autre.
    document.querySelector("#cart__items").appendChild(productArticle);
    productArticle.appendChild(productItemContent);
    productItemContent.appendChild(productItemContentTitlePrice);
    productItemContentTitlePrice.appendChild(productTitle);
    productItemContentSettings.appendChild(productColor);
    productItemContentTitlePrice.appendChild(productPrice);
    

    // AppendChild sur les ItemSettings
    productItemContent.appendChild(productItemContentSettings);
    productItemContentSettings.appendChild(productItemContentSettingsQuantity);
    productItemContentSettingsQuantity.appendChild(productTitleQuantity);
    productItemContentSettingsQuantity.appendChild(productQuantity);
    productItemContentSettings.appendChild(productItemContentSettingsDelete);
    productItemContentSettingsDelete.appendChild(productDelete);
}

function displayProducts() {
    variablesProduct();
    appendChildProducts();

   // Affectation des classes depuis le HTML/CSS
    // On affecte les valeurs de products[cart] avec innerHTML
    productArticle.className = "cart__item";
    productArticle.setAttribute("data-id", products[cart].idProduct);
    productItemContent.className = "cart__item__content";
    productItemContentTitlePrice.className = "cart__item__content__titlePrice";
    productTitle.innerHTML = products[cart].name;
    productPrice.innerHTML = products[cart].price + " €";
    productItemContentSettings.className = "cart__item__content__settings";
    productColor.innerHTML = "Couleur : " + products[cart].colors;
    productColor.style.fontSize = "16px";


    // Insertion de la quantité de produit
    productItemContentSettingsQuantity.className =
        "cart__item__content__settings__quantity";
    productTitleQuantity.innerHTML = "Quantité : ";
    productQuantity.value = products[cart].quantity;
    productQuantity.className = "itemQuantity";
    productQuantity.setAttribute("type", "number");
    productQuantity.setAttribute("min", "1");
    productQuantity.setAttribute("max", "100");
    productQuantity.setAttribute("name", "itemQuantity");
    productItemContentSettingsDelete.className =
        "cart__item__content__settings__delete";
    productDelete.className = "deleteItem";
    productDelete.innerHTML = "Supprimer";
}

function getTotalPriceOfProducts() {
    // On obtient le prix total du produit et l'affiche
    let totalPrice = 0;
    for (cart in products) {
        totalPrice += products[cart].price * products[cart].quantity;
    }
    document.querySelector("#totalPrice").innerHTML = totalPrice;
}

function modifyQuantityProduct() {
    // modifie la quantité du produit et met à jour le prix total du panier
    let itemQuantity = document.querySelectorAll(".itemQuantity");
    for (let k = 0; k < itemQuantity.length; k++) {
        itemQuantity[k].addEventListener("change", function() {
            products[k].quantity = itemQuantity[k].value;
            localStorage.setItem("cart", JSON.stringify(products));
            getTotalPriceOfProducts();
        });
    }
}

function deleteProduct() {
   // supprime le produit du panier quand on appuie sur le bouton "supprimer du panier" via productDelete 
    let deleteItem = document.querySelectorAll(".deleteItem");
    for (let i = 0; i < deleteItem.length; i++) {
        deleteItem[i].addEventListener("click", (event) => {
            event.preventDefault();
            let idProduct =
                event.target.parentNode.parentNode.parentNode.getAttribute("data-id");
            products.splice(idProduct, 1);
            localStorage.setItem("cart", JSON.stringify(products));
            location.reload();
        });
    }
}

function displayCart() {
    let EmptyCart = document.querySelector("#cart__items");
   // si le panier est vide, affiche un message
    if (products === null || products === 0) {
        EmptyCart.innerHTML = "<h2>Votre panier est vide</h2>";
        document.querySelector("#order").style.display = "none";
    } else {
       // insère les produits dans le panier avec les éléments dans "cart"
        for (cart in products) {
            displayProducts();
            getTotalPriceOfProducts();
        }
    }
}

displayCart();
deleteProduct();
modifyQuantityProduct();

function sendForm() {
    // envoie le formulaire lorsqu'on appuie sur le bouton
    let btnSubmit = document.getElementById("order");
    btnSubmit.addEventListener("click", (event) => {
        event.preventDefault();

        const contact = {
// crée un objet contact avec les valeurs données par l'utilisateur avec le formulaire
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            email: document.getElementById("email").value,
        };

        const contactForm = {
            firstname: {
                selector: "firstName",
                regex: /^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/,
                errorMsg: "Votre prénom doit contenir entre 3 et 20 caractères"
            },
            lastname: {
                selector: "lastName",
                regex: /^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/,
                errorMsg: "Votre nom doit contenir entre 3 et 20 caractères"
            },
            address: {
                selector: "address",
                regex: /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/,
                errorMsg: "Votre adresse est invalide"
            },
            city: {
                selector: "city",
                regex: /^[a-zA-Zàâäéèêëïîôöùûüç]+(?:[- ][a-zA-Zàâäéèêëïîôöùûüç]+)*$/,
                errorMsg: "Votre ville est invalide"
            },
            email: {
                selector: "email",
                regex: /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/,
                errorMsg: "Votre email est invalide"
            }
        }




        function fieldValidator(field) {

            const fieldToValidate = document.getElementById(field.selector).value;
            const regexForValidation =
                field.regex.test(fieldToValidate);
            const errorMsgSelector = "#" + field.selector + "ErrorMsg";


            if (regexForValidation) {
                document.querySelector(errorMsgSelector).innerHTML = "";
                return true;
            } else {
                let firstNameErrorMsg = document.getElementById(field.selector + "ErrorMsg");
                firstNameErrorMsg.innerHTML = field.errorMsg;
                return false;
            }
        }


        function formValidation() {
            // si le formulaire est correctement rempli, créer un élément "contact" dans le localStorage

            let errorFound = false;
            for (let field in contactForm) {

                if (fieldValidator(contactForm[field]) === false) {
                    errorFound = true;
                };
            }

            if (errorFound) {
                event.preventDefault();
                alert("Merci de remplir correctement le formulaire");
                return false;
            } else {
                localStorage.setItem("contact", JSON.stringify(contact));
                return true;
            }


        }


       // Array du localStorage pour l'envoyer au serveur
        let products = [];
        for (let i = 0; i < products.length; i++) {
            products.push(products[i].idProduct);
        }

        console.log(products);

        if (formValidation() === true) {
        //  Créer un objet commande avec les informations de "contact" et "products"
            const order = {
                contact,
                products,
            };
            fetch("http://localhost:3000/api/products/order", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(order),
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    localStorage.clear();
                    localStorage.setItem("orderId", data.orderId);
                    document.location.href = "confirmation.html";
                })
                .catch((error) => console.log(error));
        } else {
            event.preventDefault();
        }
    });

}
sendForm();