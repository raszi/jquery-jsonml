QUnit.module("jQuery-JsonML");

QUnit.test("Bulleted List", function() {

  var JsonML = [ "ul", [ "li", { "style" : "color:red" }, "First Item" ], [ "li", { "title" : "Some hover text.", "style" : "color:green" }, "Second Item" ], [ "li", [ "span", { "class" : "code-example-third" }, "Third" ], " Item" ] ];

  var $c = $("#content").empty();

  $.jsonml(JsonML).appendTo($c);

  var $ul = $("ul", $c),
    $li = $("li", $ul);

  QUnit.equal($ul.length, 1, "UL count must be 1");
  QUnit.equal($li.length, 3, "LI count must be 3");

  // content check
  QUnit.equal($li.eq(0).text(), "First Item");
  QUnit.equal($li.eq(1).text(), "Second Item");
  QUnit.equal($li.eq(2).text(), "Third Item");

  // style check
  QUnit.ok($li.eq(0).css("color"), "Should have color");
  QUnit.ok($li.eq(1).css("color"), "Should have color");

  // attribute check
  QUnit.equal($li.eq(1).attr("title"), "Some hover text.", "Should include the attribute");

  // class check
  var $span = $("span", $li.eq(2));
  QUnit.equal($span.length, 1, "The third <li/> should include a span");
  QUnit.ok($span.hasClass("code-example-third"), "Should include the class");
});

QUnit.test("Colorful Table", function() {

	var JsonML = [ "table", { "class" : "MyTable", "style" : "background-color:yellow" }, [ "tr", [ "td", { "class" : "MyTD", "style" : "border:1px solid black" }, "#550758" ], [ "td", { "class" : "MyTD", "style" : "background-color:red" }, "Example text here" ] ], [ "tr", [ "td", { "class" : "MyTD", "style" : "border:1px solid black" }, "#993101" ], [ "td", { "class" : "MyTD", "style" : "background-color:green" }, "127624015" ] ], [ "tr", [ "td", { "class" : "MyTD", "style" : "border:1px solid black" }, "#E33D87" ], [ "td", { "class" : "MyTD", "style" : "background-color:blue" }, "\u00A0", [ "span", { "style" : "background-color:maroon" }, "\u00A9" ], "\u00A0" ] ] ];

	var $c = $("#content").empty();

	$.jsonml(JsonML).appendTo($c);

  // <table> check
  var $table = $("table", $c);
  QUnit.equal($table.length, 1, "TABLE item count must be 1");

  // <tr> check
  var $tr = $("tr", $table);
  QUnit.equal($tr.length, 3, "TR item count must be 3");

  // <td> check
  var $td = $("td", $tr);
  QUnit.equal($td.length, 6, "TD item count must be 6");

  for (var i = 0; i < 6; i++) {
    QUnit.ok($td.hasClass("MyTD"), "TD " + i + " class");
  }

  // the white-space is hardly checkable in IE
  var texts = [
    "#550758", "Example text here",
    "#993101", "127624015",
    "#E33D87"
  ];

  $.each(texts, function( i, value ) {
    QUnit.equal($td.eq(i).text(), value, "TD " + i + " content");
  });

  QUnit.ok($table.hasClass("MyTable"), "TABLE class");

  // background check is problematic in opera and firefox
  //if (!($.browser.opera || $.browser.mozilla)) {
  QUnit.ok($table.css("background-color"), "TABLE background color");

  var colorCheck = {
    "1": "red",
    "3": "green",
    "5": "blue"
  };

  $.each(colorCheck, function( no, bgColor ) {
    QUnit.ok($td.eq(Number(no)).css("background-color"), "TD " + no + " background color");
  });
});

QUnit.test("Script eval", function() {
  window.foobar = 0;
  var JsonML = [ "script", { "type": "text/javascript" }, "window.foobar = 1;" ];

  var $c = $("#content").empty();

  $.jsonml(JsonML).appendTo($c);

  QUnit.equal(window.foobar, 1, "Script should be evaluated");
});

// vim: ai ts=2 sw=2 et:
