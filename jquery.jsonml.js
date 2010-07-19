/*jslint browser: true */
/*global goa3jQuery */

/**
 * This script is extending the jQuery library to handle JsonML array format.
 *
 * Documentation of the format can be found at: <http://jsonml.org/>
 *
 * Author: KARASZI Istvan <github@spam.raszi.hu>
 * License: LGPL
 *
 */
(function( $ ) {
  /**
   * Creates a DOM tree from a JsonML object in the provided document.
   *
   * @param jsonML
   *    the JsonML in array format
   * @param ownerDoc
   *    the optional document
   * @return the jQuery object
   */
  $.jsonml = function( jsonML, ownerDoc ) {
    if (typeof ownerDoc == "undefined") {
      ownerDoc = document;
    }

    if (typeof jsonML == "string") {
      return $(ownerDoc.createTextNode(jsonML));
    }

    if ($.isArray(jsonML)) {
      var length = jsonML.length;

      if (length >= 1 && typeof jsonML[0] == "string") {
        var $item = $(ownerDoc.createElement(jsonML[0]));

        if (length == 1) {
          return $item;
        }

        var start = 1;

        /* add attributes */
        if ($.isPlainObject(jsonML[1])) {
          $item.attr(jsonML[1]);

          if (length == 2) {
            return $item;
          }

          start++;
        }

        for (var i = start; i < length; i++) {
          $.jsonml(jsonML[i], ownerDoc).appendTo($item);
        }

        return $item;
      }
    }

    throw "Invalid JsonML format: " + jsonML;
  };
})(jQuery);

// vim: set ai ts=2 sw=2 et: