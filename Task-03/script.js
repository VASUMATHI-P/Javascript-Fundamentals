document.querySelectorAll('.image img').forEach(image => {
  image.addEventListener('click', () => {
    document.querySelector('.popup-image').style.display = 'block';
    document.querySelector('.popup-image img').src = image.getAttribute('src');
  })
});

document.querySelector('.popup-image span').addEventListener('click', () => {
  document.querySelector('.popup-image').style.display = 'none';
})
    