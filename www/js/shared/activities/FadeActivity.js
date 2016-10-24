var FadeActivity = Activity.extend({
  init: function(properties)
  {
    this._super(properties);
    
    this.fadeIn = $(properties.fadeIn);
    this.fadeInDelay = properties.fadeInDelay || 1;
  },
  created: function()
  {
    this._super();
    
    var that = this;
    
    this.fadeIn.hide();
    
    this.animationDelays = [];
    this.animationDelays.push(
    setTimeout(function(){
      that.fade();
    }, this.fadeInDelay)
    );
  },
  fade: function()
  {
    this.fadeIn.fadeIn();
    this.activityComplete();
  },
  destroy: function()
  {
    this._super();
    
    for (var i = 0; i < this.animationDelays.length; i++){
      var delayID = this.animationDelays[i];
      clearTimeout(delayID);
    }
  }
});