/**
click on stuff and reveal new stuff
@class ClickRevealActivity
@extends Activity
@author Dan Jewett
@version 1.1
@updated added _show method to make inheriting cleaner
@constructor
@param {Object} properties properties that the activity uses
@param {String} [properties.inactiveClass=""] css class that makes the clicks look inactive (ie, disable effect)
@param {String} [properties.activeClass=""] css class that makes the clicks look active
@param {Array} properties.clicks containers to click on [thing1,thing2,...], use jquery selectors
@param {Array} properties.reveals containers that reveal when you click on the clicks [reveal1,reveal2...], use jquery selectors
@param {Function|Array} [properties.onReveals] callbacks when something is revealed (can be one function or array of functions)
@param {Function} [properties.onClickAll] callback when all the things are revealed
@param {Boolean} [properties.showFirst=false] whether to show the first reveal by default
@param {String} [properties.initialContent] Content that will show on pageload in the created function but upon the first click/reveal will be hidden
@param {Boolean} [properties.modern=false] flag to use the modern approach for display
*/
var ClickRevealActivity = Activity.extend({
  init:function(properties) //constructor
  {
    var that = this;

    this._super(properties);

    /**
		flag to use the modern approach for display
		@property modern
		@type Boolean
		@public
		*/
    this.modern = properties.modern === undefined ? false : properties.modern;

    /**
		css class that makes the clicks look inactive (ie, disable effect)
		@property inactiveClass
		@type String
		@public
		*/
    this.inactiveClass = properties.inactiveClass || '';

    /**
		css class that makes the clicks look active
		@property inactiveClass
		@type String
		@public
		*/
    this.activeClass = properties.activeClass || '';

    /**
		containers to click on [thing1,thing2,...], use jquery selectors
		@property clicks
		@type Array
		@public
		*/
    this.clicks = properties.clicks;

    /**
		containers that reveal when you click on the clicks [reveal1,reveal2...], use jquery selectors
		@property reveals
		@type Array
		@public
		*/
    this.reveals = properties.reveals;

    /**
		callbacks when something is revealed (can be one function or array of functions)
		@property onReveals
		@type Function|Array
		@protected
		*/
    this.onReveals = properties.onReveals || undefined;

    /**
		callback when all the things are reveale
		@property onClickAll
		@type Function
		@protected
		*/
    this.onClickAll = properties.onClickAll || undefined;

    /**
		whether to show the first reveal by default
		@property showFirst
		@type Boolean
		@public
		*/
    this.showFirst = properties.showFirst || false;

    /**
		local var of bools keeping track of what is clicked
		@property clicked
		@type Array
		@protected
		*/
    this.clicked = new Array(this.clicks.length);

    for (var i=0;i<this.clicked.length;i++) //for each thing to be clicked
    {
      this.clicked[i] = false; //set it to false
    }

    /**
		keeps track of the active click (or last clicked)
		@property active
		@type Number
		@protected
		*/
    this.active = -1;

    /**
		Content that will show on pageload in the created function but upon the first click/reveal will be hidden
		@property initialContent
		@type jQuery|undefined
		@protected
		*/
    this.initialContent = properties.initialContent ? $(properties.initialContent) : undefined;

    $.each(this.clicks,function(index) //for each click
    {
      $(that.clicks[index]).on('click',function() //make a click event
      {
        that._clicked(this,index);
      });
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
    this._super(); //call the parent function

    this.active = -1;
    this.hideReveals(); //hide all the stuff

    if (this.initialContent)
    {
      this.initialContent.show(); //Show initial content on creation
    }

    if (this.showFirst)
    {
      this.showFirstReveal();
    }
  },

  /**
	Return current the active item
	@method getClicked
	@public
	@return {Node}
	*/
  getClicked:function()
  {
    return $(this.clicks[this.active]);
  },

  /**
	event for when the object is clicked on
	@event _clicked
	@protected
	@param {Node} obj node that was clicked on
	@param {Number} index index of the internal clicks array
	*/
  _clicked:function(obj,index)
  {
    if (this.initialContent)
    {
      this.initialContent.hide(); //Hiding initial content after first click happens
    }

    if (this.modern)
    {
      this._showModern(obj,index);
    }
    else
    {
      this._show(obj,index);
    }

    this.active = index; //the new active is now the index
    this.clicked[index] = true; //we have clicked on the newest container

    if (this.onReveals !== undefined) //if the onReveals property is defined
    {
      if (this.onReveals[index] !== undefined) //if the onReveals property is an array
      {
        this.onReveals[index].call(this,index); //call that array index
      }
      else
      {
        this.onReveals.call(this,index); //call the one onReveal method
      }
    }

    if (!this.complete && this.checkAllClicked()) //if we have clicked them all and the page has not been completed
    {
      if (this.onClickAll !== undefined) //if there is an onClickALl callback
      {
        this.onClickAll.call(this); //call it
      }
      this.activityComplete(); //complete the page
    }
  },

  /**
	helper for doing the show effect
	@method _show
	@protected
	@param {Node} obj node that was clicked on
	@param {Number} index index of the internal clicks array
	*/
  _show:function(obj,index)
  {
    this.inactivate(); //inactivate everything
    $(this.clicks[index]).removeClass(this.inactiveClass); //remove the inactive class on the one that is active
    $(this.clicks[index]).addClass(this.activeClass); //add the active class on the one that is active

    if (this.active !== -1)
    {
      $(this.reveals[this.active]).hide(); //hide the active container
    }

    $(this.reveals[index]).show(); //show the newest container
  },

  /**
	helper for doing the show effect
	@method _showModern
	@protected
	@param {Node} obj node that was clicked on
	@param {Number} index index of the internal clicks array
	*/
  _showModern:function(obj,index)
  {
    this.inactivate(); //inactivate everything
    $(this.clicks[index]).removeClass(this.inactiveClass); //remove the inactive class on the one that is active
    $(this.clicks[index]).addClass(this.activeClass); //add the active class on the one that is active

    if (this.active !== -1)
    {
      $(this.reveals[this.active]).addClass('hide'); //hide the active container
    }

    $(this.reveals[index]).removeClass('hide'); //show the newest container
  },

  /**
	automatically show the first click and reveal
	@method showFirstReveal
	@public
	*/
  showFirstReveal:function()
  {
    $(this.clicks[0]).trigger('click'); //just trigger the click event
  },

  /**
	makes all the clicks have the inactive class
	@method inactivate
	@protected
	*/
  inactivate:function()
  {
    for (var i=0;i<this.clicks.length;i++)
    {
      $(this.clicks[i]).addClass(this.inactiveClass).removeClass(this.activeClass); //add the inactive class to each click
    }
  },

  /**
	checks to see if everything has been clicked on
	@method checkAllClicked
	@public
	@return {Boolean}
	*/
  checkAllClicked:function()
  {
    for (var i=0;i<this.clicked.length;i++) //for each container to click on
    {
      if (!this.clicked[i]) //if it has not been clicked on yet
      {
        return false;
      }
    }

    return true;
  },

  /**
	hide all the reveal containers
	@method hideReveals
	@public
	*/
  hideReveals:function()
  {
    for (var i=0;i<this.reveals.length;i++) //for each reveal container
    {
      if (this.modern)
      {
        $(this.reveals[i]).addClass('hide');
      }
      else
      {
        $(this.reveals[i]).hide(); //hide it
      }
    }
  },

  /**
	first function called when activity is created
	@event destroy
	@protected
	@override
	*/
  destroy:function()
  {
    for (var i=0;i<this.clicks.length;i++) //for each click container
    {
      $(this.clicks[i]).removeClass(this.activeClass).removeClass(this.inactiveClass); //remove the inactive class and activeClass
    }
  }
});
