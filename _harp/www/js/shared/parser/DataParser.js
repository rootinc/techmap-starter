/**
DataParser - base parser to parse xml files
@class DataParser
@extends Class
@author Dan Jewett
@version 1.0
@constructor
@param {Object} properties variables to pass into
@param {String} properties.path path to the data
@param {Function} properties.afterParse function called after the xml is parsed
*/
var DataParser = Class.extend({
    init:function(properties)
    {
        var that = this;

		this.path = properties.path;
		delete properties.path;

		this.dataType = properties.dataType;
		delete properties.dataType;

		if (this.path.indexOf('http') > -1 && !window['XDROBJ'])
		{
			console.warn('If running IE8 or IE9, you may have problems with cross-domain requests. Include shared/lib/jquery/jQuery.XDomainRequest.js to fix this');
		}
        $(this).one(DataParser.PARSED,properties,properties.afterParse);

        //get the xml file
        $.ajax({
            type: "GET",
            url: this.path,
            dataType: this.dataType,
			headers: {
				'Cache-Control': 'max-age=0'
			},
            success: function(data){
                that.onParse(data,properties); //after it has been received, call the onParse method
                $(that).trigger(DataParser.PARSED);
            },
            error: function(e){
                $(that).off(DataParser.PARSED);
                console.error("Error parsing "+that.path,e.statusText,e);
            }
        });

    },

    /**
    Called when the xml file is pulled from the server. Override in other parsers
    @event onParse
    @param {String} xml xml reference
    @param {Object} properties properties passed to be manipluated
    @protected
    */
    onParse:function(data,properties){}
});

/**
Used to bind when xmlparser parses
@static
@const PARSE
@type {String}
*/
DataParser.PARSED = 'PARSED';

/**
Parse method used to parse the xml
@static
@public
@method parse
@param {String} path path to the xml
@param {Object} properties variables to pass into
@param {Function} afterParse function called after the xml is parsed
*/
DataParser.parse = function(properties){
    new DataParser(properties);
};
