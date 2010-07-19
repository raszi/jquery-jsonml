JsonML extension to jQuery library
==================================

This script extends the jQuery library with ability to create DOM tree from
JsonML array format.

Usage
-----

<code>
$.jsonml(JSON.parse('["span", { "class" : "code-example-third" }, "Third"]')).abbendTo(document.body);
</code>

You can also use this method to create DOM tree in a different document:

<code>
$.jsonml(JSON.parse('["span", { "style" : "background-color:maroon" }, "\u00A9"]', otherDoc)).abbendTo(otherDoc.body);
</code>
