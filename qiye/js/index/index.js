// // set the default active slide to the first one
let slideIndex = 1;
showSlide(slideIndex);

let timer = setInterval(() => {
    slideIndex = slideIndex +1
    showSlide(slideIndex)
}, 5000)

// change slide with the dots
function currentSlide(n) {
    clearInterval(timer)
    showSlide(slideIndex = n);
    timer = setInterval(() => {
        slideIndex = slideIndex +1
        showSlide(slideIndex)
    }, 5000)
}

function showSlide(n) {
    let i;
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName('dot');

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    // hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].classList.add('hidden');
    }

    // remove active status from all dots
    for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove('border-white');
        dots[i].classList.add('border-opacity-50');
    }

    // show the active slide
    slides[slideIndex - 1].classList.remove('hidden');

    // highlight the active dot
    dots[slideIndex - 1].classList.remove('border-opacity-50');
    dots[slideIndex - 1].classList.add('border-white');
}

// 响应式导航按钮的交互
const openMainMenu = document.getElementById('openMainMenu');
const closeMainMenu = document.getElementById('closeMainMenu');
const navList = document.getElementById('mobile-menu');

openMainMenu.addEventListener('click', () => {
    navList.classList.toggle('hidden');
});

closeMainMenu.addEventListener('click', () => {
    navList.classList.toggle('hidden');
});