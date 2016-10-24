/**
shows dom elements in a certain order
Note: if you use the effect show, it ignores duration for that animator
@class ShowActivity
@extends Activity
@author Dan Jewett
@version 1.01
@added initializeDelays function to better have this activity be extended
@constructor
@param {Object} properties properties that the activity uses
@param {Array} properties.animators array of selectors that are to animate
@param {Array} properties.delays array of delays.  Each delay is added to the previous one
@param {Function|Array} [properties.onShows] callbacks when something is shown (can be one function or array of functions)
@param {Function|Array} [properties.onCompletes] callbacks when the animation for an animator is complete (can be one function or array of functions)
@param {Array|Sring} [properties.effects='fade'] the jquery ui effect to use for each animator.  Default is fade.  Can be an array of strings
@param {Array|Number} [properties.durations=400] how long to do the effect to for each animator.  Default is 400.  Can be an array of numbers
@param {Array|Object} [properties.options={}] The properties to use for each animator.  Default is empty object.  Can be an array of objects
@param {Boolean} [properties.waitToComplete=false] if true, does all the animations before the activity is triggered as complete.  Default is false.
*/
var ShowActivity = Activity.extend({
  init:function(properties) //constructor
  {
    this._super(properties); //call parent
    
    /**
        array of selectors that are to animate
        @property animators
        @type Array
        @public
        */
    this.animators = properties.animators;
    
    /**
        array of delays.  Each delay is added to the previous one
        @property delays
        @type Array
        @public
        */
    this.delays = properties.delays;
    
    /**
        callbacks when something is shown (can be one function or array of functions)
        @property onShows
        @type Function|Array
        @protected
        */
    this.onShows = properties.onShows || undefined;
    
    /**
        the jquery ui effect to use for each animator.  Default is fade.  Can be an array of strings
        @property effects
        @type Array|Sring
        @protected
        */
    this.effects = properties.effects || 'fade';
    
    /**
        how long to do the effect to for each animator.  Defaul is 400.  Can be an array of numbers
        @property durations
        @type Array|Number
        @protected
        */
    this.durations = properties.durations || 400;
    
    /**
        The properties to use for each animator.  Default is empty object.  Can be an array of objects
        @property options
        @type Array|Object
        @protected
        */
    this.options = properties.options || {};
    
    /**
        callbacks when the animation for an animator is complete (can be one function or array of functions)
        @property onShows
        @type Function|Array
        @protected
        */
    this.onCompletes = properties.onCompletes || undefined;
    
    /**
        if true, does all the animations before the activity is triggered as complete.
        @property waitToComplete
        @type Boolean
        @public
        */
    this.waitToComplete = !!properties.waitToComplete || false;
    
    /**
        Where in the array on animators the show activity is currently at
        @property currentIndex
        @type Number
        @protected
        */
    this.currentIndex = 0;
    
    /**
        The queue of the timeout ids
        @property timeouts
        @type Array
        @protected
        */
    this.timeouts = [];
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
    
    this.currentIndex = 0; //start the index to 0
    $(this.animators.join(",")).hide(); //hide all the animators
    
    this.initializeDelays();
  },
  
  /**
    intializes the internal data structure of the delays
    @method initializeDelays
    @protected
    */
  initializeDelays:function()
  {
    var that = this;
    
    var totalDelay = 0; //local var to keep track of the total delay
    
    //for each animator
    for (var i=0;i<this.animators.length;i++)
    {
      totalDelay += this.delays[i]; //increment the totalDelay to the delays of the animators
      
      //push the timeout on the timeouts queue.
      this.timeouts.push(
        setTimeout(function(){
          that._show(); //show the thing
          that.currentIndex ++; //increment the index
          that.timeouts.shift();
        },totalDelay)
      );
    }
  },
  
  /**
    returns the index of effects. If effects is a string, just returns that
    @method _getEffect
    @param {Number} index the index to retrieve
    @protected
    @return {String}
    */
  _getEffect:function(index)
  {
    if (this.effects instanceof Array)
    {
      return this.effects[index];
    }
    else
    {
      return this.effects;
    }
  },
  
  /**
    returns the index of durations. If effects is a Number, just returns that
    @method _getDurations
    @param {Number} index the index to retrieve
    @protected
    @return {Number}
    */
  _getDuration:function(index)
  {
    if (this.durations instanceof Array)
    {
      return this.durations[index];
    }
    else
    {
      return this.durations;
    }
  },
  
  /**
    returns the index of options. If effects is a Object, just returns that
    @method _getOptions
    @param {Number} index the index to retrieve
    @protected
    @return {Object}
    */
  _getOption:function(index)
  {
    if (this.options instanceof Array)
    {
      return this.options[index];
    }
    else
    {
      return this.options;
    }
  },
  
  /**
    returns the index of onCompletes. If onComplete is a Function, just returns that
    @method _getComplete
    @param {Number} index the index to retrieve
    @protected
    @return {Function}
    */
  _getComplete:function(index)
  {
    if (this.onCompletes instanceof Array)
    {
      return this.onCompletes[index];
    }
    else
    {
      return this.onCompletes;
    }
  },
  
  /**
    Shows the current animator with the correct effect and duration
    @method _show
    @protected
    */
  _show:function()
  {
    var that = this;
    
    var index = this.currentIndex;
    
    var effect = this._getEffect(index); //get the effect
    var duration = this._getDuration(index); //get the duration
    var option = this._getOption(index); //get the option
    var complete = function(){
      var func = that._getComplete(index); //get the complete
      if (func !== undefined)
      {
        func.call(that);
      }
    };
    
    //bug in <= ie8
    if (effect === 'fade')
    {
      option.complete = complete;
      option.duration = duration;
      $(this.animators[index]).fadeIn(option);
    }
    else if (effect === 'show')
    {
      option.complete = complete;
      option.duration = 0;
      $(this.animators[index]).show(option);
    }
    else
    {
      $(this.animators[index]).show(effect,option,duration,complete);
    }
    
    if (this.onShows !== undefined) //if the onSHows property is defined
    {
      if (this.onShows[index] !== undefined) //if the onSHows property is an array
      {
        this.onShows[index].call(this,index); //call that array index
      }
      else
      {
        this.onShows.call(this,index); //call the one onShow method
      }
    }
    
    //if it is the last one
    if (index+1>=this.animators.length)
    {
      if (this.waitToComplete) //and we are to wait to complete the activity
      {
        this.activityComplete(); //complete the activity
      }
    }
  },
  
  /**
    called after activity should be fully initialized (everything is drawn)
    @event afterCreated
    @protected
    @override
    */
  afterCreated:function()
  {
    this._super();
    
    if (!this.waitToComplete)
    {
      this.activityComplete();
    }
  },
  
  /**
    called when the activity is destroyed
    @event destroy
    @protected
    @override
    */
  destroy:function()
  {
    this._super();
    
    //get rid of all the timeouts
    while (this.timeouts.length > 0)
    {
      clearTimeout(this.timeouts.shift());
    }
  }
});