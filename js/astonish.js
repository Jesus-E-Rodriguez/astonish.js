/*
Created on: 6/1/17
Revised on: 6/25/17
Name: astonish.js
By: Jesus Rodriguez
Description: A light and simple framework to reveal animations from the
animate.css library.
*/

/* This jQuery file can take the following data attribues from html code: data-animation, data-delaya and data-duration. 'data-animation' is required in order to assign an animation from the animate.css library. The data-delay controls the delay of the animation for when the next one will play and the data-duration controls for how long the animation will play for. It is important to note that for this to work, the elements must be hidden in the html code first. This is accomplished by setting the .astonish class with an opacity of 0, once the element is in view, the .animated must have an opacity of 1 in order for the animation to be seamless. Hidden and visible, visibility can also be used, in the end it all depends on user preference. It is important to not that the padding_top variable is not perfect, it may have to be adjusted on certain desktop sizes in order to trigger the removal of the animted class sooner. As anoter note these animations cannot be triggered on mobile, but this framework can be easily cusomized to allow that. */

// When the document is ready, the follwing will run
$(function () {
     var $window = $(window); // Cache the window

     $window .scroll(function () {
          // A timer can be used to limit the amount of times astonish fires
          astonish();
     });

    // Function that determines if a particular object is in view when scrolling down
    function objectIsInView(object, padding_top) {
         var window_top = $window.scrollTop(), // Top of the screen
             window_bottom = $window.height() * padding_top + window_top, /* Bottom of screen with a little of padding from the window's height the padding_top
                                                                     controls the amount of padding and can be re-adjusted to trigger animations at a higher or lower
                                                                     window scroll position. */
             $this = object, // In this instance $this refers to any object being passed in
             object_top = $this.offset().top, // The top part of any object
             object_bottom = $this.outerHeight() + object_top; // Bottom part of any object

        if ((window_bottom > object_top) && (window_top < object_bottom)) {
             return true;
        }
        return false; // Return false for all other cases
    }

    // Function that determines if a user has scrolled down enough past elements
    function windowScrolledDown(object, padding_top) {
         var $this = object, // In this instance $this refers to any object being passed in
              object_top = $this.offset().top, // The top of the obejct
              object_bottom = $this.outerHeight() + object_top, // The bottom of the object
              window_top = $window.scrollTop(), // Top of the screen
              window_position = $window.height() * padding_top + window_top; // In order to trigger the removal and retrigger earlier when scrolling back up*/

         if ((window_position < object_top) || (window_position > object_bottom + object_top)) {
              return true;
         }
         return false; // Return false for all other cases
    }

    // Function that is responsible for revealing and hiding objects as necessary
    function astonish() {
        /* If the window width is less than 748 than it is most likely a mobile device and
        animations are turned off for better mobile performance. This if statement can be removed
		  if animations are preffered to be triggered on all sizes. */
        if ($window.width() > 748) {

            /* Will look for all elements that do not have the
            animated class and cycle through each one as if it were a for loop */
            $(".astonish:not(.animated)").each(function () {
                    var $this = $(this),
                    animation = $this.data("animation"); /* Gets the data-animation taget attribute from html regarding the type of animation
                                                            that is going to be played. This variable is later inserted alongside the 'animated'
                                                            class in order for the animation to play. */
                // if the objects are in the window's view not necessarily visible, run the following
                if (objectIsInView($this, 0.8)) {
                     // Declaring variables
                     var delay,
                         animationDuration;
                     // Get the data-delay attribute, if not present a default will be given
                     if (typeof $this.data("delay") !== 'undefined') {
                         delay = $this.data("delay");
                     } else {
                         delay = 0; // Default delay
                     }
                     // Get the data-duration attribute, if not present a default will be given
                     if (typeof $this.data("duration") !== 'undefined') {
                         animationDuration = $this.data("duration");
                     } else {
                         animationDuration = 1; // Default duration
                     }
                     // If one or both have been set, display animation according to those user defined values
                     if (delay > 0 || animationDuration > 0) {
                         window.setTimeout(function () {
                             $this.css({
                                 "moz-animation-duration": animationDuration + 's',
                                 "webkit-animation-duration": animationDuration + 's',
                                 "animation-duration": animationDuration + 's'
                             });
                             /* In order for the animate.css to work an element must have the 'animated class and the name of the animation class. The animation attribute is being passed in from the html code allowing this to function dynamically without explicitly stating it in this code */
                             $this.addClass('animated ' + animation);
                         }, delay * 1000);
                     } else {
                         // If not defined, the default animate.css will take over with default delay and duration
                         $this.addClass('animated ' + animation);
                     }
                }
            });

            /* This will iterate over all elements that already have the 'animated' class present and will remove it from them. This is necessary because once an element has been animated once it will not animate again unless the class is first removed and then re-added. */
            $(".astonish.animated").each(function () {
                var $this = $(this), // $this referring to any object with the animated class */
                    animation = $this.data('animation'); // The object's animation

                    // If the window has scrolled past the elements with the animated class, then remove that class and animation name
                    if (windowScrolledDown($this, 2.5)) {
                         $this.removeClass('animated ' + animation);
                    }
            });
        }
    }
});
