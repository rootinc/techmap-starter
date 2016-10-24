/**
XMLParser - base parser to parse xml files
@class XMLParser
@extends DataParser
@author Dan Jewett
@version 2.0
@constructor
@param {Object} properties variables to pass into
*/
var XMLParser = DataParser.extend({
  init:function(properties)
  {
    properties.dataType = "xml";
    
    this._super(properties);
  },
  
  /**
    Called when the xml file is pulled from the server. Override in other parsers
    @event onParse
    @param {String} xml xml reference
    @param {Object} properties properties passed to be manipluated
    @protected
    */
  onParse:function(xml,properties){}
});

/**
Parse method used to parse the xml
@static
@public
@method parse
@param {Object} properties variables to pass into
*/
XMLParser.parse = function(properties){
  new XMLParser(properties);
};