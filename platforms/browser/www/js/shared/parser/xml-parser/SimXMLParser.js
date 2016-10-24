var SimXMLParser = XMLParser.extend({
  init:function(path,parameters,afterParse) //constructor
  {
    this._super(path,parameters,afterParse); //call parent
  },
  onParse:function(xml,parameters,afterParse) //on parse method
  {
    var sim = {}; //sim object

    $(xml).find("simObj").each(function(){ //for each simObj
      var id = $(this).attr('id'); //get the id of the node

      sim[id] = {}; //make an object

      sim[id].type = $(this).attr('type'); //set type
      sim[id].id = id; //set the id

      sim[id].actor = $(this).children('actor').length > 0 ? $(this).children('actor').text() : undefined; //set actor
      sim[id].duration = $(this).children('duration').length > 0 ? $(this).children('duration').text() : undefined; //set actor
      sim[id].emo = $(this).children('emo').length > 0 ? $(this).children('emo').text() : undefined; //set actor
      sim[id].textId = $(this).children('textId').length > 0 ? $(this).children('textId').text() : undefined; //set actor

      var nextNode = $(this).children('nextNode'); //get next node
      if (nextNode.length > 0 && nextNode.text() != "break") //if the next node is not a break and there is at least one
      {
        sim[id].nextNode = nextNode.text(); //set the next node
      }
      else
      {
        sim[id].nextNode = undefined; //next node is undefined
      }

      var options = $(this).children('option'); //get the options
      if (options.length > 0) //if there is at least one option
      {            
        sim[id].options = []; //make the options array

        for (var i=0;i<options.length;i++) //for each options
        {
          sim[id]['options'][i] = {} //make option object

          sim[id]['options'][i].score = $(options[i]).attr('score'); //set score
          sim[id]['options'][i].next = $(options[i]).text(); //set next
        }
      }
      else
      {
        sim[id].option = undefined; //options are undefined
      }
    });
    
    if (afterParse != undefined)
    {
      afterParse[1].call(afterParse[0],sim); //it has been parsed
    }
  }
});
SimXMLParser.parse = function(path,parameters,afterParse){ //parse method
  new SimXMLParser(path,parameters,afterParse);
}