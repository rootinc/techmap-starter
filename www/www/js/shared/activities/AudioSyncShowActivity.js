/**
shows dom elements in a certain order, based on audio cues
@class AudioSyncShowActivity
@extends ShowActivity
@author Dan Jewett
@version 1.0
@constructor
@param {Object} properties properties that the activity uses
*/
var AudioSyncShowActivity = ShowActivity.extend({
  init:function(properties) //constructor
  {
    this._super(properties); //call parent
    
    /**
        The audio file to playback. It is optional.  If there is no audio file, assumed to be in sync with the supplied fac text of the page
        @property [audioToPlay]
        @type String
        @protected
        */
    this.audioToPlay = properties.audioToPlay || undefined;
    
    var that = this;
    //bind the audio player so that whenever it receives audio time updates, it will call the internal onTimeUpdate function
    $(Audio).on(Audio.TIME_UPDATE,function(e,data){
      that._onTimeUpdate(data);
    });
    
    /**
        The queue of the internal delays used to shoot off the thing to show
        @property internalDelays
        @type Array
        @protected
        */
    this.internalDelays = [];
  },
  
  /**
    first function called when activity is created
    @event created
    @protected
    @override
    */
  created:function()
  {
    this.internalDelays = []; //reset the internal delays everytime the activity is created
    
    this._super();
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
    
    if (this.audioToPlay) //if there is audio to play
    {
      Audio.play(this.page.module.audioPath,this.audioToPlay); //play the audio file
    }
  },
  
  /**
    intializes the internal data structure of the delays
    @method initializeDelays
    @protected
    @override
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
      function(){
        that._show(); //show the thing
        that.currentIndex ++; //increment the index
        that.timeouts.shift();
      }
      );
      
      //in this case, we want to control the internal delays being triggered when we get an update from the audio player
      this.internalDelays.push(totalDelay);
    }
  },
  
  /**
    when we can an update from the audio player
    @event _onTimeUpdate
    @param {Object} data jPlayer event object
    @protected
    */
  _onTimeUpdate:function(data)
  {
    var currentTime = data.jPlayer.status.currentTime*1000; //get the current time of jPlayer and multiply it by 1000
    
    while (currentTime >= this.internalDelays[0]) //if the currentTime is greater than or equal to the delay time
    {
      //then we need to show our thing
      var func = this.timeouts[0]; //get the func
      func(); //call it
      this.internalDelays.shift(); //dequeue the internal delay
    }
  }
});