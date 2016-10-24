var TimedHideAndSeekActivity = HideAndSeekActivity.extend({
  init:function(properties) //constructor
  {
    this._super(properties);
    
    var that = this;
    
    this.startButton = $(properties.startButton);
    this.stopButton = $(properties.stopButton);
    
    this.startButton.addClass(this.page.module.pointerClass).on('click',function(){
      that.start();
    });
    
    this.stopButton.addClass(this.page.module.pointerClass).on('click',function(){
      that.gaveUp();
      that.stop();
    });
    
    this.timerText = $(properties.timerText);
    
    this.timer = null;
    this.timerId = null;
  },
  created:function()
  {
    this._super();
    
    if (!this.complete)
    {
      this.startButton.show();
      this.stopButton.hide();
    }

    this._setMap(-1);
  },
  start:function()
  {
    this.current = 0;
    
    this.removeFoundClass();
    this.startTimer();
    this._setMap(this.current);
    this.startButton.hide();
    this.stopButton.show();
  },
  stop:function()
  {
    this.stopTimer();
    this.stopButton.hide();
    this.startButton.show();
  },
  startTimer:function()
  {
    var that = this;
    
    this.timer = new Timer();
    this.timerId = setInterval(function(){
      that._updateTimerText();
    },100);
  },
  stopTimer:function()
  {
    clearInterval(this.timerId);
    this.timer = null;
  },
  _updateTimerText:function()
  {
    var time = this.timer.elapsed();
    
    var sec = time/1000;
    
    this.timerText.text(sec.toFixed(1));
  },
  foundAll:function()
  {
    this._super();
    
    this.stop();
  },
  destroy:function()
  {
    this._super();
    
    this.stopTimer();
  }
});