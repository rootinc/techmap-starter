var Animation = Class.extend({
  init:function(properties)
  {   
    this.duration = properties.duration;
    if (!this.duration)
    {
      throw new TypeError("The duration of the animation must be specified");
    }
    
    this.animators = properties.animators;
    if (!this.animators)
    {
      throw new TypeError("Animators must be specifed in order for the animation to work");
    }
    
    this.timeouts = {}; //hash where all the timeouts live
  },
  
  play:function()
  {
    //for each animator
    for (var i=0;i<this.animators.length;i++)
    {
      var animator = this.animators[i]; //get the animator
      var timeline = animator.timeline; //get the timelin
      if (!timeline)
      {
        throw new TypeError("Animator must have a timeline");
      }
      
      var initial = animator.initial; //get the intial css object
      if (!initial)
      {
        throw new TypeError("Animator must have an initial css object");
      } 
      
      if (!animator.selector)
      {
        throw new TypeError("Animator must have a selector");
      }
      var $el = $(animator.selector);//get the jquery el
      
      $el.css(initial); //initialize the el
      
      var startDelay = 0; //sequential timing
      var lastStartTime = undefined; //the current start time needs to be larger than the last start time
      
      for (var j=0;j<timeline.length;j++)
      {
        var step = timeline[j]; //get the current step of the timeline
        var startTime = step.startTime; //get the startTime
        if (!startTime)
        {
          throw new TypeError("Timeline must contain startTime"); 
        }
        
        var endTime = step.endTime; //get the optional endTime
        var css = step.css; //get the optional css animation
        var effect = step.effect; //get the optional effect
        var complete = step.complete; //get the optional complete function
        
        if (lastStartTime !== undefined && startTime <= lastStartTime)
        {
          throw new TypeError("startTime must be sequential larger than the previous startTime");
        }
        
        var duration; //the duration of the animation
        
        startDelay += (startTime*1000) - startDelay; //the delay is the last delay plus the new startTime

        if (endTime) //if there is an endTime specified
        {
          duration = (endTime*1000)-(startTime*1000); //set the duration to the endTime - startTime
        } 
        else if (timeline[j+1] && timeline[j+1].startTime) //else if the next timeline object startTime exists
        {
          duration = (timeline[j+1].startTime*1000)-(startTime*1000); //set the duration to the next startTime - current startTime
        }
        else
        {
          duration = (this.duration*1000)-(startTime*1000); //set the duration main duration - current start time
        }
        
        //queue the animation
        this._play({
          $el:$el,
          css:css,
          effect:effect,
          duration:duration,
          delay:startDelay,
          complete:complete
        });
      }
    }
  },
  
  //queues the animations essentially
   _play:function(obj)
  {
    var that = this;
    
    var tid = setTimeout(function(){  
      if (obj.css) //if the css object exists
      {
        //animate the css object
        obj.$el.animate(obj.css,{
        duration:obj.duration,
        complete:obj.complete
        });
      }
      
      if (obj.effect) //if the effect string exists
      {
        if (obj.effect === 'fade') //if the effect is fade
        {
          if (obj.$el.is(':visible')) //if the el is visible
          {
            //fade it out
            obj.$el.fadeOut({
            duration:obj.duration,
            complete:obj.complete
            });
          }
          else
          {
            //fade it in
            obj.$el.fadeIn({
            duration:obj.duration,
            complete:obj.complete
            });
          }
        }
        else if (obj.effect === 'show' || obj.effect === 'hide') //if the effect is show or hide
        {
          if (obj.$el.is(':visible')) //if the el is visible
          {
            //hide it
            obj.$el.hide({
            duration:0,
            complete:obj.complete
            });
          }
          else
          {
            //show it
            obj.$el.show({
            duration:0,
            complete:obj.complete
            });
          }
        }
        else //doing a jquery ui effect
        {
          //if the el is visible
          if (obj.$el.is(':visible'))
          {
            //hide it
            obj.$el.hide({
            effect:obj.effect,
            duration:obj.duration,
            complete:obj.complete
            })
          }
          else
          {
            //show it
            obj.$el.show({
            effect:obj.effect,
            duration:obj.duration,
            complete:obj.complete
            })
          }
        }
      }
      
      delete that.timeouts[tid];
    },obj.delay); //set the timeout to the delay
    
    this.timeouts[tid] = true; //hash the timeout
  },
  
  clearTimeouts:function()
  {
    for (var i in this.timeouts)
    {
      clearTimeout(i);
      delete this.timeouts[i];
    }
  },
  
  stopAnimators:function()
  {
    for (var i=0;i<this.animators.length;i++)
    {
      var animator = this.animators[i];
      var $el = $(animator.selector);
      $el.stop(true,true);
    }
  },
  
  stop:function()
  {
    this.clearTimeouts();
    this.stopAnimators();
  }
});