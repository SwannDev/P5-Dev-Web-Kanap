// Fonction permetant de retourner tous les produits de l'API
async function getProducts() { 
  try {
      let response = await fetch('http://localhost:3000/api/products')
      // conversion de la réponse au format json    
      return await response.json();
  }
  catch (e) {
      console.log("Erreur lors de l'appel du serveur " + e);
      alert("Erreur lors de l'appel du serveur " );   // Affichage utilisateur
  } 
};


// Fonction permettant d'afficher les produits
(async function displayProducts() {
  let products = await getProducts();
  
  //---creation du rendu
  let render = '';
  products.forEach(item => {
      let htmlContentItem = `
          <a href="./product.html?id=${item._id}">
              <article>
                  <img src="${item.imageUrl}" alt="${item.altTxt}">
                  <h3 class="productName">${item.name}</h3>
                  <p class="productDescription">${item.description}</p>
              </article>
          </a>
      `;
      // stocker le rendu en memoire
      render = render+htmlContentItem;  
  });
  // injection du rendu sur la page
  document.getElementById('items').innerHTML = render;
})();

