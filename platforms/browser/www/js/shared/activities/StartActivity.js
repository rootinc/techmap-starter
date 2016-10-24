/**
Used as the activty for page0 or title page
@class StartActivity
@extends Activity
@author Dan Jewett
@constructor
@param {Object} properties properties that the activity uses 
@param {String} properties.button jquery string for the button
*/
var StartActivity = Activity.extend({
  init:function(properties) //constructor
  {
    this._super(properties);
    
    var that = this;
    
    /**
        button that is pressed to start the module
        @property button
        @type jQuery
        @protected
        */
    this.button = $(properties.button);
    
    this.button.on('click',function(){
      that._buttonClick();
    });
  },
  
  /**
    this event is fired when the button is clicked
    @event _buttonClick
    @protected
    */
  _buttonClick:function()
  {
    this.activityComplete();
    this.page.module.nextPage();
  },
  
  /**
    removes the button click from the button
    @method _removeClick
    @protected
    */
  _removeClick:function()
  {
    this.button.off('click');
  }
});