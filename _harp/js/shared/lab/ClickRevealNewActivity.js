/**
click on stuff and reveal new stuff
@class ClickRevealNewActivity
@extends Activity
@author Dan Jewett
@version 1.0
@constructor
@param {Object} properties properties that the activity uses
@param {Array} crList array of objects that contains the click reveal properties
@param {Boolean} [properties.showFirst=false] whether to show the first reveal by default
@param {Function} [properties.onReveal] callback when something is revealed
@param {Function} [properties.onRevealAll] callback when all the things are revealed
@param {Function} [properties.onFirstRveal] callback when the first thing is reveal
@param {String} [properties.showClass="show"] css class applied to show the reveal
@param {String} [properties.hideClass="hide"] css class applied to hide the reveal
@param {String} [properties.activeClass="active"] css class applied to the clicks to make it look active
@param {String} [properties.inativeClass="inactive"] css class applied to the clicks to make it look inactive
*/var ClickRevealNewActivity = Activity.extend({
  init:function(properties)
  {
    this._super(properties);
    
    /**
		crList array of objects that contains the click reveal properties
    [
      {
        click:"selector", //this question is the container
        reveal:"selector",
        onReveal:optional function callback
      },
      ...
    ]
		@property crList
		@type Array
		@public
		*/
    this.crList = properties.crList;
    
    /**
		callback when something is revealed
		@property showFirst
		@type Boolean
		@public
		*/
    this.showFirst = properties.showFirst === undefined ? false : properties.showFirst;
    
    /**
		callback when all the things are revealed
		@property Function
		@type Boolean
		@protected
		*/
    this.onRevealAll = properties.onRevealAll;
    
    /**
		callback when something is revealed
		@property Function
		@type Boolean
		@protected
		*/
    this.onReveal = properties.onReveal;
    
    /**
		callback when the first thing is reveal
		@property onFirstReveal
		@type Function
		@protected
		*/
    this.onFirstReveal = properties.onFirstReveal;
    
    /**
		css class applied to show the reveal
		@property showClass
		@type String
		@protected
		*/
    this.showClass = properties.showClass || 'show';
    
    /**
		css class applied to hide the reveal
		@property hideClass
		@type String
		@protected
		*/
    this.hideClass = properties.hideClass || 'hide';
    
    /**
		css class applied to the clicks to make it look inactive
		@property inactiveClass
		@type String
		@protected
		*/
    this.inactiveClass = properties.inactiveClass || 'inactive';
    
    /**
		css class applied to the clicks to make it look active
		@property activeClass
		@type String
		@protected
		*/
    this.activeClass = properties.activeClass || 'active';
    
    /**
		gives you the current index of the reveal that is shown
		@property activeIndex
		@type Number
		@protected
		*/
    this.activeIndex = -1;
    
    /**

		@property oneClicked
		@type Boolean
		@protected
		*/
    this.oneClicked = false;
    
    this.createInteractions();
    this.hideAllReveals(); //hide all the reveals for initializion purposes
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
    
    this.resetClickedState(); //resets all the clicks to be false
    
    this.activeIndex = -1; //set the active index to -1 for page load
    
    if (this.showFirst) //if show first property is on
    {
      this.crList[0].$click.trigger('click'); //automates a click so that the reveal shows
    }
  },
  
  /**
	loops through the crList object with a function to iterate on the individual crObjects
	@method each
  @param {Function} func node that was clicked on
	@protected
	*/
  each:function(func)
  {
    $.each(this.crList,function(index,crObj){
      func(index,crObj); //iterate on the individual object
    });
  },
  
  /**
	sets up the clicks to be click interations for the user to click on
	@method createInteractions
	@protected
	*/
  createInteractions:function()
  {
    var that = this;
    
    this.each(function(index,crObj){
      that.createInteraction(crObj,index); //create an indiviual click interactino
    });
  },
  
  /**
	Set up a clicks to be click interation for the user to click on. Also initializes $click and $reveal to be quick accessors to the crObj.
  Also addes boolean clicked to be false to the crObj.
	@method createInteraction
	@protected
	*/
  createInteraction:function(crObj,index)
  {
    var that = this;
    
    //create the interaction object
    crObj.interaction = new Interaction({
      el:crObj.click,
      events:{
        click:function(){
          that.click(crObj,index);
        }
      }
    });
    
    //add the jquery accessors here
    crObj.$click = $(crObj.click);
    crObj.$reveal = $(crObj.reveal);
    
    //default clicked states to false
    crObj.clicked = false;
  },
  
  /**
  Fires the click event, also applying reveals/css classes/callbacks
	@event click
  @param {Object} crObj the object from the crList that was clicked
  @param {Number} index an index of the crList that was clicked
	@protected
	*/
  click:function(crObj,index)
  {
    crObj.clicked = true; //first, set the crObj to be true
    
    var localOneClicked = this.oneClicked; //keeps track of oneClicked before we set it to true;
    
    this.oneClicked = true; //now that we've clicked on something, this is true;
    
    //this.hideAllReveals(); //first, hide everything
    
    this.addInactiveClasses(); //making all the clicks inactive to begin with
    this.removeActiveClasses(); //making all the clicks not active to begin with
    
    //visualize to the user the click object is no longer inactive, but active
    crObj.$click.removeClass(this.inactiveClass).addClass(this.activeClass); 
    
    this.show(crObj.$reveal); //show the reveal
    
    this.activeIndex = index; //set the activeIndex to the index we clicked on
    
    crObj.onReveal && crObj.onReveal(); //after the reveal is shown, call the callback if it's there
    
    //if nothing has been clicked on
    if (!localOneClicked)
    {
      this.onFirstReveal && this.onFirstReveal(); //call the callback for the first reveal, if it's there
    }
    
    this.onReveal && this.onReveal();  //if there is a global onReveal, call it back
    
    //if everything has been clicked on
    if (this.checkAllClicked())
    {
      this.onRevealAll && this.onRevealAll(); //fire the callback if it exists
      this.activityComplete(); //then complete the activity
    }
  },
  
  /**
	Shows the reveal
	@method show
  @param {jQuery} $el jQuery object that is revealed
	@protected
	*/
  show:function($el)
  {
    $el.removeClass(this.hideClass).addClass(this.showClass);
  },
  
  /**
	Hides the reveal
	@method hide
  @param {jQuery} $el jQuery object that is revealed
	@protected
	*/
  hide:function($el)
  {
    $el.removeClass(this.showClass).addClass(this.hideClass);
  },
  
  /**
	Adds the inactive classes to all the clicks
	@method addInactiveClasses
	@protected
	*/
  addInactiveClasses:function()
  {
    var that = this;
    
    this.each(function(index,crObj){
      crObj.$click.addClass(that.inactiveClass);
    });
  },
  
  /**
	Removes the inactive classes from all the clicks
	@method removeInactiveClasses
	@protected
	*/
  removeInactiveClasses:function()
  {
    var that = this;
    
    this.each(function(index,crObj){
      crObj.$click.removeClass(that.inactiveClass);
    });
  },
  
  /**
	Removes the active classes from all the clicks
	@method removeActiveClasses
	@protected
	*/
  removeActiveClasses:function()
  {
    var that = this;
    
    this.each(function(index,crObj){
      crObj.$click.removeClass(that.activeClass);
    });
  },
  
  /**
	Hides the reveals
	@method hideAllReveals
	@protected
	*/
  hideAllReveals:function()
  {
    var that = this;
    
    this.each(function(index,crObj){
      that.hide(crObj.$reveal);
    });
  },
  
  /**
	Checks if all the objects have been clicked
	@method checkAllClicked
	@protected
  @return {Boolean}
	*/
  checkAllClicked:function()
  {    
    var allClicked = true; //assume it is true unless proved otherwise
    
    this.each(function(index,crObj){
      if (!crObj.clicked)
      {
        allClicked = false;
        return false;
      }
    });
    
    return allClicked;
  },
  
  /**
	Resets the clicked states back to falls
	@method resetClickedState
	@protected
	*/
  resetClickedState:function()
  {
    this.each(function(index,crObj){
      crObj.clicked = false;
    });
  },
  
  /**
	first function called when activity is destroyed
	@event destroy
	@protected
	@override
	*/
  destroy:function()
  {
    this._super();
    
    this.hideAllReveals();
    this.removeActiveClass();
    this.removeInactiveClass();
  }
});