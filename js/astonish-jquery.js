// jQuery Version
function astonish() {
     $(".astonish").each(function () {
          let $this = $(this);
          let animation = $this.data('animation');

          // Halfway through the element
         let inView = (window.scrollY + window.innerHeight) - $this.outerHeight() / 2;

         // Half of the element
         let objectBottom = $this.offset().top + $this.outerHeight();
         let isHalfShown = inView > $this.offset().top;
         let isNotScrolledPast = window.scrollY < objectBottom;

         if(isHalfShown && isNotScrolledPast) {
              $this.addClass('animated ' + animation);
         } else {
              $this.removeClass('animated ' + animation);
         }
     });
}
