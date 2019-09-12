import { TweenMax, Power2, Power1, TimelineMax } from "gsap";

const toggle = document.querySelector(".toggle");
const navList = document.querySelector(".nav-list");

const entrance = () => {
  TweenMax.from(".logo", 1, {
    y: -30,
    opacity: 0,
    ease: Power1.easeInOut
  });

  TweenMax.staggerFrom(
    ".nav-item",
    1,
    {
      y: -30,
      opacity: 0,
      delay: 1,
      ease: Power2.easeIn
    },
    0.2
  );

  TweenMax.staggerFrom(
    ".social-icons i",
    1,
    {
      y: 30,
      opacity: 0,
      delay: 2,
      ease: Power2.easeIn
    },
    0.2
  );
};

toggle.addEventListener("click", () => {
  if (navList.classList.contains("open")) {
    navList.classList.remove("open");
    toggle.classList.remove("toggle-on");
    document.querySelector("body").style.overflow = "auto";
  } else {
    navList.classList.add("open");
    toggle.classList.add("toggle-on");
    document.querySelector("body").style.overflow = "hidden";
    TweenMax.staggerFrom(
      ".nav-item",
      1,
      {
        y: -30,
        opacity: 0,
        delay: 0.3,
        ease: Power2.easeIn
      },
      0.2
    );
  }
});

entrance();
