import { TimelineMax, Expo } from "gsap";
import Highway from "@dogstudio/highway";

import Fade from "./fade.js";

const toggle = document.querySelector(".toggle");
const links = document.querySelectorAll(".nav-item a");
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

//Timeline for mobile nav menu
if (window.innerWidth < 768) {
  t1.to(".nav-list", 1, {
    scaleY: 1,
    ease: Expo.easeIn,
    delay: 0.5
  });
  t1.staggerFrom(
    ".nav-item",
    0.5,
    { x: -200, opacity: 0, ease: Expo.easeOut },
    0.3
  );
}

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

// Call Highway.Core once.
const H = new Highway.Core({
  transitions: {
    default: Fade
  }
});

// Listen the `NAVIGATE_IN` event
// This event is sent everytime a `data-router-view` is added to the DOM Tree
H.on("NAVIGATE_IN", ({ to, location }) => {
  // Check Active Link
  for (let i = 0; i < links.length; i++) {
    const link = links[i];

    // Clean class
    link.classList.remove("active");

    // Active link
    if (link.href === location.href) {
      link.classList.add("active");
    }
  }

  t1.reverse();
  menuOpen = false;
  toggle.classList.remove("toggle-on");
});
