/**
Parses Ned files
@class NedXMLParser
@extends XMLParser
@author Dan Jewett
@version 2.0
@constructor
@param {Object} properties variables to pass into
@param {Dictionary} properties.dictionary data storage for the ned files
@param {String} properties.page which xml file we are parsing
@param {String} properties.language which language to store the file we are parsing
*/
var NedXMLParser = XMLParser.extend({
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

    $(xml).find("textField").each(function(){ //for each textfield
      properties.dictionary.addTextId(
      properties.language,
      properties.page,
      $(this).attr('id'),
      $(this).text() //strip the html and store the text
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
NedXMLParser.parse = function(path,properties,afterParse){ //parse method
  new NedXMLParser(path,properties,afterParse);
};