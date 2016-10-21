/**
displays info in an accordion like fashion
@class AccordionActivity
@extends ClickRevealActivity
@author Dan Jewett
@constructor
@param {Object} properties properties that the activity uses
*/
var AccordionActivity = ClickRevealActivity.extend({
  init:function(properties) //constructor
  {
    this._super(properties); //call parent
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
    
    if (this.active === index)
    {
      this.active = -1;
    }
    else
    {
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
    }
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
    this.inactivate(); //inactivate everything
    $(this.clicks[index]).removeClass(this.inactiveClass); //remove the inactive class on the one that is active
    $(this.clicks[index]).addClass(this.activeClass); //add the active class on the one that is active

    if (this.active !== -1)
    {
      $(this.reveals[this.active]).slideUp(); //hide the active container
    }

    if (this.active !== index)
    {
      $(this.reveals[index]).slideDown(); //show the newest container
    }
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
    //show old way for now
    this.show(obj,index);
  }
});