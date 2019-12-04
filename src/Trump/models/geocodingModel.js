//const fetch = require("node-fetch");
const latinaze = require('latinize');

/*
url1 = 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAbTVkLhqJehw5gzZp5qscY_8Yt6ezBXTk';
url2 = 'https://maps.googleapis.com/maps/api/geocode/json?address=+Mountain+View,+CA&key=AIzaSyAbTVkLhqJehw5gzZp5qscY_8Yt6ezBXTk';
function getCoordinates1(url) {
  fetch(url).then( (res) => res.json()).then( (data) => 
  { console.log(data); });
}

function getCoordinates(name) {
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=AIzaSyAbTVkLhqJehw5gzZp5qscY_8Yt6ezBXTk`).then( (res) => res.json()).then( (data) => 
  { 
    let coors = ''
    // console.log(data);
    console.log(data.results[0].geometry.location);
    //coors += data.results[0].geometry.location;
  });
}
*/

const name1 = "Mountain View CA";
const name2 = "Wrocław";

function getCoordinates1(name) {
  locObj =  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=AIzaSyAbTVkLhqJehw5gzZp5qscY_8Yt6ezBXTk`).then( (res) => res.json()).then( (data) => 
  { 
    console.log(data.results[0].geometry.location);
    return data.results[0].geometry.location;
  }).then((res) => res);
  }

let coordinates1 = getCoordinates1(latinaze(name2));
console.log(coordinates1);

/*
async function getCoordinates2(name) {
  locObj =  await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=AIzaSyAbTVkLhqJehw5gzZp5qscY_8Yt6ezBXTk`).then( (res) => res.json()).then( (data) => 
  { 
    console.log(data.results[0].geometry.location);
    //return data.results[0].geometry.location;
  }).then((res) => res);
  return locObj
  }

let coordinates2 = getCoordinates2(latinaze(name2));
console.log(coordinates2);
*/
