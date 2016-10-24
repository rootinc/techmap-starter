/**
JSONParser - base parser to parse json files
@class DataParser
@extends Class
@author Dan Jewett
@version 1.0
@constructor
@param {Object} properties variables to pass into
@param {Dictionary} properties.dictionary data storage for the ned files
*/
var JSONParser = DataParser.extend({
  init:function(properties)
  {
    properties.dataType = "json";
    
    this._super(properties);
  },
  
  /**
    Called when the json file is pulled from the server. Override in other parsers
    @event onParse
    @param {String} json json reference
    @param {Object} properties properties passed to be manipluated
    @protected
    */
  onParse:function(json,properties){}
});

/**
Parse method used to parse the json
@static
@public
@method parse
@param {Object} properties variables to pass into
*/
JSONParser.parse = function(properties){
  new JSONParser(properties);
};