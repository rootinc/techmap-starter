/**
click on stuff and keep new stuff
@class ClickKeepActivity
@extends ClickRevealActivity
@author Dan Jewett
@constructor
@param {Object} properties properties that the activity uses
*/
var ClickKeepActivity = ClickRevealActivity.extend({
  init:function(properties) //constructor
  {
    this._super(properties);
  },
  
  /**
    helper for doing the show effect
    @method _show
    @protected
    @override
    @param {Node} obj node that was clicked on
    @param {Number} index index of the internal clicks array
    */
  _show:function(obj,index)
  {
    $(this.clicks[index]).addClass(this.activeClass); //add the active class on the one that is active
    $(this.reveals[index]).show();
  },
  
  /**
    helper for doing the show effect
    @method _showModern
    @protected
    @override
    @param {Node} obj node that was clicked on
    @param {Number} index index of the internal clicks array
    */
  _showModern:function(obj,index)
  {
    $(this.clicks[index]).addClass(this.activeClass); //add the active class on the one that is active
    $(this.reveals[index]).removeClass('hide');
  }
});