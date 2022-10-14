const img = document.getElementById('img') 


let items = {
    productName: 'Kanap 2x2',
    productDescription: 'Canapé familial',
    productID: 42,
    img: 
  };
  
img.addEventListener('click', function() {
   // console.log('yes');

    img.classList.add('show')
    alert('Ca a changé')
