async function fetchMoreData() {
  let listContainer = document.querySelector('.list-container');
  for(let i=0; i<12; i++) {
      let image = document.createElement("img");
      image.src = 'https://picsum.photos/300/300?random=' + Math.floor(Math.random() * 2000);
      image.alt = 'Random Image';
      image.style.width = '300px';
      image.style.height = '300px';
      listContainer.appendChild(image);
  }
}

// onscroll => 
//   window.innerHeight => Height of the visible area 
//   window.scrollY => How much the user has scrolled.
//   document.body.offsetHeight => Total page height

// If the user scrolls near the bottom, fetch new items.

function onscroll() {
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
      fetchMoreData();
  }
}
window.addEventListener("scroll", onscroll);
fetchMoreData();