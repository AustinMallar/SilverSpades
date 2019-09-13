import { TimelineMax, Expo } from "gsap";

const toggle = document.querySelector(".toggle");
const navLinks = Array.from(document.querySelectorAll(".nav-item"));
const menu = document.querySelector(".nav-list");
let menuOpen = false;
var t1 = new TimelineMax({ paused: true });
var t2 = new TimelineMax();

t2.from(".logo", 0.7, {
  opacity: 0
});

t2.from(".nav-list", 0.7, {
  opacity: 0
});

t2.from(".toggle", 1, {
  opacity: 0
});

t2.staggerFrom(
  ".social-icons i",
  1,
  {
    opacity: 0,
    x: -20,
    ease: Expo.easeInOut
  },
  0.3,
  "-=1"
);

if (window.innerWidth < 768) {
  t1.to(".nav-list", 1, {
    scaleY: 1,
    ease: Expo.easeIn,
    delay: 0.5
  });
  t1.staggerFrom(
    ".nav-item",
    1,
    { y: -200, opacity: 0, ease: Expo.easeOut },
    0.3
  );
}

// navLinks.forEach(link => {
//   link.style.transform = "translate(0)";
//   link.style.opacity = "1";
// });
// menu.style.transform = scaleY(0);

toggle.addEventListener("click", () => {
  if (menuOpen) {
    toggle.classList.remove("toggle-on");
    document.querySelector("body").style.overflow = "auto";
    t1.reverse();
    menuOpen = false;
  } else {
    toggle.classList.add("toggle-on");
    document.querySelector("body").style.overflow = "hidden";
    t1.play();
    menuOpen = true;
  }
});
window.addEventListener("resize");
