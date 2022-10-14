let product = {
    productName: 'Kanap 2x2',
    productDescription: 'Canapé familial',
    productID: 42
    const img = document.getElementById('img') 
  };
  
img.addEventListener('click', function() {
   // console.log('yes');

    img.classList.add('show')
    alert('Ca a changé')

 
  // Create variables here
  // =====================================
  
  let episodeTitle = episode.title;
  let episodeDuration = episode.duration;
  let episodeHasBeenWatched = episode.hasBeenWatched;
  
  // =====================================
  
  document.querySelector('#episode-info').innerText = `Episode: ${episodeTitle}
  Duration: ${episodeDuration} min
  ${episodeHasBeenWatched ? 'Already watched' : 'Not yet watched'}`