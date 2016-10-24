/**
click on a thing and cross fade it with the another thing
@class CrossFadeActivity
@extends Activity
@author Dan Jewett
@constructor
@param {Object} properties properties that the activity uses
@param {String} properties.begin the begin container
@param {String} properties.replace the replace container
@param {Number} properties.time the time it takes to cross fade (in milliseconds)
*/
var CrossFadeActivity = Activity.extend({
  init:function(properties) //constructor
  {
    this._super(properties);
    
    var that = this;
    
    /**
        the begin container
        @property begin
        @type jQuery
        @public
        */
    this.begin = $(properties.begin);
    
    /**
        the replace container
        @property replace
        @type jQuery
        @public
        */
    this.replace = $(properties.replace);
    
    /**
        the time it takes to cross fade (in milliseconds)
        @property time
        @type Number
        @public
        */
    this.time = properties.time;
    
    //when the first thing is clicked on
    this.begin.on('click',function(){
      that.crossFade(); //crossfade it
    });
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
    
    this.begin.show(); //show the first thing
    this.replace.hide(); //hide the second thing
  },
  
  /**
    changes the facilator text to the certain id
    @method crossFade
    @public
    */
  crossFade:function()
  {
    var that = this;
    
    this.begin.fadeOut(this.time); //fadeout the first thing
    this.replace.fadeIn(this.time,function(){ //fade in the second thing
      that._crossFade();
    });
  },
  
  /**
    called after the crossfade occurs
    @event _crossFade
    @protected
    */
  _crossFade:function()
  {
    this.activityComplete();
  }
});