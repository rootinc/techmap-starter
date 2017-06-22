/**
Activity - all activities inherit
@class Activity
@extends Class
@author Dan Jewett
@version 1.2
@updates - supports sending information to activities within the same page, and not on the same page
@constructor
@param {Object} properties properties that the activity uses
@param {Boolean} [properties.autoComplete] whether to autoComplete the  activity
@param {Page} properties.page page pointer (get's set dynamically)
*/
var Activity = Class.extend({
  init:function(properties) //constructor
  {     
    if (!properties)
    {
      throw new TypeError("You probably forgot to pass properties into the init function");
    }
    
    /**
    flag for determining if the page is completed
    @property autoComplete
    @type Boolean
    @public
    */
    this.autoComplete = properties.autoComplete === undefined ? false : properties.autoComplete;
    
    /**
    flag for determining if the page is completed
    @property complete
    @type Boolean
    @public
    */
    this.complete = false;
    
    if (properties && properties.page) {
      this.page = properties.page; //set the page pointer
    }
  },
  
  /**
  first function called when activity is created
  @event created
  @protected
  */
  created:function()
  {
    if (this.complete || this.autoComplete) //if the activity has already been completed, or it is to be autoCompleted
    {
      this.activityComplete();//trigger that the activity is completed
    }
  },
  
  /**
  changes the facilator text to the certain id
  @method changeFacilitatorText
  @param {Number} txtId text id to pass
  @public
  */
  changeFacilitatorText:function(txtId)
  {
    this.page.changeFacilitatorText(txtId); //call the parent page function
  },
  
  /**
  change the title text to the specified txtId
  @public
  @method changeTitleText
  @param {Number} txtId text id to be changed
  */
  changeTitleText:function(txtId)
  {
    this.page.changeTitleText(txtId); //call the parent page function
  },
  
  /**
  call this function when activity is complete
  @method activityComplete
  @public
  */
  activityComplete:function()
  {
    this.complete = true; //activity is completed
    $(this.page).trigger(Activity.ACTIVITY_COMPLETE,[this]); //trigger the activity complete event
  },
  
  /**
  prefills the activity to appear completed
  @method prefill
  @public
  */
  prefill:function(){},
  
  /**
  set the voice to the particular text id
  @method setVoice
  @param {Number} txtId text id to pass
  @public
  */
  setVoice:function(txtId)
  {
    this.page.setVoice(txtId); //call the parent function
  },
  
  /**
  string the text ids together to play txt ids back to back
  @method setVoices
  @param {Array} txtIds array of text ids to pass
  @public
  */
  setVoices:function(txtIds)
  {
    this.page.setVoices(txtIds); //call the parent function
  },
  
  /**
  shorthand: send data to another activity within a page
  @method send
  @param {String} name event name to pass
  @param {Object} data any data to pass to the receiver
  @public
  */
  send:function(name,data)
  {
    this.sendToPage(name,data);
  },
  
  /**
  shorthand: receive data from another activity within a page
  @method receive
  @param {String} name event name to pass
  @param {Function} func callback function
  @public
  */
  receive:function(name,func)
  {
    this.receiveFromPage(name,func);
  },
  
  /**
  shorthand: receive data once from another activity within a page
  @method receiveOnce
  @param {String} name event name to pass
  @param {Function} func callback function
  @public
  */
  receiveOnce:function(name,func)
  {
    this.receiveOnceFromPage(name,func);
  },
  
  /**
  shorthand: stop receive data once from another activity within a page
  @method stopReceiving
  @param {String} name event name to stop receving
  @public
  */
  stopReceiving:function(name)
  {
    this.stopReceivingFromPage(name);
  },
  
  /**
  send data to another activity within a page
  @method sendToPage
  @param {String} name event name to pass
  @param {Object} data any data to pass to the receiver
  @public
  */
  sendToPage:function(name,data)
  {
    $(this.page).trigger(name,[data]);
  },
  
  /**
  receive data from another activity within a page
  @method receiveFromPage
  @param {String} name event name to pass
  @param {Function} func callback function
  @public
  */
  receiveFromPage:function(name,func)
  {
    $(this.page).on(name,func);
  },
  
  /**
  receive data once from another activity within a page
  @method receiveOnceFromPage
  @param {String} name event name to pass
  @param {Function} func callback function
  @public
  */
  receiveOnceFromPage:function(name,func)
  {
    $(this.page).one(name,func);
  },
  
  /**
  stop receive data once from another activity within a page
  @method stopReceivingFromPage
  @param {String} name event name to stop receving
  @public
  */
  stopReceivingFromPage:function(name)
  {
    $(this.page).off(name);
  },
  
  /**
  send data to another activity within a module
  @method sendToModule
  @param {String} name event name to pass
  @param {Object} data any data to pass to the receiver
  @public
  */
  sendToModule:function(name,data)
  {
    $(this.page.module).trigger(name,[data]);
  },
  
  /**
  receive data from another activity within a module
  @method receiveFromModule
  @param {String} name event name to pass
  @param {Function} func callback function
  @public
  */
  receiveFromModule:function(name,func)
  {
    $(this.page.module).on(name,func);
  },
  
  /**
  receive data once from another activity within a module
  @method receiveOnceFromModule
  @param {String} name event name to pass
  @param {Function} func callback function
  @public
  */
  receiveOnceFromModule:function(name,func)
  {
    $(this.page.module).one(name,func);
  },
  
  /**
  stop receive data once from another activity within a module
  @method stopReceivingFromModule
  @param {String} name event name to stop receving
  @public
  */
  stopReceivingFromModule:function(name)
  {
    $(this.page.module).off(name);
  },
  
  /**
  Returns if the lms is active
  @method isDataActive
  @protected
  @return {Boolean}
  */
  isDataActive:function()
  {
    return this.page.module.lmsActive;
  },
  
  /**
  Returns if the key exists in the misc data object
  @method checkData
  @param {String} key the key to the misc data
  @protected
  @return {Boolean}
  */
  checkData:function(key)
  {
    return this.page.module.miscData[key] !== undefined; //bug fix for data that is 0
  },
  
  /**
  loads data from the lms
  @method loadData
  @param {String} key the lms key to load
  @protected
  @return {Object}
  */
  loadData:function(key)
  {
    if (this.isDataActive() && this.checkData(key)) //if the lms is active and there is a lms key
    {
      return this.page.module.miscData[key]; //return the data
    }
    else
    {
      return undefined; //else return undefined
    }
  },
  
  /**
  saves data to the lms
  @method saveData
  @param {String} key the lms key to save
  @param {Object} value the lms value to save
  @protected
  */
  saveData:function(key,value)
  {
    if (this.isDataActive()) //if the lms is active
    {
      this.page.module.miscData[key] = value; //set the misc data object to the value
      this.page.module.setMiscData(); //set it
    }
  },
  
  /**
  remove data from lms
  @method removeData
  @param {String} key the lms key to remove
  @protected
  */
  removeData:function(key)
  {
    if (this.isDataActive() && this.checkData(key)) //if the lms is active and there is a lms key
    {
      delete this.page.module.miscData[key]; //remove the data
      this.page.module.setMiscData(); //set it
    }
  },
  
  /**
  called when the activity is destroyed
  @event destroy
  @protected
  */
  destroy:function(){},
});

/**
Used to bind when an activity is complete
@static
@const ACTIVITY_COMPLETE
@type {String}
*/
Activity.ACTIVITY_COMPLETE = 'ACTIVITY_COMPLETE';