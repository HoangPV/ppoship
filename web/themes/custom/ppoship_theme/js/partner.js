(function ($, Drupal) {

  'use strict';
 function doSlick(elm) {
   $(elm).slick({
     slidesToShow: 5,
     slidesToScroll: 2,
     centerMode: true,
     focusOnSelect: true
   });
 }

  Drupal.behaviors.myBehavior = {
    attach: function (context, settings) {
      once('myBehavior', '.view-block-partner .view-content', context).forEach(
        function (element) {
          doSlick(element);
        }
      );
    }
  }

}(jQuery, Drupal));
