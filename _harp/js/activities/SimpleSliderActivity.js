var SimpleSliderActivity = Activity.extend({
  init:function(properties)
  {
    var that = this;
    
    this._super(properties);
    
    this.axis = properties.axis;
    this.$slider = $(properties.slider);
    
    this.$handle = this.$slider.find(properties.handle);
    this.$level = this.$slider.find(properties.level);
    this.$percentage = this.$slider.find(properties.percentage);
    
    this.startLevel = properties.startLevel || .5;
    
    this.answer = properties.answer;
    this.range = properties.range;
    
    this.sender = properties.sender;
    
    this.$handle.draggable({
      axis:this.axis,
      drag:function(e,ui){
        that.drag(ui);
      },
      stop:function(){
        that.sendToModule(that.sender,{correct:that.correct});
        that.activityComplete();
      }
    });
    
    this.totalWidth = 0;
    this.totalHeight = 0;
    
    this.correct = false;
  },
  afterCreated:function()
  {
    this._super();
    
    this.totalWidth = this.$slider.width();
    this.totalHeight = this.$slider.height();
    
    this.start();
  },
  isCorrect:function()
  {
    var input;
    var rawPer;
    
    if (this.axis === "y")
    {
      input = parseInt(this.$handle.css('top'),10);
      rawPer = 1-(input/this.totalHeight);
    }
    else
    {
      input = parseInt(this.$handle.css('left'),10);
      rawPer = input/this.totalWidth;
    }
    
    var min = this.answer-this.range;
    var max = this.answer+this.range;
    
    return rawPer >= min && rawPer <= max;
  },
  toText:function(rawPer)
  {
    var prettyPer = Math.round(rawPer*100);
    this.$percentage.text(prettyPer+"%");
  }
});