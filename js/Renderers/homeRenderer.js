import Highway from "@dogstudio/highway";
import { TimelineMax, Expo, TweenLite } from "gsap";
import $ from "jquery";

function checkLoad() {
  const video = document.querySelector("#video-bg");
  const heroLogo = document.querySelector("#hero-logo");
  const heroHeadline = document.querySelector("#hero-headline");

  if (video.readyState === 4) {
    var t0 = new TimelineMax();
    t0.to(heroLogo, 0.6, {
      opacity: 1,
      y: -50,
      ease: Expo.easeOut
    }).to(heroHeadline, 0.5, {
      opacity: 1,
      y: -30,
      ease: Expo.easeOut,
      delay: +0.5
    });
  } else {
    setTimeout(checkLoad, 100);
  }
}

class HomeRenderer extends Highway.Renderer {
  onEnter() {
    window.addEventListener(
      "load",
      function() {
        checkLoad();
      },
      false
    );

    $(document).ready(function() {
      /* Toggle Video Modal
        -----------------------------------------*/
      function toggle_video_modal() {
        // Click on video thumbnail or link
        $(".js-trigger-video-modal").on("click", function(e) {
          // prevent default behavior for a-tags, button tags, etc.
          e.preventDefault();

          // Grab the video ID from the element clicked
          var id = $(this).attr("data-youtube-id");

          // Autoplay when the modal appears
          // Note: this is intetnionally disabled on most mobile devices
          // If critical on mobile, then some alternate method is needed
          var autoplay = "?autoplay=1";

          // Don't show the 'Related Videos' view when the video ends
          var related_no = "&rel=0";

          // String the ID and param variables together
          var src = "//www.youtube.com/embed/" + id + autoplay + related_no;

          // Pass the YouTube video ID into the iframe template...
          // Set the source on the iframe to match the video ID
          $("#youtube").attr("src", src);

          // Add class to the body to visually reveal the modal
          $("body").addClass("show-video-modal noscroll");
        });

        // Close and Reset the Video Modal
        function close_video_modal() {
          event.preventDefault();

          // re-hide the video modal
          $("body").removeClass("show-video-modal noscroll");

          // reset the source attribute for the iframe template, kills the video
          $("#youtube").attr("src", "");
        }
        // if the 'close' button/element, or the overlay are clicked
        $("body").on(
          "click",
          ".close-video-modal, .video-modal .overlay",
          function(event) {
            // call the close and reset function
            close_video_modal();
          }
        );
        // if the ESC key is tapped
        $("body").keyup(function(e) {
          // ESC key maps to keycode `27`
          if (e.keyCode == 27) {
            // call the close and reset function
            close_video_modal();
          }
        });
      }
      toggle_video_modal();
    });
  }
  onLeave() {
    window.removeEventListener("load", checkLoad);
  }
  onEnterCompleted() {
    var socialIconTL = new TimelineMax();
    socialIconTL.staggerFromTo(
      ".social-icons i",
      1,
      {
        opacity: 0,
        x: -20,
        ease: Expo.easeInOut
      },
      {
        opacity: 1,
        x: 0,
        delay: 0.5
      },
      0.3
    );

    // function fadeInHeading() {
    //   let options = {
    //     root: null,
    //     rootMargin: "0px",
    //     threshold: 1.0
    //   };
    //   let callback = (entries, observer) => {
    //     entries.forEach(entry => {
    //       if (entry.intersectionRatio > 0.9) {
    //         TweenLite.fromTo(
    //           ".main-heading",
    //           1,
    //           { autoAlpha: 0, y: -20 },
    //           { autoAlpha: 1, y: 0 }
    //         );
    //         observer.unobserve(entry.target);
    //       }
    //     });
    //   };
    //   let observer = new IntersectionObserver(callback, options);
    //   let target = document.querySelector("#home-intro");
    //   observer.observe(target);
    // }
    // fadeInHeading();
  }
  onLeaveCompleted() {}
}

export default HomeRenderer;
