/**
Parses Ned files
@class NedJSONParser
@extends JSONParser
@author Dan Jewett
@version 1.0
@constructor
@param {Object} properties variables to pass into
@param {Dictionary} properties.dictionary data storage for the ned files
@param {String} properties.page which json file we are parsing
@param {String} properties.language which language to store the file we are parsing
*/
var NedJSONParser = JSONParser.extend({
  init:function(properties) //constructor
  {
    this._super(properties); //call super
  },
  
  /**
    Called when the json file is pulled from the server.
    @event onParse
    @override
    @param {String} json json reference
    @param {Object} properties properties passed to be manipluated
    @protected
    */
  onParse:function(json,properties) //onParse method
  {
    properties.dictionary.addPage(properties.language,properties.page); //make the page

    for (var i=0;i<json.length;i++)
    {
      var item = json[i];
      properties.dictionary.addTextId(
      properties.language,
      properties.page,
      item.id,
      item.text //strip the html and store the text
      );
    }
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
NedJSONParser.parse = function(properties){ //parse method
  new NedJSONParser(properties);
};