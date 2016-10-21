var SimTextXMLParser = XMLParser.extend({
  init:function(path,parameters,afterParse) //constructor
  {
    this._super(path,parameters,afterParse); //call super
  },
  onParse:function(xml,parameters,afterParse) //onParse method
  {
    var simIDs = parameters[0]; //simIDs

    $(xml).find("txtField").each(function(){ //for each txtfield
      simIDs[$(this).attr('id')] = DOM.convertHtml($(this).text()); //convert the html and store the html
    });
    
    if (afterParse != undefined)
    {
      afterParse[1].call(afterParse[0]); //it has been parsed
    }
  }
});
SimTextXMLParser.parse = function(path,parameters,afterParse){ //parse method
  new SimTextXMLParser(path,parameters,afterParse);
}