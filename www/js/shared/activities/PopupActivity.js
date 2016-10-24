/**
click on a button and allows a window to show
@class PopupActivity
@extends Activity
@author Dan Jewett
@version 1.0
@constructor
@param {Object} properties properties that the activity uses
@param {String} properties.showButton the jquery selector for the button
@param {String} properties.popUpWindow the jquery selector for the pop up window
@param {String} [properties.closeButton] the jquery selector for the close button
*/
var PopupActivity = Activity.extend({
  init:function(properties) //constructor
  {
    this._super(properties);
    
    var that = this;
    
    /**
        the button that shows the pop up window
        @property showButton
        @type jQuery
        @protected
        */
    this.showButton = $(properties.showButton);
    
    /**
        the pop up window
        @property popUpWindow
        @type jQuery
        @protected
        */
    this.popUpWindow = $(properties.popUpWindow);
    
    /**
        the close button that closes the window
        @property closeButton
        @type jQuery|undefined
        @protected
        */
    this.closeButton = properties.closeButton ? $(properties.closeButton) : undefined;
    
    /**
        callbacks when the pop up is shown
        @property onShow
        @type Function|undefined
        @protected
        */
    this.onShow = properties.onShow || undefined;
    
    /**
        callbacks when the pop up is hidden
        @property onHide
        @type Function|undefined
        @protected
        */
    this.onHide = properties.onHide || undefined;
    
    //show button click event
    this.showButton.on('click' , function(e) {
      e.stopPropagation();
      
      that._show();
      if (that.onShow)
      {
        that.onShow.call(that,e);
      }
    });
    
    //close button click event
    this.closeButton && this.closeButton.on('click' , function(e) {
      e.stopPropagation();
      
      that._hide();
      if (that.onHide)
      {
        that.onHide.call(that,e);
      }
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
    
    this._hide();
  },
  
  /**
    called when the pop up window should be shown
    @event _show
    @protected
    */
  _show:function()
  {
    this.popUpWindow.show();
    this.activityComplete();
  },
  
  /**
    called when the pop up window show be hidden
    @event _hide
    @protected
    */
  _hide:function()
  {
    this.popUpWindow.hide();
  }
});