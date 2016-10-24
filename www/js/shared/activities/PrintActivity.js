/**
Used for printing things
Requires jquery.printElement
@class PrintActivity
@extends Activity
@author Dan Jewett
@constructor
@param {Object} properties properties that the activity uses
@param {String} properties.printButton jquery string for the print button
@param {String} properties.printTemplate jquery string for the content that is being printed
@param {Array} properties.modifiers array of objects to modify the printTemplate.  In the form {from, to, [custom]} (custom is optional)
*/
var PrintActivity = Activity.extend({
  init: function(properties)
  {
    if (!$.fn.printElement)
    {
      throw new TypeError("No jquery.printElement object. Make sure you include shared/lib/jquery/jquery.printElement.js");
    }
    
    var that = this;
    
    this._super(properties);
    
    /**
        button to be clicked on
        @property printButton
        @type jQuery
        @protected
        */
    this.printButton = $(properties.printButton);
    
    /**
        the content that is being printed
        @property printTemplate
        @type jQuery
        @protected
        */
    this.printTemplate = $(properties.printTemplate);
    
    /**
        array of objects to modify the printTemplate.  In the form {from, to, [custom]} (custom is optional).  Use custom if you want to pass custom function
        @property modifiers
        @type Array
        @protected
        */
    this.modifiers = properties.modifiers;
    
    //the print templates hides automatically
    this.printTemplate.hide();
    
    this.printButton.on('click', function(e){
      that.print();
    });
  },
  
  /**
    called after activity should be fully initialized (everything is drawn)
    @event afterCreated
    @protected
    @override
    */
  afterCreated:function()
  {
    this._super();
    
    this.activityComplete(); //complete the activity
  },
  
  /**
    loops through the modifiers, modifying the print template
    @method fillTemplate
    @protected
    */
  fillTemplate:function()
  {
    for (var i = 0; i < this.modifiers.length; i++)
    {
      var blockItem = this.modifiers[i];
      
      if (blockItem.from && blockItem.to)
      {
        if (blockItem.custom)
        {
          this._custom(blockItem);
        }
        else
        {
          var text = this._from(blockItem.from);
          this._to(blockItem.to,text);
        }
      }
    }
  },
  
  /**
    calls a custom function from the outside
    @method _custom
    @param blockItem the block item to call for from and to
    @protected
    */
  _custom:function(blockItem)
  {
    blockItem.custom.call(this,blockItem.from,blockItem.to);
  },
  
  /**
    simple from function.  Gets the value or text FROM selector
    @method _from
    @param from the selector to get the data from
    @protected
    */
  _from:function(from)
  {
    var text = '';
    
    var $from = $(from);
    if ($from.is("textarea") || $from.is("input"))
    {
      text = $from.val();
    }
    else
    {
      text = $from.text();
    }
    
    return text;
  },
  
  /**
    simple to function.  Sets the data FROM TO this
    @method _to
    @param to the selector to set the data
    @param text the text to set
    @protected
    */
  _to:function(to,text)
  {
    var $to = $(to);
    $to.text(text);
  },
  
  /**
    the main print function
    @method print
    @public
    */
  print:function()
  {
    this.fillTemplate();
    
    var printEl = $('<div></div>').append(this.printTemplate.clone().show());
    
    $(printEl).printElement({
        printMode:'popup', 
        leaveOpen:  true,
        printBodyOptions:{
        styleToAdd: 'background-color:white;',
        classNameToAdd: ''
      },
      printDefault: true
    });
  }
});