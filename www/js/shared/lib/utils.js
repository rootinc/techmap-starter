/*
* @author Dan Jewett
* @changes - added alert system for errors
* @version 1.08
* 
* @author Dan Jewett
* @changes - fixed bug to add console object as a global
* @version 1.07
* 
* @author Dan Jewett
* @changes - added randomize for jquery
* @version 1.06
* 
* @author Dan Jewett
* @changes - added pad
* @version 1.05
* 
* @author Dan Jewett
* @changes - fixed bug for images loaded if there are no images.
* @version 1.04
* 
* @author Dan Jewett
* @changes - added distance function
* @version 1.03

* @author Dan Jewett
* @changes - fixed bug in preload images
* @version 1.02
  *
* @author Dan Jewett
* @changes - added overlaps object to check for collisions (borrowed from stackoverflow)
* @version 1.01
*
* @author Dan Jewett (and borrowed from others (stackoverflow))
* @version 1.0
*/
String.toBool = function(string){ //takes a bool string and converts it into a boolean
  if (!string) return false;
  switch(string.toLowerCase()){
  case "true": case "yes": case "1": return true;
  case "false": case "no": case "0": case null: return false;
  default: return Boolean(string);
  }
};

//Polyfill for IE < 9 with no ES5.1 support
if(!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g,'');
  };
}

Array.prototype.shuffle = function() {
  var i = this.length, j, temp;
  if ( i === 0 ) return this;
  while ( --i ) {
    j = Math.floor( Math.random() * ( i + 1 ) );
    temp = this[i];
    this[i] = this[j];
    this[j] = temp;
  }
  return this;
};

$.fn.justText = function() { //returns just the text of a node
  return $(this).clone()
  .children()
  .remove()
  .end()
  .text();
};

$.fn.randomize = function(selector){
  (selector ? this.find(selector) : this).parent().each(function(){
    $(this).children(selector).sort(function(){
      return Math.random() - 0.5;
    }).detach().appendTo(this);
  });

  return this;
};

var Utils = {};

Utils.compare = function (arrayA, arrayB){ //compares two arrays and checks to see if they are identical
  if (arrayA.length !== arrayB.length) { return false; }
  // sort modifies original array
  // (which are passed by reference to our method!)
  // so clone the arrays before sorting
  var a = $.extend(true, [], arrayA);
  var b = $.extend(true, [], arrayB);
  a.sort(); 
  b.sort();
  for (var i = 0, l = a.length; i < l; i++) {
    if (a[i] !== b[i]) { 
      return false;
    }
  }
  return true;
};

Utils.pad = function(str,pStr){
  var len = (''+pStr).length;
  if ((''+str).length < len)
  {
    return String(pStr+str).slice(-len);
  }
  else
  {
    return str;
  }
};

Utils.determineNamespace = function()
{
  var pathname = location.pathname;
  pathname = pathname.toLowerCase(); //account for case sensitivity

  var htmlIndex = pathname.indexOf('html'); //this is hardcoded
  var flashIndex = pathname.indexOf('flash'); //this is hardcoded
  var length = pathname.length;

  var index = htmlIndex > -1 ? htmlIndex : flashIndex > -1 ? flashIndex : length;

  return pathname.substr(0,index);
};

//checks overlaps (from stack overflow: http://stackoverflow.com/questions/4230029/jquery-javascript-collision-detection)
var overlaps = (function () {
  function getPositions( elem ) {
    var pos, width, height;
    pos = $( elem ).offset(); //parse whole dom (per comment by steven lu)
    width = $( elem ).outerWidth();
    height = $( elem ).outerHeight();
    return [ [ pos.left, pos.left + width ], [ pos.top, pos.top + height ] ];
  }

  function comparePositions( p1, p2 ) {
    var r1, r2;
    r1 = p1[0] < p2[0] ? p1 : p2;
    r2 = p1[0] < p2[0] ? p2 : p1;
    return r1[1] > r2[0] || r1[0] === r2[0];
  }

  return function ( a, b ) {
    var pos1 = getPositions( a ),
    pos2 = getPositions( b );
    return comparePositions( pos1[0], pos2[0] ) && comparePositions( pos1[1], pos2[1] );
  };
})();

var distance = function(a,b){
  var o1 = $(a).offset();
  var o2 = $(b).offset();
  var dx = o1.left - o2.left;
  var dy = o1.top - o2.top;
  return Math.sqrt(dx * dx + dy * dy);
};

function Timer(init, precision) { //creates a timer, percision is the ticker
  var start = new Date(init || null).valueOf();
  var time = start;

  precision = precision || 100;

  setInterval(function () { time += precision; }, precision);

  this.elapsed = function() { return time - start; };
  this.getDate = function() { return new Date(time); };
}

var $_GET = {};
$.each(location.search.substr(1).split("&"),function(index,item){
  if (item === "") return true;
  
  var split = item.split("=");
  $_GET[split[0]] = split[1];
});

//if console doesn't exist
if (!window.console)
{ 
  var alrt = function(){};
  
  //make console obj
  window.console = {
    log: alrt,
    warn: alrt,
    error: alrt
  };
  
  console = window.console;
}

if (String.toBool($_GET['alert']))
{
  var alrt = function(){
    var str="";
    for (var i=0;i<arguments.length;i++)
    {
      str += ""+arguments[i]+"\n";
    }
    alert(str);
  };
  
  //override console obj
  window.console = {
    log: alrt,
    warn: alrt,
    error: alrt
  };
  
  console = window.console;
  
  window.onerror = function(msg, url, lineNumber) {
    console.error("An error has occurred. Please send this to the developers.",msg,url,lineNumber);
    return true;
  };
}