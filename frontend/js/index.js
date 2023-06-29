const carResult = document.getElementById('carResult')
const bikeResult = document.getElementById('bikeResult')
const car = document.getElementById('car')
const bike = document.getElementById('bike')
const mainBody = document.getElementsByClassName('mainBody')
const backgroundSrc = document.getElementById('backgroundSrc')


const gotoDashboard = () => {
    let logger = JSON.parse(localStorage.getItem('loggedInUser')) || { user: 'user' }

    const role = logger.user.role

    if (role == 'admin') {
        window.location.href = './pages/adminDashboard.html'
    } else {
        window.location.href = './pages/userDashboard.html'
    }
}

bikeResult.style.display = 'none'
carResult.style.display = 'flex'
bike.style.backgroundColor = '#073EA5'
car.style.backgroundColor = 'white'
bike.style.color = 'white'
backgroundSrc.setAttribute('src', './assets/carBackground.jpg')

const showCar = () => {
    bikeResult.style.display = 'none'
    carResult.style.display = 'flex'
    car.style.backgroundColor = 'white'
    bike.style.backgroundColor = '#073EA5'
    car.style.color = '#252B3B'
    bike.style.color = 'white'
    backgroundSrc.setAttribute('src', './assets/carBackground.jpg')
}

const showBike = () => {
    carResult.style.display = 'none'
    bikeResult.style.display = 'flex'
    bike.style.backgroundColor = 'white'
    car.style.backgroundColor = '#073EA5'
    car.style.color = 'white'
    bike.style.color = '#252B3B'
    backgroundSrc.setAttribute('src', './assets/bikeBackground.png')

}

const slotBook = () => {
    window.location.href = './pages/userDashboard.html'
}
const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');

const slideInterval = 2000;
const slideWidth = carouselImages[0].clientWidth;
let currentIndex = 0;

function nextSlide() {
  currentIndex++;
  if (currentIndex > carouselImages.length - 3) {
    currentIndex = 0;
  }
  carouselSlide.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
}

setInterval(nextSlide, slideInterval);
