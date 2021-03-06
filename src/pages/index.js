import './index.css';

const buttonMenuOne = document.querySelectorAll('.menu__link')[0];
const buttonMenuTwo = document.querySelectorAll('.menu__link')[1];
const buttonMenuThree = document.querySelectorAll('.menu__link')[2];

const slideContainer = document.querySelector(".slide-three");
const horizontalScroll = document.querySelector('.slide-three__range');

const footer = document.querySelector('.footer');

const iceCubeTopLeft = document.querySelector('.slide-two__ice_top-left');
const iceCubeTopRight = document.querySelector('.slide-two__ice_top-right');
const iceCubeBottomLeft = document.querySelector('.slide-two__ice_bottom-left');
const iceCubeBottomRight = document.querySelector('.slide-two__ice_bottom-right');
const titleTwo = document.querySelector('.slide-two__title');

// Плавный скролл 1-3 слайдов
const links = document.querySelectorAll('a[href^="#"]');
for (let link of links) {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const id = link.getAttribute("href");
    document.querySelector(id).scrollIntoView({behavior: "smooth", block: "start"});
  });
}

// Активация кнопки меню
function activeButtonMenu(position) {
  if (position < 400) {
    buttonMenuOne.classList.add('menu__link_active');
    buttonMenuTwo.classList.remove('menu__link_active');
    buttonMenuThree.classList.remove('menu__link_active');
  } else if (position > 1200) {
    buttonMenuOne.classList.remove('menu__link_active');
    buttonMenuTwo.classList.remove('menu__link_active');
    buttonMenuThree.classList.add('menu__link_active');
  } else {
    buttonMenuOne.classList.remove('menu__link_active');
    buttonMenuTwo.classList.add('menu__link_active');
    buttonMenuThree.classList.remove('menu__link_active');
  }
}

// Третий слайд начать с последнего
function scrollFromRight() {
  slideContainer.scrollLeft = slideContainer.scrollWidth;
}

// Активация о пролистывании
function scrollDownInfo() {
  window.scrollY < 850 ? footer.classList.add('footer_active') : footer.classList.remove('footer_active');
}

// Связь инпута и скролла по горизонтали
function onChangeInput(inputRange) {
  if (inputRange.value < 25) {
    slideContainer.scroll({left: 0, behavior: 'smooth'});
    inputRange.value = 1;
  } else if (inputRange.value >= 26 && inputRange.value <= 74) {
    slideContainer.scroll({left: 1024, behavior: 'smooth'});
    inputRange.value = 50;
  } else {
    slideContainer.scroll({left: 2048, behavior: 'smooth'});
    inputRange.value = 100;
  }
}

// Слежение за позицией слайда
function checkPosition(inputRange) {
  if (slideContainer.scrollLeft < 512) {
    inputRange.value = 1;
  } else if (slideContainer.scrollLeft > 1536) {
    inputRange.value = 100;
  } else {
    inputRange.value = 50;
  }
}

// Parallax
function parallaxScroll(){
  if (window.scrollY < 1450) {
    iceCubeTopLeft.style.transform = `translateY(${window.scrollY/10}px)`;
    iceCubeTopRight.style.transform = `translateY(${window.scrollY/25}px)`;
    iceCubeBottomLeft.style.transform = `translateY(${window.scrollY/15}px)`;
    iceCubeBottomRight.style.transform = `translateY(${window.scrollY/20}px)`;
    titleTwo.style.transform = `translateY(${window.scrollY/15}px)`;
  } else {
    iceCubeTopLeft.style.transform = `translateY(${0}px)`;
    iceCubeTopRight.style.transform = `translateY(${0}px)`;
    iceCubeBottomLeft.style.transform = `translateY(${0}px)`;
    iceCubeBottomRight.style.transform = `translateY(${0}px)`;    
    iceCubeBottomRight.style.transform = `translateY(${0}px)`;
  }
}

// Swipe Up/Down
function scrollDown(yPage) {
  if (yPage < 769) {
    return window.scroll({top: 769, behavior: 'smooth'});
  } else if (yPage > 768 && yPage < 1537) {
    return window.scroll({top: 1537, behavior: 'smooth'});
  } else {
    return 
  }
}

function scrollUp(yPage) {
  if (yPage > 1536 && yPage < 2100) {
    return window.scroll({top: 769, behavior: 'smooth'});
  } else 
  if (yPage > 768 && yPage < 1537) {
    return window.scroll({top: 0, behavior: 'smooth'});
  } else {
    return 
  }
}


let yDown = null;
 
function handleTouchStart(evt) {
  const firstTouch = evt.touches[0];
  yDown = firstTouch.clientY;
};
 
function handleTouchMove(evt) {
  if (!yDown) {
    return;
  }            
  const yPage = evt.touches[0].pageY;        
  const yUp = evt.touches[0].clientY;
  const yDiff = yDown - yUp;

  yDiff > 0 ? scrollDown(yPage) : scrollUp(yPage)                                                             

  yDown = null;                                             
};

window.addEventListener('touchstart', handleTouchStart, false);
window.addEventListener('touchmove', handleTouchMove, false);
horizontalScroll.addEventListener('change', () => onChangeInput(horizontalScroll));
slideContainer.addEventListener('scroll', () => checkPosition(horizontalScroll));
window.addEventListener('scroll', scrollDownInfo);
window.addEventListener('scroll', parallaxScroll);
window.addEventListener('scroll', () => activeButtonMenu(window.scrollY));
window.addEventListener('load', scrollFromRight);