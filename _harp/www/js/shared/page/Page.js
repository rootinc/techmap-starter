/**
Base Page - all pages inherit
@class Page
@extends Class
@author Dan Jewett
@updtes name is now required
@added el for identifying the dom element
@added concept of name, what page it points previously and next to
@updates refactored slightly for optimazatoin
@updates added support for afterDestroy
@version 3.0
@constructor
@param {Object} properties properties that the page uses
@param {Module} properties.module module pointer
@param {String} properties.el the element associated with the page
@param {Array} properties.facilitatorTexts array of fac texts
@param {Array} properties.titleTexts array of title texts
@param {String} [properties.name] the pretty name of the page (should be unique)
@param {String} [properties.group="default"] the group the page belongs too
@param {Number|String} [properties.previousPage] the previous page name or number that this page points too
@param {Number|String} [properties.nextPage] the next page name or number that this page points too
*/
var Page = Class.extend({
  init:function(properties) //constructor
  {     
    if (!properties)
    {
      throw new TypeError("You probably forgot to pass properties into the init function");
    }
    
    var that = this;
    
    /**
    module pointer
    @property module
    @type {Module}
    @protected
    */
    this.module = properties.module;
    
    /**
    the element associated with the page
    @property el
    @type {jQuery}
    @public
    */
    this.$el = $(properties.el);
    if (this.$el.length === 0)
    {
      throw new TypeError("No such selector "+this.$el.selector);
    }
    
    /**
    the pretty name of the page (should be unique)
    @property name
    @type {String}
    @public
    */
    if (!properties.name)
    {
      console.warn("Pages must have a name and generated name will be deprecated soon.");
    }
    this.name = properties.name || 'Page'+(Page.numberPages);
    Page.numberPages++;
    
    /**
    the group the page belongs too
    @property group
    @type {String}
    @public
    */
    this.group = properties.group || 'default';
    
    /**
    the previous page name or number that this page points too
    @property previousPage
    @type {Number|String|undefined}
    @public
    */
    this.previousPage = properties.previousPage || undefined;
    
    /**
    the next page name or number that this page points too
    @property nextPage
    @type {Number|String|undefined}
    @public
    */
    this.nextPage = properties.nextPage || undefined;
    
    /**
    activities pointer
    @property activities
    @type {Array}
    @public
    */
    this.activities = [];
    
    if (properties.facilatorTexts)
    {
      console.warn("Dan can't spell -- page.facilatorTexts is going to be deprecated soon.  Please use page.facilitatorTexts");
    }
    
    /**
    array of fac texts
    @property facilitatorTexts
    @type {Array}
    @public
    */
    this.facilitatorTexts = properties.facilitatorTexts;
    
    /**
    array of title texts
    @property titleTexts
    @type {Array}
    @public
    */
    this.titleTexts = properties.titleTexts;
    
    /**
    flag for determining if the page is completed
    @property complete
    @type {Boolean}
    @public
    */
    this.complete = false;
    
    /**
    which activities have been completed
    @property activitiesCompleted
    @type {Array}
    @protected
    */
    this.activitiesCompleted = [];
    
    //if there are activities
    if (properties.activitiesList)
    {
      for (var i = 0; i < properties.activitiesList.length; i++) //for each activity
      { 
        var activityInfo = properties.activitiesList[i]; //get the activity info
        activityInfo.properties.page = this; //attach this to the properties
        
        var activity;
        
        if (activityInfo.extend)
        {
          activity = window[activityInfo.name].extend(activityInfo.extend); //nice solution for doing couple line extensions in main
        }
        else
        {
          activity = window[activityInfo.name];
        }
        
        if (activity)
        {
          this.activities[i] = new activity(activityInfo.properties);
        }
        else
        {
          throw new TypeError("No activity named "+activityInfo.name);
        }
      }
    }
    
    this._resetActivites();

    //when a activity is completed, we trigger the on page complete function
    $(this).on(Activity.ACTIVITY_COMPLETE,function(e,activity){
      that._activityComplete(e,activity);
    });
  },
  
  /**
  first function called when page is created
  @event created
  @protected
  */
  created:function()
  {
    this._create();
  },
  
  /**
  called when activity is complete
  @event _activityComplete
  @param {Object} e the event
  @param {Activity} activity the activity
  @protected
  */
  _activityComplete:function(e,activity)
  {
    var index = this._findActivityIndex(activity); //get the index
    this.activitiesCompleted[index] = true; //set the internal activities completed array index to true

    if (this.checkActivitiesCompleted()) //if all the activites are completed
    {
      this.pageComplete(); //the page is complete
    }
  },
  
  /**
  boots up a page
  @protected
  @method _create
  */
  _create:function()
  {    
    this._resetActivites(); //reset all the activities to false (because it will get triggered as true in the activity if it is complete)     
    this._createActivities(); //call the created functions of the activity
    
    this.transitionIn();
    
    //if there are no activites
    if (this.activities.length === 0)
    {
      this.pageComplete(); //complete the page
    }
    
    this._changeTexts(); //change the title and facilitator texts
    
    this.setPreviousPagePointer(); //set the previous page pointer
    this.setNextPagePointer(); //set the next page pointer
  },
  
  /**
  resets the pages activities completion back to a false state
  @protected
  @method _resetActivites
  */
  _resetActivites:function()
  {
    //for each activity
    for (var i=0;i<this.activities.length;i++)
    {
      this.activitiesCompleted[i] = false; //set the activity being complete to false
    }
  },
  
  /**
  calls all the activites created function
  @protected
  @method _createActivities
  */
  _createActivities:function()
  {
    //for each activity
    for (var i=0;i<this.activities.length;i++)
    {
      this.activities[i].created(); //create the activity
    }
  },
  
  /**
  sets the page's previous page pointer
  @public
  @method setPreviousPagePointer
  */
  setPreviousPagePointer:function()
  {
    var that = this;
    
    if (this.previousPage) //if there is a previousPage
    {
      //call the modules override previous page function and have it goto that page
      this.module.overridePreviousPageButton(function(e){
        if (!this.isPreviousLocked()) //if it is not lcoked
        {
          this.gotoPage(that.previousPage);
        }
      });
    }
    else
    {
      //call the default functionality of the override previous page button (which will just have it go to the previous page)
      this.module.overridePreviousPageButton();
    }
  },
  
  /**
  sets the page's next page pointer
  @public
  @method setNextPagePointer
  */
  setNextPagePointer:function()
  {
    var that = this;
    
    if (this.nextPage) //if there is a nextPage
    {
      //call the modules override next page function and have it goto that page
      this.module.overrideNextPageButton(function(e){
        if (!this.isNextLocked()) //if it is not lcoked
        {
          this.gotoPage(that.nextPage);
        }
      });
    }
    else
    {
      //call the default functionality of the override next page button (which will just have it go to the next page)
      this.module.overrideNextPageButton();
    }
  },
  
  /**
  changes the facilitator texts and text titles to the first index of the facilitatorTexts and titleTexts array
  @protected
  @method _changeTexts
  */
  _changeTexts:function()
  {
    this.changeFacilitatorText(this.facilitatorTexts[0]); //change fac text
    this.changeTitleText(this.titleTexts[0]); //change title text
  },
  
  /**
  change the facilitator text to the specified txtId
  @public
  @method changeFacilitatorText
  @param {Number} txtId text id to be changed
  */
  changeFacilitatorText:function(txtId)
  {
    this.module.changeFacilitatorText(txtId); //call the parent module function
  },
  
  /**
  change the title text to the specified txtId
  @public
  @method changeTitleText
  @param {Number} txtId text id to be changed
  */
  changeTitleText:function(txtId)
  {
    this.module.changeTitleText(txtId); //call the parent module function
  },
  
  /**
  checks to see if all the activities are complete
  @method checkActivitiesCompleted
  @protected
  @return {Boolean} true if all the activities are complete
  */
  checkActivitiesCompleted:function()
  {
    for (var i=0;i<this.activitiesCompleted.length;i++) //for each activity that is completed
    {
      if (!this.activitiesCompleted[i]) //if it is not completed
      {
        return false; //they are not all completed
      }
    }
    
    return true; //they are all completed
  },
  
  /**
  finds an activity in the internal array
  @method _findActivityIndex
  @param {Activity} activity the activity object to find
  @protected
  @return {Number} index of where the activity exists (-1 if not found)
  */   
  _findActivityIndex:function(activity)
  {
    //for each activity
    for (var i=0;i<this.activities.length;i++)
    {
      if (this.activities[i] === activity) //if it is the activity
      {
        return i; //return the index
      }
    }
    
    return -1; //-1 means not found
  },
  
  /**
  call this function when activity is complete
  @method pageComplete
  @public
  */
  pageComplete:function()
  {
    this.complete = true; //page is completed
    $(this.module).trigger(Page.PAGE_COMPLETE,[this]); //trigger the page complete event
  },
  
  /**
  set the voice to the particular text id
  @method setVoice
  @param {Number} txtId text id to pass
  @public
  */
  setVoice:function(txtId) //set the voice to the particular text id
  {
    this.module.setVoice(txtId); //call the parent function
  },
  
  /**
  string the text ids together to play txt ids back to back
  @method setVoices
  @param {Array} txtIds array of text ids to pass
  @public
  */
  setVoices:function(txtIds)
  {
    this.module.setVoices(txtIds); //call the parent function
  },
  
  /**
  called when the page is destroyed
  @event destroy
  */
  destroy:function()
  {    
    //for each activity
    for (var i=0;i<this.activities.length;i++)
    {
      this.activities[i].destroy(); //destroy the activity
    }
    
    this.transitionOut();
  },
  
  transitionIn:function()
  {    
    this.$el.removeClass(this.module.hidePageClass).addClass(this.module.showPageClass);
  },
  
  transitionOut:function()
  {
    this.$el.removeClass(this.module.showPageClass).addClass(this.module.hidePageClass);
  }
});

/**
Used to bind when an page is complete
@static
@const PAGE_COMPLETE
@type {String}
*/
Page.PAGE_COMPLETE = 'PAGE_COMPLETE';

/**
Used to count number of pages (for naming)
@static
@property numberPages
@type {Number}
*/
Page.numberPages = 0;