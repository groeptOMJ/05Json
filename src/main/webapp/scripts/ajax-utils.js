// Get the browser-specific request object, either for
// Internet Explorer 5 and 6 (top entry) or for Firefox,
// Safari, Opera, Mozilla, Netscape, or IE 7 (bottom entry).

function getRequestObject() {
  if (window.ActiveXObject) { 
    return(new ActiveXObject("Microsoft.XMLHTTP"));
  } else if (window.XMLHttpRequest) {
    return(new XMLHttpRequest());
  } else {
    return(null);
  }
}

// Insert the html data into the element 
// that has the specified id.

function htmlInsert(id, htmlData) {
  document.getElementById(id).innerHTML = htmlData;
}

// Return escaped value of textfield that has given id.
// The builtin "escape" function url-encodes characters.

function getValue(id) {
  return(escape(document.getElementById(id).value));
}

// Generalized version of ajaxResultPost. In this
// version, you pass in a response handler function
// instead of just a result region.

function ajaxPost(address, data, responseHandler) {
  var request = getRequestObject();
  request.onreadystatechange = 
    function() { responseHandler(request); };
  request.open("POST", address, true);
  request.setRequestHeader("Content-Type", 
                           "application/x-www-form-urlencoded");
  request.send(data);
}

// Takes as input an array (of strings) for headings 
// (to go into th elements) and an array-of-arrays 
// (of strings) for rows (to go into td elements).
// Builds an xhtml table from the data.

function getTable(headings, rows) {
  var table = "<table border='1' class='ajaxTable'>\n" +
              getTableHeadings(headings) +
              getTableBody(rows) +
              "</table>";
  return(table);
}

function getTableHeadings(headings) {
  var firstRow = "  <tr>";
  for(var i=0; i<headings.length; i++) {
    firstRow += "<th>" + headings[i] + "</th>";
  }
  firstRow += "</tr>\n";
  return(firstRow);
}

function getTableBody(rows) {
  var body = "";
  for(var i=0; i<rows.length; i++) {
    body += "  <tr>";
    var row = rows[i];
    for(var j=0; j<row.length; j++) {
      body += "<td>" + row[j] + "</td>";
    }
    body += "</tr>\n";
  }
  return(body);
}

// Takes an array of strings and produces a <ul>
// list with the strings inside the <li> elements.

function getBulletedList(listItems) {
  var list = "<ul>\n";
  for(var i=0; i<listItems.length; i++) {
    list = list + "  <li>" + listItems[i] + "</li>\n";
  }
  list = list + "</ul>"
  return(list);
}

// The JSON.stringify method comes from json2.js (from json.org).
// It builds a JSON-inside-a-String version of a JavaScript object.
// This method just calls escape on that result so that it can
// be sent in an HTTP request.

function makeJsonString(object) {
  return(escape(JSON.stringify(object)));
}