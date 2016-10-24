/**
Used as a wrapper around Swiffy
Requires a modified swiffy.runtime.js
Also requires a swiffyobject.js
In the flash file, if you call ExternalInterface.call(__parent.), you can get the parent
@class SwiffyActivity
@extends Activity
@author Dan Jewett
@version 0.5
@updates refactored for better implementation
@constructor
@param {Object} properties properties that the activity uses
@param {String} properties.container jquery string of the container to embed the swiffy html into
@param {String} properties.swiffyId the swiffy object name generated by google
*/
var SwiffyActivity = Activity.extend({
  init:function(properties) //constructor
  {
    this._super(properties);
    
    /**
        jquery string of the container to embed the swiffy html into
        @property container
        @type jQuery
        @public
        */
    this.container = $(properties.container);
    
    if (this.container.length === 0)
    {
      throw new TypeError(this.container.selector + " is not a valid selector.");
    }
    
    /**
        the swiffy object generated by google
        @property swiffyId
        @type String
        @public
        */
    this.swiffyId = properties.swiffyId;    
    
    /**
        the activity will signal an activity complete if true
        @property autoComplete
        @type Boolean
        @public
        @override
        */
    this.autoComplete = properties.autoComplete === undefined ? true : properties.autoComplete;
    
    /**
        object used to hold the stage
        @property stage
        @type Swiffy
        @protected
        */
    this.stage = {};
    
    if (!window[this.swiffyId])
    {
      throw new TypeError("No such object as "+this.swiffyId+". Make sure you include it.");
    }
    
    /**
        object holding all the swiffy info
        @property swiffyObj
        @type swiffy
        @protected
        */
    this.swiffyObj = window[this.swiffyId];
    
    var obj = {};
    obj.__parent = this; //hack swiffy so parent can reference this object
    $.extend(true,this.swiffyObj,obj);
  },
  
  /**
    first function called when activity is created
    @event created
    @protected
    @override
    */
  created:function()
  {
    this._super();
    
    this._begin();
  },
  
  /**
    calls the _createStage function
    @method _create
    @protected
    */
  _begin:function()
  {
    this._createStage();
  },
  
  /**
    creates the stage with swiffy
    @method _createStage
    @protected
    */
  _createStage:function()
  {
    var jContainer = $(this.container[0]);
    
    if (!jContainer.width() || !jContainer.height())
    {
      throw new TypeError("Swiffy needs an explicit width and height, or bad things will happen.");
    }
    
    this.stage = new swiffy.Stage(this.container[0],this.swiffyObj,{});
    this.stage.setBackground(null);
    this.stage.start();
  },
  
  /**
    calls the _destroyStage function
    @method _end
    @protected
    */
  _end:function()
  {
    this._destroyStage();
  },
  
  /**
    destroy the stage with swiffy
    @method _destroyStage
    @protected
    */
  _destroyStage:function()
  {
    this.stage.destroy();
    this.stage = {};
  },
  
  /**
    called when the activity is destroyed
    @event destroy
    @protected
    @override
    */
  afterDestroy:function()
  {
    this._super();
    
    this._end();
  }
});