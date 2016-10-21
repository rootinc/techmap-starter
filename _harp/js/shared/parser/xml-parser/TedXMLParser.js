/**
Parses Ted files
@class TedXMLParser
@extends XMLParser
@author Dan Jewett
@version 2.0
@constructor
@param {Object} properties variables to pass into
@param {Dictionary} properties.dictionary data storage for the ted files
@param {String} properties.page which xml file we are parsing
@param {String} properties.language which language to store the file we are parsing
*/
var TedXMLParser = XMLParser.extend({
  init:function(properties) //constructor
  {
    this._super(properties); //call super
  },
  
  /**
    Called when the xml file is pulled from the server.
    @event onParse
    @override
    @param {String} xml xml reference
    @param {Object} properties properties passed to be manipluated
    @protected
    */
  onParse:function(xml,properties) //onParse method
  {
    properties.dictionary.addPage(properties.language,properties.page); //make the page

    $(xml).find("txtField").each(function(){ //for each textfield
      properties.dictionary.addTextId(
        properties.language,
        properties.page,
        $(this).attr('id'),
        DOM.tedToText($(this).text()) //strip the html and store the text
      );
    });
  }
});

/**
Parse method used to parse the xml
@static
@override
@method parse
@public
@param {Object} properties variables to pass into
*/
TedXMLParser.parse = function(properties){ //parse method
  new TedXMLParser(properties);
};