/**
used to specifically play videos.  Wraps around jPlayer
@class VideoActivity
@extends Activity
@author Dan Jewett
@version 1.06
@fixes fix bug where no poster is passed, just don't supply it to the player obj
@updated added intializing and setMedia flags to fix bug
@updated added functions _videoEnd and _videoError
@fixes event errors by default only complete page if it is a video playback problem.  Aslo added path var and is now smart enough to look at ./ (HTML 5) or ../ (Flash)
@updated added volume mute and unmute event from Audio Button on module
@constructor
@param {Object} properties properties that the activity uses 
@param {String} properties.videoContainer video container (wrapper) class
@param {String} properties.videoPlayer video player (the player)
@param {String} properties.swf jplayer swf location
@param {String} properties.size size of the player ("640x480")
@param {String} properties.path the path to the videos
@param {Array} properties.videos array of videos to play
@param {Array} properties.posters array of posters for the videos
@param {String} properties.interface the jquery selector of the jplayer interface
@param {Boolean} [properties.autoLoad=true] whether to autoload the video
*/
var VideoActivity = Activity.extend({
  init:function(properties) //constructor
  {
    this._super(properties); //call the parent
    
    /**
        video container (wrapper) class
        @property videoContainer
        @type String
        @protected
        */
    this.videoContainer = properties.container;
    
    /**
        videoPlayer video player (the player)
        @property videoPlayer
        @type jQuery
        @protected
        */
    this.videoPlayer = $(properties.player);
    
    /**
        jplayer swf location
        @property swf
        @type String
        @protected
        */
    this.swf = properties.swf;
    
    /**
        size of the player ("640x480")
        @property size
        @type String
        @protected
        */
    this.size = properties.size;
    
    /**
        the path to the videos
        @property path
        @type String
        @protected
        */
    this.path = properties.path;
    
    /**
        array of videos to play
        @property videos
        @type Array
        @public
        */
    this.videos = properties.videos;
    
    /**
        array of posters for the videos
        @property posters
        @type Array
        @public
        */
    this.posters = properties.posters;
    
    /**
        whether the video player is ready or not
        @property ready
        @type Boolean
        @protected
        */
    this.ready = false;
    
    /**
        whether the player is trying to initialize
        @property initializing
        @type Boolean
        @protected
        */
    this.initializing = false;
    
    /**
        whether the player has video on the queue
        @property setMedia
        @type Boolean
        @protected
        */
    this.setMedia = false;
    
    /**
        the interface of jplayer
        @property interface
        @type jQuery
        @protected
        */
    this.interface = $(properties.interface);
    
    /**
        whether to auto load the first video
        @property autoLoad=true
        @type Boolean
        @protected
        */
    this.autoLoad = properties.autoLoad === undefined ? true : properties.autoLoad;
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
    
    if (this.autoLoad)
    {
      this.queueVideo(0);
      this.interface.hide();
    }
  },
  
  /**
    initializes jplayer
    @method initJPlayer
    @param {Function} [callback] if another video function is called and the player is not ready, that function gets passed
    @param {Obj} [data] if another video funciton is called and the player is not ready, those args get passed
    @protected
    */
  initJPlayer:function(callback,data)
  {
    var that = this;
    
    //initialize jplayer
    this.videoPlayer.jPlayer({
  ready: function () {
        that.initializing = false;
        that.ready = true;
        callback && callback.call(that,data);
      },
  error: function(e){ //error handler
        console.error("jPlayer error: ",e.jPlayer.error.message,e.jPlayer.error.type,e.jPlayer.error.hint);
        that._videoError();
      },
      solution: 'flash, html',
      swfPath: that.swf,
      supplied: 'm4v',
      size: this.size,
      volume:Audio.isMuted() ? 0 : 1,
      cssSelectorAncestor: this.videoContainer
    });
    
    this.initializing = true;
    
    //bind mute control
    $(Audio).on(Audio.MUTED,function(){
      that.videoPlayer.jPlayer("volume",0);
    });
    
    //bind unumute control
    $(Audio).on(Audio.UNMUTED,function(){
      that.videoPlayer.jPlayer("volume",1);
    });
    
    //when the video has ended, the page is complete
    this.videoPlayer.on($.jPlayer.event.ended,function(){
      that._videoEnd();
    });
    
    //if there is an error playing the vidoe, the page is complete
    this.videoPlayer.on($.jPlayer.event.error,function(e){
      if (e.jPlayer.error.type === $.jPlayer.error.NO_SUPPORT || e.jPlayer.error.type === $.jPlayer.error.URL) //only do errors of bad playback
      {
        that._videoError();
      }
    });
    
    //when the video plays, we should stop the audio player, so it is not annoyingly playing something twice.
    this.videoPlayer.on($.jPlayer.event.play,function(){
      that._videoBegin();
    });
  },
  
  /**
    checks if the device is Flash compatible
    @method checkSolutionIsFlash
    @public
    @return {Boolean}
    */
  checkSolutionIsFlash:function()
  {
    return $.jPlayer.prototype._checkForFlash(10);
  },
  
  /**
    checks if the device is HTML5 compatible
    @method checkSolutionIsFlash
    @public
    @return {Boolean}
    */
  checkSolutionIsHTML:function()
  {
    return !$.jPlayer.prototype._checkForFlash(10);
  },
  
  /**
    this event is fired when the video starts playing.
    @event _videoBegin
    @protected
    */
  _videoBegin:function()
  {
    Audio.stop();
    this.interface.show();
  },
  
  /**
    this event is fired when the video has ended.  By default, complete the activity.
    @event _videoEnd
    @protected
    */
  _videoEnd:function()
  {
    this.activityComplete();
  },
  
  /**
    this event is fired when the video has errored.  By default, complete the activity.
    @event _videoErrors
    @protected
    */
  _videoError:function()
  {
    this.activityComplete();
  },
  
  /**
    queues the specific index for playback
    @method queueVideo
    @param {Number} index the index of the video to queued
    @public
    */
  queueVideo:function(index)
  {
    var that = this;
    
    if (this.ready) //if the player is ready
    {
      var jObj = {
        m4v: that.path+that.videos[index]
      };
      
      //fix bug where no poster is passed, just don't supply it
      if (that.posters[index])
      {
        jObj['poster'] = "./"+that.path+that.posters[index];
      }
      
      //queue the video
      this.videoPlayer.jPlayer("setMedia",jObj);
      
      this.setMedia = true;
    }
    else if (!this.initializing)
    {
      //initialize jplayer, and callback the queuing function
      this.initJPlayer(this.queueVideo,index);
    }
  },
  
  /**
    plays the video that you already queued
    @method playVideo
    @public
    */
  playVideo:function()
  {
    if (this.ready) //if the player is ready
    {
      if (this.setMedia)
      {
        this.videoPlayer.jPlayer("play"); //play the video
      }
      else
      {
        console.error("Error playing. Please use the queue function first.");
      }
    }
    else if (!this.initializing)
    {
      this.initJPlayer(this.playVideo); //initialize jplayer, and callback the play function
    }
  },
  
  /**
    stops the jplayer video
    @method stopVideo
    @public
    */
  stopVideo:function()
  {
    if (this.ready) //if the player is ready
    {
      this.videoPlayer.jPlayer("stop"); //stop the video
      this.setMedia = false;
    }
    else if (!this.initializing)
    {
      this.initJPlayer(this.stopVideo); //initialize jplayer, and callback the stop function
    }
  },
  
  /**
    queues and playsback the specific video file
    @method queueAndPlayVideo
    @param {Number} index the index of the video to be queued
    @public
    */
  queueAndPlayVideo:function(index)
  {
    if (this.ready) //if the player is ready
    {
      this.queueVideo(index); //queue the index
      this.playVideo(); //play the video
    }
    else if (!this.initializing)
    {
      this.initJPlayer(this.queueAndPlayVideo,index); //initialize jplayer, and callback the queue and play function
    }
  },
  
  /**
    kills the instance of jplayer
    @method die
    @public
    */
  die:function()
  {
    this.stopVideo(); //stop the video
    this.videoPlayer.jPlayer("destroy"); //destroy jplayer
    this.ready = false;  //player is not ready anymore
    this.initializing = false; //fix bug - since we just called videoPlayer destroy, we are no longer initializing anymore.
    //If we go through the pages really fast, we can trigger the initialzing of jplayer, but since we destroy it, we no longer can initialize again.
  },
  
  /**
    called when the activity is destroyed
    @event destroy
    @protected
    @override
    */
  destroy:function()
  {
    this._super(); //call parent
    
    this.die(); //kill jplayer
  }
});