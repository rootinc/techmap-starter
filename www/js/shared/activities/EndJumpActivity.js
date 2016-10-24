/**
Ends a jump section
@class EndJumpActivity
@extends Activity
@author Dan Jewett
@version 1.0
@constructor
@param {Object} properties properties that the activity uses
@param {String} properties.jumpSender unqiue string id to send now that the jump will be completed
*/
var EndJumpActivity = Activity.extend({
  init:function(properties) //constructor
  {     
    this._super(properties);
    
    /**
    unique string id to send now that the jump is complete
        @property jumpSender
        @type String
        @protected
        */
    this.jumpSender = properties.jumpSender;
  },
  
  created:function()
  {
    this._super();
    
    this._endJump();
  },
  
  _endJump:function()
  {
    this.activityComplete(); //complete the activity
    
    this.sendToModule(this.jumpSender); //send to the module that we've completed the jump section
  }
});