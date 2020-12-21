const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const swiperContainer = document.querySelector('.swiper-container');

const baseOpacity = 0.3;
const slider = new Swiper(swiperContainer, {
  slidesPerView: 'auto',
  on: {
    init: (swiper) => {
      for (let i = 0; i < swiper.slides.length; i++) {
        swiper.slides[i].style.opacity = !i ? 1 : baseOpacity;
      }
    },
    transitionStart: (swiper) => {
      swiperContainer.classList.add('transition');
      const delimeter = 70;
      const baseOpacity = 0.3;
      const scrollableDistance = (delimeter * swiper.slides.length) - 100;
      const sizePerSlide = delimeter / scrollableDistance;

      let index = swiper.activeIndex;
      const progress = Math.round(swiper.progress * 100) / 100;
      const maxProgress = Math.round( (sizePerSlide * (swiper.slides.length - 2)) * 100 ) / 100;
      if (progress > maxProgress) {
        index = swiper.slides.length - 1;
      }
      for (let i = 0; i < swiper.slides.length; i++) {
        swiper.slides[i].style.opacity = i === index ? 1 : baseOpacity;
      }
    },
    transitionEnd: () => {
      swiperContainer.classList.remove('transition');
    },
    sliderMove: (swiper) => {
      // Percentage width of slides.
      const delimeter = 70;
      const baseOpacity = 0.3;
      // Calculate length of all slides and remove the "slider width" to determine
      // how long the slider can actually travel
      const scrollableDistance = (delimeter * swiper.slides.length) - 100;
      const multiplier = scrollableDistance / delimeter;
      // Determine the container width in relation to the wrapper
      // to know how much the right edge has traveled in the wrapper.
      const containerWidth = (100 / scrollableDistance) * multiplier;

      // Calculate the progress measured from the left edge of the slider
      // to control the left most slide's opacity.
      const leftProgress = swiper.progress * multiplier;
      const leftSlideIndex = Math.floor(leftProgress);
      // Calculate the progress measured from the right edge of the slider
      // to control the right most slide's opacity.
      const rightProgress = (swiper.progress * multiplier) + containerWidth;
      const rightSlideIndex = Math.floor(rightProgress);

      if (typeof swiper.slides[leftSlideIndex] !== 'undefined') {
        const progress = leftProgress - leftSlideIndex;
        const opacity = 1 - ((1 - baseOpacity) * progress);
        swiper.slides[leftSlideIndex].style.opacity = opacity;
      }
      if (typeof swiper.slides[rightSlideIndex] !== 'undefined') {
        const progress = rightProgress - rightSlideIndex;
        // Calculate the right edge's "initial" progress (distance in % to the scrollable width)
        // from the left most edge of the slider.
        const initialProgress = (100 - delimeter) / delimeter;
        let opacity = baseOpacity;
        if (progress >= initialProgress) {
          // As long as we scroll past the initial progress, the right most slide's initial position
          // when the left most slide is "locked" in place on the left most edge, we calculate the
          // opacity by removing the initialProgress from the progress value and use that.
          opacity += (1 - baseOpacity) * ((progress - initialProgress) / (1 - initialProgress));
        }
        swiper.slides[rightSlideIndex].style.opacity = opacity;
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