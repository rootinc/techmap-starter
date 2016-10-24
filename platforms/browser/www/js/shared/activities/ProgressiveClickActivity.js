/**
click on stuff in a certain order and reveal new stuff
@class ProgressiveClickActivity
@extends ClickRevealActivity
@author Dan Jewett
@constructor
@param {Object} properties properties that the activity uses
*/
var ProgressiveClickActivity = ClickRevealActivity.extend({
  init:function(properties) //constructor
  {
    this._super(properties);

    /**
        current index of the thing to click on
        @property currentIndex
        @type Number
        @public
        */
    this.currentIndex = 0;
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

    this.currentIndex = 0; //set the current index to 0

    $(this.clicks.join(", ")).hide(); //hide all the clicks
    $(this.clicks[this.currentIndex]).show(); //show the first click
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
    @override
    @param {Node} obj node that was clicked on
    @param {Number} index index of the internal clicks array
    */
  _showModern:function(obj,index)
  {
    $(this.clicks[index]).removeClass(this.inactiveClass); //remove the inactive class on the one that is active
    $(this.clicks[index]).addClass(this.activeClass); //add the active class on the one that is active

    if (this.active !== -1)
    {
      $(this.reveals[this.active]).addClass('hide'); //hide the active container
    }

    $(this.reveals[index]).removeClass('hide'); //show the newest container
  },

  /**
    event for when the object is clicked on
    @event _clicked
    @override
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

    this._show(obj,index);

    this.active = index; //the new active is now the index
    this.clicked[index] = true; //we have clicked on the newest container

    if (this.onReveals !== undefined) //if the onReveals property is defined
    {
      if (this.onReveals[index] !== undefined) //if the onReveals property is an array
      {
        this.onReveals[index].call(this); //call that array index
      }
      else
      {
        this.onReveals.call(this,index); //call the one onReveal method
      }
    }

    this._onRevealHide();

    if (!this.complete && this.checkAllClicked()) //if we have clicked them all and the page has not been completed
    {
      if (this.onClickAll !== undefined) //if there is an onClickALl callback
      {
        this.onClickAll.call(this); //call it
      }
    }
  },

  /**
    increments the current index, shows the next thing, completes the activity if the user clicked them all
    @method _onRevealHide
    @protected
    */
  _onRevealHide:function()
  {
    if (this.currentIndex + 1 < this.clicks.length)
    {
      this.currentIndex ++;
      $(this.clicks[this.currentIndex]).show();
    }
    else if (!this.complete && this.checkAllClicked()) //if we have clicked them all and the page has not been completed
    {
      this.activityComplete(); //complete the page
    }
  }
});
