/**
Launches into a jump section
@class BeginJumpActivity
@extends Activity
@author Dan Jewett
@version 1.0
@constructor
@param {Object} properties properties that the activity uses
@param {String} properties.jumpButton jquery selector to the button
@param {Number|String} properties.jumpPage page number or page name of the page to jump to
@param {String} properties.jumpReceiver unqiue string id to listen for when the jump has been completed
@param {String} properties.completeClass class
*/
var BeginJumpActivity = Activity.extend({
  init:function(properties) //constructor
  {     	   
    this._super(properties);

    /**
    the jquery obj for the jump button
    @property jumpButton
    @type jQuery
    @public
    */
    this.jumpButton = $(properties.jumpButton);

    /**
    page number or page name of the page to jump to
    @property jumpPage
    @type Number|String
    @protected
    */
    this.jumpPage = properties.jumpPage;

    /**
    unique string id to listen for when the jump has been completed
    @property previousButton
    @type String
    @protected
    */
    this.jumpReceiver = properties.jumpReceiver;
    
    /**
    class to add on to the button
    @property completeClass
    @type String
    @protected
    */
    this.completeClass = properties.completeClass || "";

    var that = this;

    //click event for the jump button
    this.jumpButton.on('click',function(e){
      that._jump();
    });

    //event once jump has been complete
    this.receiveFromModule(this.jumpReceiver,function(){
      that._completeJump();
    });
  },
	
	/**
  called when the jump button is clicked
  @event _jump
  @protected
  */
	_jump:function()
	{
		this.page.module.gotoPage(this.jumpPage); //goto the jump page
	},
	
	/**
  called when the jump button is clicked
  @event _completeJump
  @protected
  */
	_completeJump:function()
	{
    this.jumpButton.addClass(this.completeClass);
    
		this.activityComplete();
	}
});