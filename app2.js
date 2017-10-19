'use strict';
//create an array of open store hours
var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

var allLocations = [];
//we need to define a variable that will be dynamic depending on how many cookies
var totalCookiesByHour = 0;
//totalTotal
var netTotal = 0;

function MakeLocation(name, minCustPerHour, maxCustPerHour, avgCookieSoldPerHour) {
  this.name = name;
  this.minCustPerHour = minCustPerHour;
  this.maxCustPerHour = maxCustPerHour;
  this.avgCookieSoldPerHour = avgCookieSoldPerHour;
  this.randCustByHour = [];
  this.cookiesSoldByHour = [];
  this.totalCookies = [];
  allLocations.push(this);
  //Method for random customer by hour
  this.calcRandCustByHour = function() {
    for(var i = 0; i < hours.length; i++) {
      this.randCustByHour.push(Math.floor(Math.random() * (this.maxCustPerHour - this.minCustPerHour + 1)) + this.minCustPerHour);
      console.log(this.randCustByHour[i]);
    }
  },
  //method for cookies sold by hours
  this.calcCookiesSoldByHour = function() {
    for(var j = 0; j < hours.length; j++) {
      this.cookiesSoldByHour.push(Math.round(this.avgCookieSoldPerHour * this.randCustByHour[j]));
      console.log(this.cookiesSoldByHour[j]);
    }
  },
  //Method for calculating total cookies
  this.calcTotalCookies = function() {
    var sum = 0;
    for(var l = 0; l < hours.length; l++) {
      sum += (this.randCustByHour[l] + this.cookiesSoldByHour[l]);
    }
    this.totalCookies.push(sum);
    console.log('Total: ' + sum);
  };
};

function makeStands() {
  new MakeLocation('First and Pike', 23, 65, 6.3);
  new MakeLocation('SeaTac Airport', 3, 24, 1.2);
  new MakeLocation('Seattle Center', 11, 38, 3.7);
  new MakeLocation('Capitol Hill', 30, 38, 2.3);
  new MakeLocation('Alki', 2, 16, 4.6);
  //make one for each store
};
makeStands();

//Makes Header row and inputs times
function makeHeaderRow(){
  //console.log('entered into make header row');
  var cookiestands = document.getElementById('cookiestands');
  var trEl = document.createElement('tr'); //creates table div.
  var tdEl = document.createElement('td');
  tdEl.textContent = 'Hours: ';
  trEl.appendChild(tdEl);
  for(var i = 0; i < hours.length; i++){
    //console.log(hours[i]);
    var thEl = document.createElement('th'); //creates top table row.
    thEl.textContent = hours[i];
    trEl.appendChild(thEl);
  }
  var tdEl = document.createElement('td');
  tdEl.textContent = 'Daily Totals ';
  trEl.appendChild(tdEl);
  cookiestands.appendChild(trEl);
}

makeHeaderRow();

//Makes store row
function makeStoresRow(index) {
  var cookiestands = document.getElementById('cookiestands');
  var trEl = document.createElement('tr'); //creates table div.
  trEl.textContent = allLocations[index].name;
  allLocations[index].calcRandCustByHour();
  allLocations[index].calcCookiesSoldByHour();
  allLocations[index].calcTotalCookies();
  for( var j = 0; j < hours.length; j++) {
    var tdEl = document.createElement('td');
    tdEl.textContent = allLocations[index].cookiesSoldByHour[j];
    trEl.appendChild(tdEl);
  }
  var tdEl = document.createElement('td');
  tdEl.textContent = allLocations[index].totalCookies;
  trEl.appendChild(tdEl);
  cookiestands.appendChild(trEl);
}
function generateAllStoresRow () {
  for( var k = 0; k < allLocations.length; k++) {
    makeStoresRow(k);
  }

}
generateAllStoresRow();

//Generates footer row and genertes total row data
function makesNetTotalrow(index) {
  var cookiestands = document.getElementById('cookiestands');
  var trEl = document.createElement('tr');
  tdEl.textContent = 'Totals: ';
  tdEl.appendChild(trEl);
  console.log(trEl);
  tdEl.textContent = this.totalCookies;
  allLocations[index].calcRandCustByHour();
  allLocations[index].calcCookiesSoldByHour();
  allLocations[index].calcTotalCookies();
  for( var l = 0; l < allLocations[index].length; l++) {
    var tdEl = documnet.createElement('td');
    tdEl.textContent = allLocations[index].totalCookies;
    trEl.appendChild(tdEl);
  }
  cookiestands.appendChild(trEl);
}
makesNetTotalrow();
