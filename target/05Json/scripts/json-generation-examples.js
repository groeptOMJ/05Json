// The functions specific to these examples are in this file 
// (json-generation-examples.js). That is, the functions here refer
// to specific server-side URLs or client-side ids.
// The functions that are generic and reusable are in ajax-utils.js.

function cityTable1(address, inputField, resultRegion) {
  var data = "cityType=" + getValue(inputField);
  ajaxPost(address, data, 
           function(request) { 
             showCityInfo1(request, resultRegion); 
           });
}

// Data that arrives is JSON object with two properties:
//  - headings (an array of strings for the th elements)
//  - cities (an array of array of strings 
//            matching the heading names)

function showCityInfo1(request, resultRegion) {
  if ((request.readyState == 4) &&
      (request.status == 200)) {
    var rawData = request.responseText;
    var data = eval("(" + rawData + ")");
    var table = getTable(data.headings, data.cities);
    htmlInsert(resultRegion, table);
  }
}

function cityTable2(address, inputField, resultRegion) {
  var data = "cityType=" + getValue(inputField);
  ajaxPost(address, data, 
           function(request) { 
             showCityInfo2(request, resultRegion); 
           });
}

// Data that arrives is an array of city objects.
// City objects contain (among other things) 
// name, time, and population properties.

function showCityInfo2(request, resultRegion) {
  if ((request.readyState == 4) &&
      (request.status == 200)) {
    var rawData = request.responseText;
    var cities = eval("(" + rawData + ")");
    var headings = ["City", "Time", "Population"];
    var rows = new Array();
    for(var i=0; i<cities.length; i++) {
      var city = cities[i];
      rows[i] = [city.name, city.time, city.population];
    }
    var table = getTable(headings, rows);
    htmlInsert(resultRegion, table);
  }
}

function cityTypeList(address, resultRegion) {
  ajaxPost(address, null, 
           function(request) { 
             showCityTypeInfo(request, resultRegion); 
           });
}

// Data that arrives is an object where the
// properties are city categories and the
// associated values are arrays of city names.

function showCityTypeInfo(request, resultRegion) {
  if ((request.readyState == 4) &&
     (request.status == 200)) {
    var rawData = request.responseText;
    var cityTypes = eval("(" + rawData + ")");
    var headings = new Array();
    var row1Entries = new Array();
    var i = 0;
    for(var cityType in cityTypes) {
      headings[i] = cityType;
      row1Entries[i] = getBulletedList(cityTypes[cityType]);
      i++;
    }
    var rows = [row1Entries];
    var result = getTable(headings, rows);
    htmlInsert(resultRegion, result);
  }
}

function randomCityTable(address, resultRegion) {
  var data = "cityNames=" + 
             makeJsonString(getRandomCities());
  ajaxPost(address, data, 
           function(request) { 
             showCityInfo2(request, resultRegion); 
           });
}

var cityNames = 
  ["New York", "Los Angeles", "Chicago", "Houston",
   "Phoenix", "Philadelphia", "San Antonio", "San Diego",
   "Dallas", "San Jose", "Detroit", "Jacksonville", 
   "Indianapolis", "San Francisco", "Columbus", "Austin", 
   "Memphis", "Fort Worth", "Baltimore", "Charlotte", 
   "El Paso", "Milwaukeee", "Boston", "Seattle", 
   "Washington DC", "Denver", "Louisville", "Las Vegas", 
   "Nashville", "Oklahoma City", "Miami"];

function getRandomCities() {
  var randomCities = new Array();
  var j = 0;
  for(var i=0; i<cityNames.length; i++) {
    if(Math.random() < 0.25) {
      randomCities[j++] = cityNames[i];
    }
  }
  return(randomCities);
}


