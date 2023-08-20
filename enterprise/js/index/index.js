let slideIndex = 1;
showSlide(slideIndex);

let timer = setInterval(() => {
    slideIndex = slideIndex +1
    showSlide(slideIndex)
}, 5000)

let timerDot = null

function currentSlide(n) {
    timer && clearInterval(timer)
    slideIndex = n
    showSlide(n)
    timer = setInterval(() => {
        slideIndex = slideIndex +1
        showSlide(slideIndex)
    }, 5000)
}

function drawDot() {
    if (!timerDot) {
        timerDot = setInterval(() => {

        }, 1000)
    }
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
        dots[i].classList.remove('progress');
        dots[i].parentNode.classList.remove('w-5');
        dots[i].parentNode.classList.remove('h-5');
        if (slideIndex - 1 === i) {
            if (!dots[i].parentNode.classList.contains('w-5')) {
                dots[i].parentNode.classList.add('w-5')
            }
            if (!dots[i].parentNode.classList.contains('h-5')) {
                dots[i].parentNode.classList.add('h-5')
            }
        }
    }

    // show the active slide
    slides[slideIndex - 1].classList.remove('hidden');

    // highlight the active dot
    dots[slideIndex - 1].classList.add('progress');
}

function onMouseEnterBanner() {
    timer && clearInterval(timer)
}
function onMouseLeaveBanner() {
    timer && clearInterval(timer)
    timer = setInterval(() => {
        slideIndex = slideIndex +1
        showSlide(slideIndex)
    }, 5000)
}
document.getElementById("index-banner").addEventListener("mouseenter", onMouseEnterBanner);
document.getElementById("index-banner").addEventListener("mouseleave", onMouseLeaveBanner);
