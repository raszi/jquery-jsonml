/*jslint browser: true */
/*global jQuery */

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
   * <p>
   * Documentation of the format can be found at: <a href="http://jsonml.org/">jsonml.org</a>.
   *
   * @example $.jsonml( [ "span", { "class" : "code-example-third" }, "Third" ] )
   *
   * @param {Array} jsonML
   *    the JsonML in array format
   * @param {Object} ownerDoc
   *    the owner document
   * @return {Object} the jQuery object
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

        var
          item = $item.get(0),
          scriptEval = $item.is("script") && !$.support.scriptEval(),
          ieObject = $.browser.msie && $item.is("object");

        for (var i = start; i < length; i++) {
          try {
            if (scriptEval && typeof jsonML[i] == "string") {
              item.text = jsonML[i];
              continue;
            }

            var $node = $.jsonml(jsonML[i], ownerDoc);

            if (ieObject) {
              var object = $item.get(0);
              object.innerHTML = object.innerHTML + $node.get(0).outerHTML;
            } else {
              $node.appendTo($item);
            }
          } catch (e) {
            throw "Could not insert " + $node.get(0).nodeName + " to " + $item.get(0).nodeName + ": " + e;
          }
        }

        return $item;
      }
    }

    throw "Invalid JsonML format: " + jsonML;
  };
})(jQuery);

// vim: set ai ts=2 sw=2 et:
