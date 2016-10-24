/**
Base class used to play audio files.  It is a wrapper around jPlayer
@class Audio
@extends Class
@constructor
@param {String} player jquery string of the player
@param {String} swf path to the swf player
@param {String} ext extenions used for playback
@author Dan Jewett
@version 1.2
@added Added pause function
@added Added event for time updates
@updated Fixed bug in ended event for playback.  Reference to this not there.
@updated Added isMuted and isPlaying functions.  Also added muted and unmuted events
*/
var Audio = Class.extend({
  init:function(player,swf,ext)
  {
    var that = this;
    
    /**
    audio player jquery instance
    @property audioPlayer
    @type String
    @protected
    */
    this.audioPlayer = player;
    
    /**
    whether the audio player is ready or not
    @property ready
    @type Boolean
    @protected
    */
    this.ready = false;
    
    /**
    the supplied extension used for this audio player (.mp3, .ogg, etc)
    @property supplied
    @type String
    @protected
    */
    this.supplied = ext;
    
    /**
    flag to determine if audio player is muted
    @property isMuted
    @type Boolean
    @protected
    */
    this.isMuted = false;
    
    /**
    flag to determine if audio player is playing
    @property isPlaying
    @type Boolean
    @protected
    */
    this.isPlaying = false;
    
    this.isPaused = false;

    //initialize the audio plyaer with jplayer
    $(this.audioPlayer).jPlayer({
      ready:function(){
        that.ready = true;
        $(Audio).trigger(Audio.MEDIA_READY); //trigger the audio player is ready
      },
      error: function(e){ //error handler
        if (e.jPlayer.error.type !== $.jPlayer.error.URL) //only listen for fatal errors
        {
          $(Audio).trigger(Audio.ERROR);
          console.error("jPlayer error: ",e.jPlayer.error.message,e.jPlayer.error.type,e.jPlayer.error.hint);
        }
      },
      wmode:"window", //fixes VERY strange bug in IE8 for certain clients
      swfPath: swf,
      supplied: ext,
      solution: 'flash, html',
      noFullScreen: {all: /.*/}
    });
  },
  
  /**
  when the audio instance has a timeupdate
  @method timeupdate
  @param {Object} e event object
  @protected
  */
  timeupdate:function(e)
  {
    $(Audio).trigger(Audio.TIME_UPDATE,e); //trigger media time update
  },
  
  /**
  when the audio instance is has ended
  @method ended
  @param {Object} e event object
  @protected
  */
  ended:function(e)
  {
    $(this.audioPlayer).off($.jPlayer.event.timeupdate); //unbind the audio event
    
    this.isPlaying = false; //audio is no longer playing
    $(Audio).trigger(Audio.MEDIA_ENDED); //trigger media ended event
  }
});

/**
initializes the audio player
@static
@public
@method init
@param {String} player jquery string
@param {String} swf path to the jplayer swf
@param {String} ext extensions used to playback
*/
Audio.init = function(player,swf,ext)
{
  if (Audio.instance === undefined) //if there is no audio instance
  {
    Audio.instance = new Audio(player,swf,ext); //make an audio instance
  }
};

/**
getter for audio is ready
@static
@public
@method ready
@return {Boolean}
*/
Audio.ready = function()
{
  if (Audio.instance === undefined)
  {
    return false;
  }
  
  return Audio.instance.ready;
};

/**
getter for audio is playing
@static
@public
@method isPlaying
@return {Boolean}
*/
Audio.isPlaying = function()
{
  if (Audio.instance === undefined)
  {
    return false;
  }
  
  return Audio.instance.isPlaying;
};

Audio.isPaused = function()
{
  if (Audio.instance === undefined)
  {
    return false;
  }
  
  return Audio.instance.isPaused;
};

/**
getter for audio is muted
@static
@public
@method isPlaying
@return {Boolean}
*/
Audio.isMuted = function()
{
  if (Audio.instance === undefined)
  {
    return true;
  }
  
  return Audio.instance.isMuted;
};

/**
plays an audio file
@static
@public
@method play
@param {String} [filename] file name with path and extension
*/
Audio.play = function(filename)
{
  if (Audio.instance && Audio.instance.ready) //if audio player is ready
  {
    if(!Audio.instance.isMuted) //if it is not muted
    {
      Audio.instance.isPlaying = true; //audio player is now playing
      
      if (Audio.instance.isPaused)
      {
        if (filename === undefined)
        {
          $(Audio.instance.audioPlayer).jPlayer('play'); //continue playing the audio with jplayer
        }
      }
      else
      {
        if (filename === undefined)
        {
          throw new TypeError("Audio player is not paused and play function doesn't have a file to play");
        }
        
        //queue audio with jplayer
        $(Audio.instance.audioPlayer).jPlayer('setMedia', {
          mp3: filename
        });

        //play audio with jplayer
        $(Audio.instance.audioPlayer).jPlayer('play');

        //bind the ended event once
        $(Audio.instance.audioPlayer).one($.jPlayer.event.ended,function(e){
          Audio.instance.ended(e);
        });

        //bind the ended event once
        $(Audio.instance.audioPlayer).on($.jPlayer.event.timeupdate,function(e){
          Audio.instance.timeupdate(e);
        });
      }
      
      Audio.instance.isPaused = false;
    }
  }
};

/**
pauses an audio file
@static
@public
@method pause
*/
Audio.pause = function() //toggles the pause the aduio file
{
  if (Audio.instance && Audio.instance.ready) //if the audio player is ready
  {
    if (Audio.instance.isPlaying && !Audio.instance.isPaused) //if there is something playing and it isn't paused
    {
      $(Audio.instance.audioPlayer).jPlayer('pause'); //pause the audio with jplayer
      
      Audio.instance.isPaused = true;
    }
  }
};

/**
stops an audio file
@static
@method stop
@public
*/
Audio.stop = function() //sotps the audio file
{
  if (Audio.instance && Audio.instance.ready) //if the audio player is ready
  {
    if (Audio.instance.isPlaying) //if there is something playing
    {
      $(Audio.instance.audioPlayer).jPlayer('stop'); //stop the audio with jplayer
      $(Audio.instance.audioPlayer).off($.jPlayer.event.ended); //unbind the audio ended event
      $(Audio.instance.audioPlayer).off($.jPlayer.event.timeupdate); //unbind the audio t event
      
      Audio.instance.isPlaying = false; //audio is no longer playing
      Audio.instance.isPaused = false;
    }
  }
};

/**
mutes the audio player (ios is stupid, cant actually mute audio files, so it stops the file)
@static
@method mute
@public
*/
Audio.mute = function()
{
  if (Audio.instance && Audio.instance.ready) //if the audio player is ready
  {
    if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) //ios is stupid, cant actually mute audio files
    {
      Audio.stop(); //stop the audio from playing in iOS
    }
    else
    {
      $(Audio.instance.audioPlayer).jPlayer("mute"); //otherwise, just use jplayer mute
    }
    
    Audio.instance.isMuted = true; //it is muted
    $(Audio).trigger(Audio.MUTED); //trigger the audio unmuted
  }
};

/**
unmutes the audio player
@static
@method unmute
@public
*/
Audio.unmute = function() //unmutes the audio file
{
  if (Audio.instance && Audio.instance.ready) //if audio player is ready
  {
    Audio.instance.isMuted = false; //audio is no longer muted
    $(Audio.instance.audioPlayer).jPlayer("unmute"); //unmute jplayer, ios fails fine
    
    $(Audio).trigger(Audio.UNMUTED); //trigger the audio unmuted
  }
};

/**
media ready event
@static
@const MEDIA_READY
@type {String}
*/
Audio.MEDIA_READY = "MEDIA_READY";

/**
media time update event event
@static
@const TIME_UPDATE
@type {String}
*/
Audio.TIME_UPDATE = "TIME_UPDATE";

/**
media ended event
@static
@const MEDIA_ENDED
@type {String}
*/
Audio.MEDIA_ENDED = "MEDIA_ENDED";

/**
media muted event
@static
@const MUTED
@type {String}
*/
Audio.MUTED = "MEDIA_MUTED";

/**
media unmuted event
@static
@const UNMUTED
@type {String}
*/
Audio.UNMUTED = "MEDIA_UNMUTED";

/**
error event
@static
@const ERROR
@type {String}
*/
Audio.ERROR = "AUDIO_ERROR";