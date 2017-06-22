/**
Base class for all DOM related functions
@class DOM
@extends Class
@author Dan Jewett
@version 1.1
@constructor
@added Support for Ned
@fixes Fixed bug in setDataLang ($(data).text())
*/
var DOM = Class.extend({
  init:function(){}
});

/**
Walks the dom starting at node
@static
@method jWalk
@param {Element|Jquery|String} el Dom element that is being walked
@param {Function} func function called to manipulate what you are walking
*/
DOM.jWalk = function(el,func) 
{ 
  $(el).each(function() //for each node
  {
    var child = $(this); //get the child
    if (child.children().size() > 0) //if there are at least 1 child
    {
      DOM.jWalk(child.children(),func); //walk the dom
    }
    func(this); //call the passed function
  });
};

/**
Clears a node with a data-lang attached to it
@static
@method clearDataLang
@param {Element|Jquery|String} el Dom element that is going to be cleared
*/
DOM.clearDataLang = function(el)
{
  var $el = $(el);
  
  var data_lang = $el.attr('data-lang');
  var data_overwrite = $el.attr('data-overwrite') === undefined ? false : String.toBool($el.attr('data-overwrite'));
  
  if (data_lang !== undefined) //if there is data-lang attached
  {
    if (data_overwrite)
    {
      $el.empty();
    }
    else
    {
      $el.contents().filter(function(){
        return (this.nodeType === 3);
      }).remove();
    }
  }
};

/**
Appends text with data-lang node
@static
@method changeDataLang
@param {Element|Jquery|String} el Dom element that is going to be changed
@param {Dictonary} dictionary object that holds all of the text ids
@param {String} currentLang current language of the module
@param {String} currentPg currentPg of the dictionary
*/
DOM.changeDataLang = function(el,dictionary,currentLang,currentPg)
{  
  var $el = $(el);
  
  var data_lang = $el.attr('data-lang');
  var data_overwrite = $el.attr('data-overwrite') === undefined ? false : String.toBool($el.attr('data-overwrite'));
  
  if (data_lang !== undefined) //if there is data-lang attached
  {            
    var data_page = $el.attr('data-page'); //get the data-page attribute
    if (data_page === undefined) //if it is undefined (which is the default)
    {
      data_page = 'default'; //just set the pg to default
    }
    
    //if the currentPg is what is specified in the dom
    if (currentPg === data_page)
    {
      var text = dictionary.getText(currentLang,data_page,data_lang); //get the text

      if (text !== undefined) //if the text exists
      {
        DOM.injectText(el,text,data_lang,data_page,data_overwrite);
      }
    }
  }
};

/**
Converts old crappy html to modern html (from Ted Files)
@static
@method tedToText
@param {String} txt Text formatted like crap
@return {String} text formartted better
*/
DOM.tedToText = function(txt)
{
  var div = document.createElement('div'); //create fake div
  $(div).append(txt); //append txt to div
  
  var newDiv = document.createElement('div'); //create fake div
  
  //creates a pseudo node
  var createObj = function(type)
  {
    var obj = {};
    obj.type = type;
    obj.children = [];
    obj.css = {};
    obj.text = "";
    obj.html = "";
    
    return obj;
  };
  
  var nodeDive = function(node,obj) //private nodeDive function
  {
    var children = $(node).children();
    
    for (var i=0;i<children.length;i++) //for each child
    {
      var child = children[i]; //get child

      switch (child.tagName.toLowerCase()) //get the tag type
      {
        case 'textformat':
          nodeDive(child,obj); //ignore, go deeper
          break;
        case 'p':
          var p = createObj('p');
          obj.children.push(p);
          nodeDive(child,p); //go deeper
          
          break;
        case 'li':
          var li = createObj('li');
          obj.children.push(li);
          nodeDive(child,li); //go deeper
          
          break;
        case 'font':
          nodeDive(child,obj); //go deeper

        //different attrs to support
        if ($(child).attr('face'))
        {
          obj.css['font-face'] = $(child).attr('face');
        }
        /*
        if ($(child).attr('size'))
        {
            obj.css['font-size'] = $(child).attr('size')+'px';
        }
        if ($(child).attr('color'))
        {
            obj.css['color'] = $(child).attr('color');
        }
        */

        obj.text = $(child).justText(); //set the text to just the text of the node
        obj.html = $(child).html();

        break;
        
        /*
        case 'b':
            var span1 = createObj('span');
            
            //set the css and just the text of the span
            span1.css['font-weight'] = 'bold';
            span1.text = $(child).text();
            
            obj.children.push(span1);
            
            nodeDive(child,span1);

            break;
        case 'i':
            var span2 = createObj('span');
            
            //set the css and just the text of the span
            span2.css['font-style'] = 'italic';
            span2.text = $(child).text();
            
            obj.children.push(span2);
            
            nodeDive(child,span2);

            break;
        case 'u':
            var span3 = createObj('span');
            
            //set the css and just the text of the span
            span3.css['text-decoration'] = 'underline';
            span3.text = $(child).text();
            
            obj.children.push(span3);
            
            nodeDive(child,span3);

            break;
        */
      }
    }
  };
  
  //takes the pseudo node objects and builds real html/css
  var buildJDom = function(newNode,obj)
  {
    $(newNode).html(obj.html); //add html to the node
    
    for (var j in obj.css) //for each css property
    {
      $(newNode).css(j,obj.css[j]); //css it
    }

    //for each children
    for (var i=0;i<obj.children.length;i++)
    {
      var child = $("<"+obj.children[i].type+"/>"); //make the child
      $(newNode).append(child); //add the child
      buildJDom(child,obj.children[i]); //build it
    }
  };
  
  //make the root obj
  var mainObj = createObj('div');
  
  nodeDive(div,mainObj); //do a node dive!
  
  buildJDom(newDiv,mainObj);
  
  //get rid of empty nodes
  $(newDiv).find('*').filter(function(){
    return $.trim($(this).text()) === '' && $(this).children().length === 0;
  }).remove();

  return $(newDiv).children(); //return just the children
};

/**
Converts markdown to text (from Ned Files)
@static
@deprecated don't need this anymore
@method nedToText
@param {String} txt Text formatted in markdown
@return {String} text formatted nicely
*/
DOM.nedToText = function(txt)
{
  return txt;
};

/**
sets a node with the data (assumes the text that is being passed in matches the data_lang id)
Don't use this function directly.  Use module.changeNodeText to minimize mistakes.
@static
@method injectText
@param {Element|Jquery|String} el Dom element to be set
@param {String} text text to be injected
@param {String} data_lang The id to be injected
@param {String} data_page which page from the dictionary
@param {Boolean} data_overwrite Whether to override with html instead of text
*/
DOM.injectText = function(el,text,data_lang,data_page,data_overwrite)
{
  DOM.clearDataLang(el);
  
  var $el = $(el);
  
  var injectedText;

  if (data_overwrite)
  {
    injectedText = text;
  }
  else
  {
    var $div = $("<div/>");
    $div.html(text);
    
    injectedText = $div.text();
  }
  
  if ($el.is("input")) //if it is an input object
  {
    $el.val(injectedText); //add the text with the value attr
  }
  else if ($el.is("textarea"))
  {
    $el.val(injectedText); //add the text with the value attr
  }
  else
  {
    $el.prepend(injectedText); //prepend either the text or html
  }
  
  $el.attr('data-lang',data_lang).attr('data-overwrite',data_overwrite).attr('data-page',data_page);
};