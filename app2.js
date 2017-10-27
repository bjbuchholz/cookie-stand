'use strict';
//create an array of open store hours
var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

var allLocations = [];
//we need to define a variable that will be dynamic depending on how many cookies
var totalCookiesByHour = 0;
//totalTotal
var netTotal = 0;
//constructor function
function MakeLocation(name, minCustPerHour, maxCustPerHour, avgCookieSoldPerHour) {
  this.name = name; //parameter of the object
  this.minCustPerHour = minCustPerHour;
  this.maxCustPerHour = maxCustPerHour;
  this.avgCookieSoldPerHour = avgCookieSoldPerHour;
  this.randCustByHour = [];
  this.cookiesSoldByHour = [];
  this.totalCookies = 0;
  allLocations.push(this);

  //Method for random customer by hour
  this.calcRandCustByHour = function() {
    for(var i = 0; i < hours.length; i++) {
      this.randCustByHour.push(Math.floor(Math.random() * (this.maxCustPerHour - this.minCustPerHour + 1)) + this.minCustPerHour);
    }
  },
  //method for cookies sold by hours
  this.calcCookiesSoldByHour = function() {
    for(var j = 0; j < hours.length; j++) {
      this.cookiesSoldByHour.push(Math.round(this.avgCookieSoldPerHour * this.randCustByHour[j]));
    }
  },
  //Method for calculating total cookies
  this.calcTotalCookies = function() {
    var sum = 0;
    for(var l = 0; l < hours.length; l++) {
      sum += (this.cookiesSoldByHour[l]);
    }
    this.totalCookies = sum;//pushes up to the constructor function
    // console.log('Total: ' + sum);
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
  var cookiestands = document.getElementById('cookiestands');
  var trEl = document.createElement('tr'); //creates table div.
  var tdEl = document.createElement('td');
  tdEl.textContent = 'Hours: ';
  trEl.appendChild(tdEl);
  for(var i = 0; i < hours.length; i++){
    var thEl = document.createElement('th'); //creates top table row.
    thEl.textContent = hours[i];
    trEl.appendChild(thEl);
  }
  var thEL = document.createElement('th');
  thEL.textContent = 'Daily Totals ';
  trEl.appendChild(thEL);
  cookiestands.appendChild(trEl);
}

makeHeaderRow();

//Makes store row
function makeStoresRow(k) {
  var cookiestands = document.getElementById('cookiestands');
  var trEl = document.createElement('tr'); //creates table div.
  trEl.textContent = allLocations[k].name;
  allLocations[k].calcRandCustByHour();
  allLocations[k].calcCookiesSoldByHour();
  allLocations[k].calcTotalCookies();
  for( var j = 0; j < hours.length; j++) {
    var tdEl = document.createElement('td');
    tdEl.textContent = allLocations[k].cookiesSoldByHour[j];
    trEl.appendChild(tdEl);
  }
  var tdEl = document.createElement('td');
  tdEl.textContent = allLocations[k].totalCookies;
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
function makesNetTotalRow() {
  var cookiestands = document.getElementById('cookiestands');
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  trEl.setAttribute('id','total');// gives created row an ID.
  tdEl.textContent = 'Total: ';
  trEl.appendChild(tdEl);

  for( var l = 0; l < hours.length; l++) {
    var totalCookiesPerHour = 0;
    var tdEl = document.createElement('td');
    for(var m = 0; m < allLocations.length; m++) {
      totalCookiesPerHour += allLocations[m].cookiesSoldByHour[l];
    }

    tdEl = document.createElement('td');
    tdEl.textContent = totalCookiesPerHour;
    trEl.appendChild(tdEl);
    netTotal += totalCookiesPerHour;
    cookiestands.appendChild(trEl);
  }
  tdEl = document.createElement('td');
  tdEl.textContent = netTotal;
  trEl.appendChild(tdEl);
}

makesNetTotalRow();

//form listener for adding new stores.
document.getElementById('newstore').addEventListener('click', function() {
  var elem = document.getElementById('total');//part one of deleting the total row
  elem.parentElement.removeChild(elem);//part Two of deleting the total row

  event.preventDefault(); //prevents page reload
  var newStoreName = document.getElementById('storename').value;
  var newStoreMin = document.getElementById('mincust').value;
  var newStoreMax = document.getElementById('maxcust').value;
  var newStoreAvg = document.getElementById('avgcook').value;

  var newStore = new MakeLocation(newStoreName, parseInt(newStoreMin), parseInt(newStoreMax), parseInt(newStoreAvg));

  newStore.calcRandCustByHour();
  newStore.calcCookiesSoldByHour();
  newStore.calcTotalCookies();

  function makeNewStoresRow() {
    var cookiestands = document.getElementById('cookiestands');
    var trEl = document.createElement('tr'); //creates table div.
    trEl.textContent = newStore.name;

    for( var j = 0; j < hours.length; j++) {
      var tdEl = document.createElement('td');
      tdEl.textContent = newStore.cookiesSoldByHour[j];
      trEl.appendChild(tdEl);
    }
    var tdEl = document.createElement('td');
    tdEl.textContent = newStore.totalCookies;
    trEl.appendChild(tdEl);
    cookiestands.appendChild(trEl);
  }
  makeNewStoresRow();//makes new store row and populates information
  makesNetTotalRow();//remakes bottom totals row once new store from the form is completed.
});
