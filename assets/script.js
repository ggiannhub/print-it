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

// Generate slides dynamically from the array
slidesData.forEach(slide => {
    const slideDiv = document.createElement('div');
    slideDiv.classList.add('slide');
    slideDiv.innerHTML = `${slide.content}<div class="overlay">${slide.overlayText}</div>`;
    slidesContainer.appendChild(slideDiv);
});

// Generate dots dynamically
const totalSlides = slidesData.length;
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
}

function goToSlide(index) {
    if (index < 0) {
        currentSlide = totalSlides - 1; // Loop to the last slide
    } else if (index >= totalSlides) {
        currentSlide = 0; // Loop to the first slide
    } else {
        currentSlide = index;
    }
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateDots();
}

function updateDots() {
    const allDots = document.querySelectorAll('.dot');
    allDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

prevButton.addEventListener('click', () => goToSlide(currentSlide - 1));
nextButton.addEventListener('click', () => goToSlide(currentSlide + 1));

// Initialize the carousel
updateDots();
