/*
Created on: 6/1/17
Revised on: 12/31/17
Name: astonish.js
By: Jesus Rodriguez
Description: A light and simple framework to reveal animations from the
animate.css library or any similiar animation library.
*/

/* This javascript file can take the following data attribues from html code: data-animation, data-delay and data-duration. 'data-animation' is required in order to assign an animation from the animate.css library. The data-delay controls the delay of the animation for when the next one will play and the data-duration controls for how long the animation will play for. It is important to note that for this to work, the elements must be hidden in the html code first. This is accomplished by setting the .astonish class with an opacity of 0, once the element is in view, the .animated css class must have an opacity of 1 in order for the animation to be seamless. Visibility can also be used instead, in the end it all depends on user preference. On Another note, these animations cannot be triggered on mobile, but this framework can be easily cusomized to allow that if that is what you want. */

/**
 * Debounce function to prevent constant triggering of the astonish function by the scroll event
 *
 * Takes a function
 *
 * @param  Function  | any | The function you want to run
 * @param  Wait      | time | The time before the function you want to tirgger will trigger
 * @param  Immediate | boolean | Whether the trigger should be immediate
 * @return Null | Does not return a value
 */
//
const debounce = (func, wait = 70, immediate = false) => {
     let timeout;

     return function() {
          let context = this, 
              args = arguments;

          let later = () => {
               timeout = null;
               if(immediate) func.apply(context, args);
          };

          let callNow = !immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if(callNow) func.apply(context, args);
     };
};

/**
 * Function checks if the object is in the window view
 *
 * @param  Object    | element | The element you are checking for
 * @param  Distance  | Number | The distance that divides when the object will trigger
 * @return Boolean   | Whether the object is or is not visible on the window
 */
//
const checkIfInView = (object, distance) => {

     let objectProperty = object.getBoundingClientRect(),
         inView = (window.scrollY + window.innerHeight) - objectProperty.height / distance,
         objectTop = objectProperty.top + (window.scrollY - document.documentElement.clientTop),
         objectBottom = objectTop + objectProperty.height,
         isHalfShown = inView > objectTop,
         isNotScrolledPast = window.scrollY < objectBottom;

     return isHalfShown && isNotScrolledPast ? true : false;
};

// Returns with a list of nodes that have the astonish class
const elements = document.querySelectorAll('.astonish');

/**
 * Function responsible for adding and removing the animation classes
 *
 * Takes no parameters
 *
 * @return Null | Does not return a value
 */
//
const astonish = () => {

     // Trigger only on desktop
     if(window.innerWidth > 768) {

          // For each element in the node list, do the following
          elements.forEach(element => {
               let animation = element.dataset.animation,
                   delay,
                   duration,
                   distanceFromWindow = 2;

               // Get the delay of the animation if it exists
               if(element.dataset.delay) {
                    delay = element.dataset.delay;
               } else {
                    delay = 0; // No delay
               }

               // Get the duration of the animation if it exists
               if(element.dataset.duration) {
                    duration = element.dataset.duration;
               } else {
                    duration = 1; // Default duration
               }

               if(checkIfInView(element, distanceFromWindow)) {
                    // If one or both have been set, display animation according to those user defined values
                    if (delay > 0 || duration > 1) {
                        window.setTimeout(() => {
                            element.style.animationDuration = `${duration}s`;
                            element.classList.add('animated', animation);
                        }, delay * 1000);
                    } else {
                        // If not defined, the default animate.css will take over with default duration
                        element.classList.add('animated', animation);
                    }
               } else {
                    // When not in view, then remove the class
                    element.classList.remove('animated', animation);
               }
          });
     }
};

/* Scroll event calls the debounce function which limits the amoun of times the
astonish function is called */
window.addEventListener('scroll', debounce(astonish));
