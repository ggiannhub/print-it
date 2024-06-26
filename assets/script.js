const slidesData = [
    { 
        content: '<img src="./assets/images/slideshow/slide1.jpg" alt="image 1">', 
        overlayText: '<p>Impressions tous formats <span>en boutique et en ligne</span></p>'
    },
    { 
        content: '<img src="./assets/images/slideshow/slide2.jpg" alt="Image 2">', 
        overlayText: '<p>Tirages haute définition grand format <span>pour vos bureaux et events</span></p>'
    },
    { 
        content: '<img src="./assets/images/slideshow/slide3.jpg" alt="Image 3">', 
        overlayText: '<p>Grand choix de couleurs <span>de CMJN aux pantones</span></p>'
    },
    { 
        content: '<img src="./assets/images/slideshow/slide4.png" alt="Image 4">', 
        overlayText: '<p>Autocollants <span>avec découpe laser sur mesure</span></p>'
    }
];

const slidesContainer = document.querySelector('.slides');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const dotsContainer = document.querySelector('.dots');

let currentSlide = 0;
let isSlideShowActive = false; // Flag pour pister l^état du slideshow

const slideIntervalTime = 3000; // Intervalle en milliseconds (e.g., 3000ms = 3 seconds)

// Générer les slides de façon dynamique à partir du tableau
slidesData.forEach(slide => {
  const slideDiv = document.createElement('div');
  slideDiv.classList.add('slide');
  slideDiv.innerHTML = `${slide.content}<div class="overlay">${slide.overlayText}</div>`;
  slidesContainer.appendChild(slideDiv);
});

// Générer les points de séléction dynamiquement
const totalSlides = slidesData.length;
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
}

function goToSlide(index) {
  if (index < 0) {
    currentSlide = totalSlides - 1; // Boucle vers le dernier slide
  } else if (index >= totalSlides) {
    currentSlide = 0; // Boucle vers le première slide
  } else {
    currentSlide = index;
  }
  slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
  updateDots();
  
  // Redemarrage du slideshow s'il est actif après navigation manuelle
  if (isSlideShowActive) {
    startSlideShow();
  }
}

function updateDots() {
  const allDots = document.querySelectorAll('.dot');
  allDots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

function startSlideShow() {
  if (!isSlideShowActive) { // Demarer seulement s'il n'est déjà en cours
    isSlideShowActive = true;
    slideInterval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, slideIntervalTime);
  }
}

function stopSlideShow() {
  clearInterval(slideInterval);
  isSlideShowActive = false;
}

// Écouteurs d'évènements pour les boutons de navigation
prevButton.addEventListener('click', () => {
  stopSlideShow();
  goToSlide(currentSlide - 1);
});

nextButton.addEventListener('click', () => {
  stopSlideShow();
  goToSlide(currentSlide + 1);
});

// Écouteurs d'évènements pour mouseover et focus
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', stopSlideShow);
carousel.addEventListener('focusin', stopSlideShow);
carousel.addEventListener('mouseleave', startSlideShow);
carousel.addEventListener('focusout', startSlideShow);

// Initialisation du carrousel
updateDots();
startSlideShow();
