const images = document.querySelectorAll('.img.profile');

images.forEach(function (img) {
  img.addEventListener('click', function(){
    this.classList.toggle('active');
  })
})
