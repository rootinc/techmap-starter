/**
Parses Subtitle files
@class SubtitleXMLParser
@extends XMLParser
@author Dan Jewett
@constructor
@param {Object} properties variables to pass into
*/
var SubtitleXMLParser = XMLParser.extend({
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
    $(xml).find("txtField").each(function(){ //for each textfield
      var id = $(this).attr('id');
      var startTime = $(this).attr('startTime');
      var endTime = $(this).attr('endTime');
      
      startTime = parseFloat(startTime,10);
      if (endTime)
      {
        endTime = parseFloat(endTime,10);
      }

      properties.push({
        id:id,
        text:$(this).text(),
        startTime:startTime,
        endTime:endTime
      });
    });
    
    properties.sort(function(a,b){
      return a.startTime > b.startTime;
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
SubtitleXMLParser.parse = function(properties){ //parse method
  new SubtitleXMLParser(properties);
};