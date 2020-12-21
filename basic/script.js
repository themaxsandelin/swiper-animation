const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const swiperContainer = document.querySelector('.swiper-container');

const baseOpacity = 0.3;
const slider = new Swiper(swiperContainer, {
  on: {
    init: (swiper) => {
      for (let i = 0; i < swiper.slides.length; i++) {
        swiper.slides[i].style.opacity = !i ? 1 : baseOpacity;
      }
    },
    transitionStart: (swiper) => {
      swiperContainer.classList.add('transition');
      for (let i = 0; i < swiper.slides.length; i++) {
        swiper.slides[i].style.opacity = swiper.activeIndex === i ? 1 : baseOpacity;
      }
    },
    transitionEnd: () => {
      swiperContainer.classList.remove('transition');
    },
    sliderMove: (swiper) => {
      const slideIndex = Math.floor(swiper.progress * (swiper.slides.length - 1));
      const progress = (swiper.progress * (swiper.slides.length - 1)) - slideIndex;
      
      if (typeof swiper.slides[slideIndex] !== 'undefined') {
        swiper.slides[slideIndex].style.opacity = 1 - ((1 - baseOpacity) * progress);
      }
      if (typeof swiper.slides[slideIndex + 1] !== 'undefined') {
        swiper.slides[slideIndex + 1].style.opacity = baseOpacity + ((1 - baseOpacity) * progress);
      }
    }
  }
});

prevButton.addEventListener('click', () => {
  slider.slidePrev();
});

nextButton.addEventListener('click', () => {
  slider.slideNext();
});